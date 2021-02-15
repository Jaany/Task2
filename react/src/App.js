import './App.css';
import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function App() {

  
  const [name, setname] = useState([]);
  const [phone, setphone] = useState([]);
  const [city, setcity] = useState([]);
  const [result, setResult] = useState([]);
  


  function handleChangename(event){
    setname(event.target.value);
}

function handleChangephone(event){
  setphone(event.target.value);
}

function handleChangecity(event){
  setcity(event.target.value);
}

  function insert(event) {
   
    const url = "http://localhost:3000/insertStore";
    axios.post(url,{
      name:name,
      phone:phone,
      city:city,
  })

    
    .then((response) => {
      console.log(response);
      setResult(response.data.results)
     
    });
}



  return (
    <div className="App" >
      <br></br>
        <h1 style = {{fontSize:'24px' , }}>ADD DETAILS</h1><br></br>
        <label style = {{fontSize:'15px', }}>Store Name</label><br></br>
        <input type = "text" placeholder = "Enter store name."  onChange = {handleChangename} style = {{width:'500px', height:'20px' }}   /> <br></br>
        <label style = {{fontSize:'15px'}}>Phone Number</label><br></br>
        <input type = "text" placeholder = "Enter phone number." onChange = {handleChangephone}  style = {{width:'500px', height:'20px'}}   /> <br></br>
        <label style = {{fontSize:'15px'}}>City</label><br></br>
        <input type = "text" placeholder = "Enter the city." onChange = {handleChangecity}  style = {{width:'500px', height:'20px'}}   /><br></br>
          <button className="button" style = {{width:'70px', height:'26px', marginTop:'30px',
              marginLeft:'450px' , color:'black', backgroundcolor:' #4CAF50', transitionDuration: '0.4s',cursor: 'pointer' }}  onClick = {insert} >ADD</button>
<br></br>
          

 
      </div>
  );
}

export default App;

