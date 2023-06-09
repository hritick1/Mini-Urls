import React, { useState } from 'react'
import './Home.css'
import { Button, TextField } from '@mui/material'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [isresponse, setIsresponse] = useState(false);
    const [isCustom, setIsCustom] = useState(false);
    const [isfilled,setIsFilled]=useState(false);
    const [longUrl, setLongUrl] = useState({});
    const [shortUrl, setShortUrl] = useState({});
    const [customUrl, setCustomUrl] = useState({});

   const navigate=useNavigate();
    

    const getUrl=async()=>{
        if(!isfilled) {toast.error("Please input long url");
   }
       else{
        let response=null;
        if(!isCustom)
        response= await axios.post("http://localhost:3001/short",longUrl);
        else
        response= await axios.post("https://shrt-jivs.onrender.com/custom",customUrl);
        console.log(response);
        if(response.data==="ShortUrl Already Exists ,Please try someother"){toast.error("ShortUrl Already Exists");return;}
        setShortUrl(response.data);
        setIsCustom(false);
        setIsresponse(true);
       }
    }

    const handleChange=(e)=>{
        e.preventDefault();
        setIsFilled(true);
        const value=e.target.value;
        setLongUrl({[e.target.name]:value});
        setCustomUrl({...customUrl,[e.target.name]:value});
        // console.log(longUrl);
        // console.log(customUrl);
    }
    const clearAll=()=>{
        setLongUrl({longUrl:""});
        setShortUrl({shortUrl:""});
        setCustomUrl({longUrl:"",shortUrl:""});
        setIsresponse(false);
        setIsCustom(false);
        setIsFilled(false);
        console.log(shortUrl);
    }
    const handleCopy=()=>{
        navigator.clipboard.writeText(shortUrl);
        toast.success("Copied Successfully")
    }
    const getCustomUrl=async()=>{
          setIsCustom(true);
    }

    const seeUrls=()=>{
     navigate("/analytics");
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
       <TextField label="Paste Long Url" sx={{width: 530, '@media (max-width: 578px)': {
          width:350},'@media (max-width: 420px)': {
            width:250},'@media (max-width: 325px)': {
                width:180}}} required  variant='filled' type='text' name='longUrl' value={longUrl.longUrl} onChange={(e)=>handleChange(e)}/>

      {isCustom && <TextField label="Paste Short Url" sx={{width: 530}} required  variant='filled' type='text' name='shortUrl' value={customUrl.shortUrl} onChange={(e)=>handleChange(e)}/>}

      {isresponse && <div className='link'>{shortUrl}
       <Button variant="text" sx={{ width:100,height:47 ,backgroundColor:"white",color:"#1f354c", "&:hover": {backgroundColor: "#3e5f83",color:"white"}}} onClick={handleCopy}>copy</Button>
       </div>}

      <div className='btn'> <div><Button variant="contained" sx={{color:"white",backgroundColor:"#1f354c", "&:hover": {backgroundColor: "white",color:"#1f354c"}}} onClick={getUrl}>Short-It</Button> 
      <Button variant="contained" sx={{color:"white",backgroundColor:"#1f354c", "&:hover": {backgroundColor: "white",color:"#1f354c"}}} onClick={()=>{clearAll()}}>clear</Button></div><div>
        <Button variant="contained" sx={{color:"white",backgroundColor:"#1f354c","&:hover": {backgroundColor: "white",color:"#1f354c"}}} onClick={getCustomUrl}>Custom-Link</Button>
        <Button variant="contained" sx={{color:"white",backgroundColor:"#1f354c","&:hover": {backgroundColor: "white",color:"#1f354c"}}} onClick={seeUrls}>View-Urls</Button> </div></div>
        </div>
       </div>
       </>
  )
}

export default Home