import React, { useEffect,useState } from 'react'
import "./Analytics.css"
import axios from 'axios'

const Analytics = () => {

    const [urls, setUrls] = useState([]);

    useEffect(() => {
      const getAllUrls=async()=>{
        const response=await axios.get("http://localhost:3001");
        console.log(response.data);
        setUrls(response.data);
        console.log(urls);      }
      getAllUrls();
    });

    
  return (
    <div className='container1'>
        <div className='heading'>Urls-Analytics</div>
        { urls.map((item)=>(
          <div className='main'>
            <span>https://shrt-jivs.onrender.com/{item.shortUrl}</span>
            <span>Visits:{item.visits}</span>
        </div>))
        }
    </div>
  )
}

export default Analytics