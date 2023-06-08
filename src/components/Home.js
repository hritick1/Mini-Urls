import React, { useState } from 'react'
import './Home.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const [isresponse, setIsresponse] = useState(false);
    const [longUrl, setLongUrl] = useState({});
    const [shortUrl, setShortUrl] = useState({});

    const getUrl=async()=>{
        const response= await axios.post("https://shrt-jivs.onrender.com/short",longUrl);
        console.log(response);
        setShortUrl(response.data);
        setIsresponse(true);
    }

    const handleChange=(e)=>{
        const value=e.target.value;
        setLongUrl({[e.target.name]:value});
        console.log(longUrl);
    }
    const clearAll=()=>{
        setLongUrl({longUrl:""});
        setShortUrl({shortUrl:""});
        setIsresponse(false);
        console.log(shortUrl);
    }
    const handleCopy=()=>{
        navigator.clipboard.writeText(shortUrl);
        toast.success("Copied Successfully")
    }
  return (
    <>
    <div className='container'>
    <ToastContainer/>
       <div className='heading'>
          Mini-Urls
          <div>
          Urls Made Simple, Shareable & Easily Accessible
          </div>
       </div>

       <div className='box'>
        <div id='head'>Lets Get Links Shortened</div>
       <TextField label="Paste Long Url here" sx={{width: 500}} required  variant='filled' type='text' name='longUrl' value={longUrl.longUrl} onChange={(e)=>handleChange(e)}/>

      {isresponse && <div className='link'>{shortUrl}
       <Button variant="text" sx={{ width:100,height:47 ,backgroundColor:"white",color:"#1f354c", "&:hover": {backgroundColor: "#3e5f83",color:"white"}}} onClick={handleCopy}>copy</Button>
       </div>}

      <div className='btn'> <Button variant="contained" sx={{color:"white",backgroundColor:"#1f354c", "&:hover": {backgroundColor: "white",color:"#1f354c"}}} onClick={getUrl}>Short-It</Button> 
      <Button variant="contained" sx={{color:"white",backgroundColor:"#1f354c", "&:hover": {backgroundColor: "white",color:"#1f354c"}}} onClick={()=>{clearAll()}}>clear</Button>
        {/* <Button variant="contained" sx={{color:"white",backgroundColor:"#1f354c"}}>Custom-Link</Button> */}
        </div>
       </div>


       </div>
       </>
  )
}

export default Home