import './App.css';
import React, { useState, useEffect } from 'react';
import logo from './loading.gif'

function MyComponent() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("https://devotionals-api.herokuapp.com/api/v1/devotionals/today")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return (
      <div>
        <center>
          <h2>Devocional para jóvenes</h2>
          <hr/>
          <br/><br/><br/>
          <h1>¡Ups! Algo salió mal :(</h1>

          <br/>
          Intenta de nuevo dentro de unos momentos.
          
          <br/><br/><br/>
          {error.message}
        </center>
      </div>
    );
  } else if (!isLoaded) {
    return (
      <div>
        <center><h2>Devocional para jóvenes</h2></center>
        <hr/>

        <br/><br/><br/>
        <center><img src={logo} alt="Loading..." width="260vw"/></center>
      </div>
    );
  } else {
    return (
      <div className='App'>
        <h2>Devocional para jóvenes</h2>
        <hr/>
        
        <div className='container'>
          {items.map(item => (
            <div key={item.id}>
              <center><h1>{item.title}</h1></center>
              
              <div key={item.id}>
                <center>{item.date}</center>
                <br/><br/>

                <div key={item.id}>
                  <center><b>{item.vers}</b></center>
                  <br/><br/>

                  <div key={item.id}>
                    {item.content[0]}
                    <br/><br/>

                    {item.content[1]}
                    <br/><br/>

                    {item.content[2]}
                    <br/><br/><br/>

                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    );
  }
}

export default MyComponent;
