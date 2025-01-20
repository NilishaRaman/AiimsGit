import React, { useState, useEffect } from "react";
import IndexHeader from "./INDEXHEADER/IndexHeader";
import IndexNavbar from "./INDEXNAVBAR/IndexNavbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../INDEX/Index.css';
import Home from "./HOME/Home";
import MenuContent from "./INDEXNAVBAR/MenuContent";
import { Route, Routes } from "react-router-dom";

// import $ from 'jquery';
// import "datatables.net-dt/css/dataTables.dataTables.min.css";
// import 'datatables.net';

function Index() {
    const [isHindi, setIsHindi] = useState(false);
    const [contentData, setContentData] = useState(null);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    const handleLanguageChange = (language) => {
        const isHindiSelected = language === 'Hindi';
        setIsHindi(isHindiSelected);
    };

    const updateContentData = (data) => {
        setContentData(data);
    };

    const handleSearchChange = (query) => {
        console.log("Search query from parent:", query); // Log the query coming from the child
        setSearchQuery(query); // Update the search query state in the parent
    };

    return (
        <div className="container-fluid">
            <IndexHeader
                onLanguageChange={handleLanguageChange}
                onSearchChange={handleSearchChange}
            />
            <IndexNavbar isHindi={isHindi} onContentChange={updateContentData} />
            <Routes>
                <Route path="/" element={<Home isHindi={isHindi} searchQuery={searchQuery} />} />
                <Route path="/menu/:menuId" element={<MenuContent searchQuery={searchQuery} />} />
            </Routes>
            {/* Include the DataTableComponent here if needed */}
            {/* <DataTableComponent /> */}
        </div>

        
    );
}
// const DataTableComponent=()=> {

//   useEffect(() => {

//       // Initialize DataTable

//       $('#example').DataTable();

//   }, []);
// }
export default Index;