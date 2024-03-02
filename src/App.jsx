
import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {
      const [ipAddress, setIpAddress] =useState('');
      const [geoInfo, setGeoInfo] = useState({});

useEffect(()=>{
  //invoke Function to Get IP
  getVisitorIP();
}, [])

const getVisitorIP = async()=>{
  try{
    const res = await fetch('http://api.ipify.org');
    const data = await res.text();
    //store IP in State
    setIpAddress(data)
  }catch (err){
    console.error('Failed to fetch IP:', err);
  }
}

//update IP Address by user Input
const handleInputChange = (e)=>{
  setIpAddress(e.target.value);
};

//use IP from State to get location Info
const fetchIPInfo = async () =>{
  try{
    const res = await fetch (`http://ip-api.com/json/${ipAddress}`);
  const data = await res.json();
  console.log(data);
  //store location info in state
  setGeoInfo(data);
  }catch (err) {
    console.error('Failed Location Info:', err);
  }
};

  return (
    <div className='flex flex-col justify-center items-center mt-4'>
      <h3 className='font-bold '>IP to Location</h3>
      <div className='flex justify-center items-center p-5 w-screen bg-slate-500 gap-1 '>
        <input type="text" value={ipAddress} onChange={handleInputChange} className='border'/>
        <button onClick={fetchIPInfo} className='bg-black text-white px-2 rounded hover:bg-blue-500'>Get Info</button>
      </div>
      {geoInfo.country && (
        <div className=''>
          <strong>Country:</strong>{geoInfo.country} ({geoInfo.countryCode})<br/> 
          <strong>Region:</strong>{geoInfo.regionName} ({geoInfo.region})<br/>
          <strong>City:</strong>{geoInfo.city}<br/>
          <strong>Zip:</strong>{geoInfo.zip}<br/>

        </div>
      )}
    </div>
  )
}

export default App
