import React, { useState, useEffect } from 'react';
import Article from './Article';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import Fuse from 'fuse.js';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const CountryCatalog = () => {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [rowPerPage, setRowPerPage] = useState(25);
  const [searchText, setSearchText] = useState('');
  const [fuse, setFuse] = useState(null);
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const getCountries = async () => {
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        setCountries(data);
        setFuse(new Fuse(data, { keys: ['name.common'], includeScore: true }));
      } catch (error) {
        console.error(error);
      }
    };

    getCountries();
  }, []);

  const searchCountry = () => {
    if (fuse) {
      const result = fuse.search(searchText);
      const filteredCountries = result.map((item) => item.item);
      setCountries(filteredCountries);
      setPage(1);
      handleClearSearch();
    }
  };

  const handleSearchCountry = (e) => {
    e.preventDefault();
    searchCountry();
  };

  const handleClearSearch = () => {
    setSearchText('');
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const sortCountries = countries.slice().sort((a, b) => {
    const nameA = a.name.official.toUpperCase();
    const nameB = b.name.official.toUpperCase();

    return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastItem = page * rowPerPage;
  const indexOfFirstItem = indexOfLastItem - rowPerPage;
  const currentCountries = sortCountries.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div>
      <section className='container p-8 mx-auto'>
        <div className='flex justify-between flex-1 gap-4 pb-4 md:flex-row md:items-center md:justify-between'>
          <form onSubmit={handleSearchCountry} autoComplete='off' className='max-w-3xl md:flex-1'>
            <TextField
              label='Search for a country'
              variant='outlined'
              size='medium'
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              fullWidth
              required
            />
          </form>
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
        <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4'>
          {currentCountries.map((country) => (
            <Article key={country.name.common} {...country} />
          ))}
        </div>
        <div className='flex items-center justify-center mt-5'>
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

export default CountryCatalog;
