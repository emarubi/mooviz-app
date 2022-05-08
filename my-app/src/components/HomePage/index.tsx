import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import SearchBox from '../SearchBox';
import './styles.css';

export const { REACT_APP_API_URL } = process.env;
console.log('REACT_APP_API_URL', REACT_APP_API_URL)

function HomePage() {
  const navigate = useNavigate()

  const [searchValue, setSearchValue] = useState<string>(localStorage.getItem('searchValue') || '');

  useEffect(() => {
    window.localStorage.setItem('searchValue', searchValue);
  }, [searchValue]);
  console.log('localStorage', localStorage)

  const submitSearch = async () => {
    console.log('searchValue', searchValue)
    window.localStorage.setItem('searchValue', searchValue);
    const result = await fetch(`${REACT_APP_API_URL}/`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ search: searchValue })
    })
    const resultInJson = await result.json()
    console.log('resultInJson', resultInJson)
    navigate("/movies", { state: { searchString: searchValue }});
  }

  return (
      <div className="container">
        <div id="navbar">
          <h1>Mooviz</h1>
          <SearchBox searchValue={searchValue}
            setSearchValue={setSearchValue}
            submitSearch={submitSearch} />
        </div>
      </div>
  );
}

export default HomePage;