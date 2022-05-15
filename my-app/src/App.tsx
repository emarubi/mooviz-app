import './App.css';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MoviesList';
import MovieDetails from './components/MovieDetails';
import HomePage from './components/HomePage';
import { BrowserRouter } from "react-router-dom";
import { useEffect } from 'react';

function App() {
  const addCredits = () => {
    const credits = document.createElement('a')
    credits.setAttribute('href', 'https://unsplash.com/photos/G16kFHYvCoQ')
    credits.setAttribute('style',  "position: absolute; bottom: 10px; left: 10px; color: white; font-size: 11px")
    credits.textContent = "Photo by Paolo Chiabrando"
    document.body.appendChild(credits)
  }
  
  useEffect(() => {
    addCredits()
    return function cleanup () {
     const element= document.getElementById("credits")
     if (element) {
       document.removeChild(element)
     }
    }
  })

  useEffect(() => {
    window.localStorage.removeItem('searchValue');
  }, []);
  console.log('localStorage', localStorage)

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/movie/:id" element={<MovieDetails />} />
            <Route path="/movies" element={<MovieList />} />
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;