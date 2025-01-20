import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';  // Import useNavigate
import axios from 'axios';
import $ from 'jquery';
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import 'datatables.net';

const MenuContent = () => {
  const { menuId } = useParams();  // Get the menuId from the URL params
  const [contentData, setContentData] = useState(null);  // Store the fetched content
  const navigate = useNavigate();  // Initialize the navigate function

  useEffect(() => {
    // If menuId is 1, redirect to the home page
    if (menuId === '1') {
      navigate('/');  // Redirect to home page
      return;  // Exit the useEffect early to avoid fetching content
    }
    const timer = setTimeout(() => {

      $('#example').DataTable();

  }, 1000); // 5000 milliseconds = 5 seconds
    //alert('aaaa');
    // Fetch the content based on the menuId from the URL
    axios.get(`http://10.226.25.102:8080/api/content/${menuId}`)
      .then((response) => {
        setContentData(response.data);  // Set the fetched content data
      })
      .catch((error) => {
        console.error("Error fetching content:", error);
      });
  }, [menuId, navigate]);  // Added navigate to dependencies

  return (
    <div>
      <div className="menu-content mt-20">  {/* Add mt-5 for top margin */}
        {contentData ? (
          <>
            <h3>{contentData.menu_name}</h3>
            {/* Render content dynamically */}
            <div dangerouslySetInnerHTML={{ __html: contentData.content }} />
          </>
        ) : (
          <p>Loading content...</p>
        )}
      </div>
      
    </div>
  );
};

export default MenuContent;
