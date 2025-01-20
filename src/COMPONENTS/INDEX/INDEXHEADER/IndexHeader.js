

import React, { useState, useEffect } from "react"; // Importing necessary hooks
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../INDEXHEADER/IndexHeader.css';
import SearchBar from "../SEARCHCOMPONENT/SearchBar";
import axios from "axios";
import { useSearch } from "../SEARCHCOMPONENT/SearchContext";
import { Link } from "react-router-dom";




const IndexHeader = ({ onLanguageChange }) => {

  // This if for implementing the search functionality
  const { searchTerm, setSearchTerm } = useSearch();
  const [filteredResults, setFilteredResults] = useState([]);
  const [contentData,setContentData] =  useState([])

  // Get the language from localStorage if available, default to 'English'
  const [language, setLanguage] = useState(localStorage.getItem('language') || 'English');

  // for fetching the data of content of all the pages
  useEffect(()=> {
    axios
    .get("http://localhost:8080/api/content/all")
    .then((response) =>{
      console.log("cONTENT DATA: ",response.data);
      setContentData(response.data);
    })
    .catch((e) => {
      console.error("Error fetching the data: ", e);
    })

    if(searchTerm) {
      const results  = contentData.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredResults(results);
    }
    else{
      setFilteredResults([])
    }
  },[searchTerm]);

  // Save language to localStorage and notify parent component whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);  // Save language to localStorage
    onLanguageChange(language);  // Notify parent component of language change
  }, [language, onLanguageChange]);

  const handleLanguageChange = (selectedLanguage) => {
    console.log("Language changed to:", selectedLanguage); // Debugging line
    setLanguage(selectedLanguage);  // Update the language state
  };

  return (
    <div className="row justify-content-center text-center pt-2">
      <div className="col-sm-2">
        <a href="/" title="Home" rel="home" className="site-branding__logo">
          <img className="w-50" src="https://aiimsrajkot.edu.in/sites/default/files/aiims_rajkot_logo_0_0_0.png" alt="Home" />
        </a>
      </div>
      <div className="col-sm-8">
        <h4 className="m-0 fs-4">અખિલ ભારતીય आयुर्विज्ञान સંસ્થા, રાજકોટ, ગુજરાત</h4>
        <h4 className="m-0 fs-4">अखिल भारतीय आयुर्विज्ञान संस्थान, राजकोट, गुजरात</h4>
        <h4 className="m-0 fs-4">ALL INDIA INSTITUTE OF MEDICAL SCIENCES, RAJKOT, GUJARAT</h4>
        <p className="m-0 fs-6">(A Central Autonomous Institute of National Importance under Pradhan Mantri Swasthya Suraksha Yojna (PMSSY), Ministry of Health, Government of India)</p>
      </div>

      <div className="col-sm-2 ">
        <button
          className={`btn p-2 px-3 fs-6 text-white rounded custom-btn`}
          onClick={() => handleLanguageChange('Hindi')}
        >
          Hindi
        </button>

        <button
          className={`btn p-2 px-3 fs-6 text-white rounded custom-btn`}
          onClick={() => handleLanguageChange('English')}
        >
          English
        </button>
        <br /><br />
        <SearchBar />
        <div>
        <h3>Search Results:</h3>
        {filteredResults.length > 0 ? (
          <ul>
            {filteredResults.map(result => (
              <li key={result.id}>
                <Link to={`/${result.name.toLowerCase().replace(/ /g, '-')}`}>
                  {result.name}
                </Link>: {result.description}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>


      </div>
    </div>
  );
};

export default IndexHeader;
