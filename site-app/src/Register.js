  import React from 'react'
  import API from "./api";
  import {Box, TextField, Typography,Container,Paper,Button} from '@mui/material'
  import {useState} from "react"
  import {Link} from "react-router-dom"
 
  export default function Register(){

  const [username,setUsername] = useState("");
  const [password, setPassword] =useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] =useState("");
  const [success, setSuccess] = useState("");
   
  const handleSubmit = async(e)=>{
   e.preventDefault();
   setError("");
   setSuccess("");

   if(password !== confirmPassword){
      alert("Passwords do not match!")
      return
   }
   const userData = {username,password};
   console.log("Register Data:", userData);
   try{
      const res = await API.post("/register",{username,password})
   
      console.log(res.data);
      setSuccess("Registration successful")
      setUsername("");
      setPassword("");
   }catch(err){
      console.error(err);

      setError(err.response?.data?.message || "Registration failed!")
      
   }
  }

     return(
   <Container maxWidth ="sm" sx={{mt:10,display:"flex",
    justifyContent:"center",alignItems:"center",
   
   }}>
    <Paper elevation ={3} sx ={{p:2,borderRadius:3,
       backgroundColor:"rgba(255,255,255,0.95)",}}>
    <Typography sx={{textAlign:"center",m:2}}>
      Signup
    </Typography>
 
    <Box component ="form" onSubmit ={handleSubmit} sx={{display:"flex",flexDirection:"column",alignItems:"center",
       justifyContent:"center",}}>
       <TextField sx={{maxWidth:300,mb:3}} type ="username"
       label="username"
        value={username}
        onChange={(e)=>setUsername(e.target.value)}/>

       <TextField  sx={{maxWidth:300}} type ="Password"
       value={password}
       label ="password"
       onChange={(e)=>setPassword(e.target.value)} />

       <TextField  sx={{maxWidth:300}} type ="Password"
       value={confirmPassword}
       label ="confirm password"
       onChange={(e)=>setConfirmPassword(e.target.value)} />
       {error && (<Typography variant ="body2"
       sx={{color:"red",mt:1,textAlign:"center"}}>
         {error}
         </Typography>)}
         {success && (<Typography variant ="body2"
         sx={{color:"green",mt:1,textAlign:"center"}}>
         {success}
         </Typography>)}
       <Button  type="submit" variant ="contained"
       sx={{
          width:100,
          m:3,
          bgColor:"#1976d2",
          "&:hover":{bgColor:"#539ce6ff"},
          borderRadius:2,
          py:1.2
       }}>Signup</Button>

       <Typography variant ="body2">
         Already have an account?{" "}
         <Link to="/login" style={{color:"#2e7d32",textDecoration:"none"}}>
         Login
         </Link>
       </Typography>
     
    </Box>
    </Paper>
 
   </Container>
     )
  }