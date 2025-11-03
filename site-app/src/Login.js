 import React from 'react'

 import {Box, TextField, Typography,Container,Paper,Button} from '@mui/material'
import API from "./api"
 import {useState} from 'react';
import { Link, useNavigate } from "react-router-dom";

 export default function Login(){

   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
    const navigate = useNavigate()

   const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await API.post("/login", { username, password });
      setSuccess("Login successful!");
      console.log(res.data);

      setTimeout(() => {
      navigate("/post");
    }, 1000);

      setUsername("");
      setPassword("");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Invalid credentials!");
    }
  };

    return(

  <Container maxWidth ="sm" sx={{mt:10,display:"flex",
   justifyContent:"center",alignItems:"center",
  
  }}>
   <Paper elevation ={3} sx ={{p:2,borderRadius:3,
      backgroundColor:"rgba(255,255,255,0.95)",}}>
   <Typography sx={{textAlign:"center",m:2}}>
      Login to your Account
   </Typography>

   <Box   component="form"  onSubmit={handleSubmit} sx={{display:"flex",flexDirection:"column",alignItems:"center",
      justifyContent:"center",}}>
      <TextField sx={{maxWidth:300,mb:3}} type ="username" 
       value={username}
       onChange={(e) => setUsername(e.target.value)}
      />
      <TextField  sx={{maxWidth:300}} type ="Password"
       value={password}
       onChange={(e) => setPassword(e.target.value)}
      />

       {error && (
            <Typography
              variant="body2"
              sx={{ color: "red", mt: 1, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

           {success && (
            <Typography
              variant="body2"
              sx={{ color: "green", mt: 1, textAlign: "center" }}
            >
              {success}
            </Typography>
          )}

      <Button  type="submit" variant ="contained"
      sx={{
        width: 100,
        m: 3,
        backgroundColor: "#1976d2",
        "&:hover": { backgroundColor: "#539ce6ff" },
         borderRadius: 2,
         py: 1.2,
      }}>Login
      </Button>
   </Box>
   <Typography variant='body2' align='center' sx={{mt:2}}>
    Don't have an account?{" "}
    <Link to="/register">Register</Link>
   </Typography>
  
   </Paper>

  </Container>
    )
 }