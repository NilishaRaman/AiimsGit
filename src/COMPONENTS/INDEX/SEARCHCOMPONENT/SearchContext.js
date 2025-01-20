import React, { createContext, useState, useContext } from 'react';

// Create the context
const SearchContext = createContext();

// Custom hook to use search context
export const useSearch = () => {
  return useContext(SearchContext);
};

// Search provider component
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
