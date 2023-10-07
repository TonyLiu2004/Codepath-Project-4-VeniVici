import { useState, useEffect } from 'react'
import './App.css'
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

function App() {
  let breeds = ['abys', 'aege', 'abob', 'acur', 'asho', 'awir', 'amau', 'amis', 'bali', 'bamb', 'beng', 'birm', 'bomb', 'bslo', 'bsho', 'bure', 'buri', 'cspa', 'ctif', 'char', 'chau', 'chee', 'csho', 'crex', 'cymr', 'cypr', 'drex', 'dons', 'lihu', 'emau', 'ebur', 'esho', 'hbro', 'hima', 'jbob', 'java', 'khao', 'kora', 'kuri', 'lape', 'mcoo', 'mala', 'manx', 'munc', 'nebe', 'norw', 'ocic', 'orie', 'pers', 'pixi', 'raga', 'ragd', 'rblu', 'sava', 'sfol', 'srex', 'siam', 'sibe', 'sing', 'snow', 'soma', 'sphy', 'tonk', 'toyg', 'tang', 'tvan', 'ycho'];

  const makeQuery = () => {
    let query = `https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=${breeds}&api_key=${ACCESS_KEY}&has_breeds=1`;
    callAPI(query).catch(console.error);
  }

  const [currentImage, setCurrentImage] = useState(null);

  const callAPI = async (query) => {
    const response = await fetch(query);
    const json = await response.json();
    console.log('JSON Response:', json);
    if (json[0].url == null) {
      alert("Oops! Something went wrong with that query, let's try again!")
        }
    else {
      setCurrentImage(json[0].url);
    }
  }

  return (
      <div>
        {currentImage ? (
          <img
            className="cat-image"
            src={currentImage}
            alt="Cat image returned"
            style={{width:'300px',height:'300px',objectFit:'cover'}}
          />
        ) : (
          <div> </div>
        )}
        <button onClick = {makeQuery}>Generate</button>
      </div>
  );
};

export default App
