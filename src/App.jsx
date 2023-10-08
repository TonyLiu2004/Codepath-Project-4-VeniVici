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
  const [catName, setCatName] = useState("");
  const [description, setDescription] = useState("Click generate to start!");
  const [lifeSpan, setLifeSpan] = useState("");
  const [origin, setOrigin] = useState("");
  const [weight, setWeight] = useState("");

  const callAPI = async (query) => {
    let response = await fetch(query);
    let json = await response.json();
    while (true){
      console.log('JSON Response:', json);
      console.log(banButtons);
      if (json[0].url == null) {
        alert("Oops! Something went wrong with that query, let's try again!")
      } 

      if(banButtons.length == 0){
        break;
      }

      let reFetch = false;
      for(let i = 0;i < banButtons.length;i++){
        if(banButtons[i].content == json[0].breeds[0].name ||
           banButtons[i].content == (json[0].breeds[0].life_span + " years") ||
           banButtons[i].content == json[0].breeds[0].origin ||
           banButtons[i].content == (json[0].breeds[0].weight['imperial'] + " lbs")){
            reFetch = true;
            break;
        }
      }

      if (reFetch) {
        response = await fetch(query);
        json = await response.json();
      } else {
        break; 
      }
    }
    setCurrentImage(json[0].url);
    setCatName(json[0].breeds[0].name);
    setDescription(json[0].breeds[0].description);
    setLifeSpan(json[0].breeds[0].life_span + " years");
    setOrigin(json[0].breeds[0].origin);
    setWeight(json[0].breeds[0].weight['imperial'] + " lbs");
  }

  const [banButtons, setBanButtons] = useState([]);
  const [uniqueId, setUniqueId] = useState(0);

  const addButton = (input) => {
    setUniqueId((prevId) => prevId + 1);
    setBanButtons((prevButtons) => [...prevButtons, { id: uniqueId, content: input }]);
  };

  const deleteButton = (input) => {
    setBanButtons((prevButtons) => prevButtons.filter((button) => button.content !== input));
  };

  

  return (
      <div className = "everything">
        <h1 style = {{fontSize:'60px', color:'black', margin:'0px'}}>Cool Cats</h1>
        <p style = {{fontSize: '20px', color:'black'}}>Discover cats you've never seen before!</p>
        <div className='catStuff'>
          <p style={{ fontSize: '40px', margin:'0px', paddingBottom:'10px'}}>{catName}</p>
          <div className = "attribute-buttons">
            {catName ? (<button onClick={() => addButton(`${catName}`)}>{catName}</button>) : (<div></div>)}
            {weight ? (<button onClick={() => addButton(`${weight}`)}>{weight}</button>) : (<div></div>)}
            {origin ? (<button onClick={() => addButton(`${origin}`)}>{origin}</button>) : (<div></div>)}
            {lifeSpan ? (<button onClick={() => addButton(`${lifeSpan}`)}>{lifeSpan}</button>) : (<div></div>)}
          </div>
          <br/>

          {currentImage ? (
            <img
              className="cat-image"
              src={currentImage}
              alt="Cat image returned"
              style={{width:'350px',height:'350px',objectFit:'cover'}}
            />
          ) : (
            <div></div>
          )}

          <br/><br/>
          <p style={{ fontSize: '20px', margin:'0px', paddingBottom:'15px'}}>{description}</p>
          <button className = "generate-button" onClick = {makeQuery} style={{ fontSize: '20px'}}>Generate</button>
        </div>

        <div class="sideNav">
          <h2>Ban List</h2>
          <h4>Select an attribute in your listing to ban it</h4>
          {banButtons.map((button) => (
          <button key={button.id} onClick={() => deleteButton(button.content)}>
            {button.content}
          </button>
        ))}
        </div>
      </div>
  );
};

export default App
