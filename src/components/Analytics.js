import React, { useEffect,useState } from 'react'
import "./Analytics.css"
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';

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
    <div className='container1'> <ToastContainer/>
        <div className='heading'>Urls-Analytics</div>
        { urls.map((item)=>(
          <div className='main'>
            <span onClick={()=>{ navigator.clipboard.writeText("https://shrt-jivs.onrender.com/"+item.shortUrl);toast.success("Text copied successfully");}}>https://shrt-jivs.onrender.com/{item.shortUrl}</span>
            <span>Visits:{item.visits}</span>
        </div>))
        }
    </div>
  )
}

export default Analytics