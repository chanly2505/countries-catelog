// Import necessary dependencies and components from external libraries
import React, { useState, useEffect } from 'react';
import Article from './Article';  // Importing the Article component
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Fuse from 'fuse.js';  // Importing the Fuse.js library for fuzzy searching
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

// Functional component for displaying a catalog of countries
const CountryCatalog = () => {
  // State variables
  const [countries, setCountries] = useState([]);  // Holds the list of countries
  const [page, setPage] = useState(1);  // Current page number for pagination
  const [rowPerPage, setRowPerPage] = useState(25);  // Number of rows per page
  const [searchText, setSearchText] = useState('');  // Text input for country search
  const [sortOrder, setSortOrder] = useState('asc');  // Sorting order for countries
  const [fuse, setFuse] = useState(null);  // Fuse.js instance for fuzzy searching

  // Fetch countries from the API
  useEffect(() => {
    const getCountries = async () => {
      try {
        // Fetch data from the API
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();

        // Set the list of countries and create a Fuse.js instance for fuzzy searching
        setCountries(data);
        setFuse(new Fuse(data, { keys: ['name.common'], includeScore: true }));
      } catch (error) {
        console.error(error);
      }
    };

    // Run the getCountries function only once on component mount
    getCountries();
  }, []);  

  // Function to search for countries based on the official name
  const searchCountry = (query) => {
    const filteredCountries = countries.filter(country =>
      country.name.common.toLowerCase().includes(query.toLowerCase())
    );

    // Update the countries state with the filtered list and reset pagination to the first page
    setCountries(filteredCountries);
    setPage(1);
  };

// Event handler for the search input change
const handleSearchChange = async (e) => {
  const newText = e.target.value;
  setSearchText(newText);
  setPage(1);

  // If the input is empty, reset the page to 1 and fetch all countries
  if (newText.trim() === '') {
    setPage(1);
    try {
      const res = await fetch('https://restcountries.com/v3.1/all');
      const data = await res.json();
      setCountries(data);  // Reset to the original list of countries
    } catch (error) {
      console.error(error);
    }
  } else {
    // Otherwise, perform the country search
    searchCountry(newText);
  }
};


  // Event handler for changing the sorting order
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    
  };

  // Sort countries based on the selected sorting order
  const sortCountries = countries.slice().sort((a, b) => {
    const nameA = a.name.official.toUpperCase();
    const nameB = b.name.official.toUpperCase();

    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  // Event handler for changing the current page in pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Calculate the index of the last and first item to display on the current page
  const indexOfLastItem = page * rowPerPage;
  const indexOfFirstItem = indexOfLastItem - rowPerPage;
  const currentCountries = sortCountries.slice(indexOfFirstItem, indexOfLastItem);

  // Render the component
  return (
    <div>
      <section className='container p-8 mx-auto'>
        {/* Search and sort controls */}
        <div className='flex justify-between flex-1 gap-4 pb-4 md:flex-row md:items-center md:justify-between'>
          {/* Input field for country search */}
          <TextField
            label='Search by Country Name (Fuzzy Search)'
            variant='outlined'
            size='medium'
            value={searchText}
            onChange={handleSearchChange}
            fullWidth
          />
          {/* Dropdown for selecting the sorting order */}
          <FormControl variant="outlined">
            <InputLabel>Sort Order</InputLabel>
            <Select
              value={sortOrder}
              onChange={handleSortChange}
              label="Sort Order"
            >
              <MenuItem value="asc">Ascending</MenuItem>
              <MenuItem value="desc">Descending</MenuItem>
            </Select>
          </FormControl>
        </div>
        {/* Grid for displaying country articles */}
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {/* Dynamically create and render Article components for each country in the currentCountries array */}
          {currentCountries.map((country) => (
            <Article key={country.name.official} {...country} />
          ))}
        </div>
        {/* Pagination */}
        <div className='flex items-center justify-center mt-5'>
          {/* Pagination component */}
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Pagination
              count={Math.ceil(sortCountries.length / rowPerPage)}
              page={page}
              onChange={handleChangePage}
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      </section>
    </div>
  );
}

// Export the CountryCatalog component as the default export
export default CountryCatalog;
