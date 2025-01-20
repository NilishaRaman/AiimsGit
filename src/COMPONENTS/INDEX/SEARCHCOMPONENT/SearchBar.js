import React, { useState } from "react"; 
import { useSearch } from "./SearchContext";

const SearchBar = () =>{
    
    const {searchTerm,setSearchTerm} = useSearch();

    const handleSearChange =(e) => {
        
        setSearchTerm(e.target.value);
    }

    return (
        <>
            <input 
                type="text"
                placeholder="Search..."
                value={searchTerm}
                className="form-control"
                onChange={handleSearChange}
            />
        </>
    )
}

export default SearchBar;