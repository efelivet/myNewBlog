 import React, { useState } from "react";
import { AppBar, Toolbar, IconButton, Typography, Box, Button, useTheme } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import SearchIcon from '@mui/icons-material/Search'
import News from './News'
import Sport from './Sport'
import Tech from './Tech'
import Videos from './Videos'
import ControllableStates from './ControllableStates'

export default function FullWidthMenu({ toggleTheme, mode }) {
  const theme =useTheme()
   const [show,setShow]=useState(false);
   const [menuOpen, setMenuOpen] = useState(false);

   const[activeSection,setActiveSection]= useState("NEWS")
  
    function handleClick(){
       setShow(!show)
    }
const handleMenuToggle = () => {
setMenuOpen(!menuOpen);
};

const items =[
  {name:"NEWS",component:<News/>},
  {name:"SPORT",component:<Sport/>},
  {name:"TECH",component:<Tech/>},
  {name:"VIDEOS",component:<Videos/>}]


return (
<Box sx={{ flexGrow: 1 }}>
<AppBar position="static" color="primary">
<Toolbar sx={{ display: "flex",justifyContent: "space-between" }}>
 
    <Typography variant="h6" component="div">
     My Blog
</Typography>

<Box sx ={{display:"flex",justifyContent:"center",alignItems:"center"}}>
  {items.map(item=>(

  <Button key={item.name}sx={{p:2}}  
  onClick={()=>setActiveSection(item.name)} color="inherit">
     {item.name}
     </Button>

  ))}
      
</Box>


<Box>
<Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>


<IconButton color="inherit" onClick={toggleTheme}>
{mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
</IconButton>
<IconButton
edge="start"
color="inherit"

aria-label="menu"
onClick={handleMenuToggle}
>
<MenuIcon />

</IconButton>
<SearchIcon onClick={handleClick}/>
</Box>
</Box>

</Toolbar>
</AppBar>
{menuOpen ? (
<Box
sx={{
position:"fixed",
top:64,
left:0,
width: "100%",
backgroundColor: "background.paper",
color: "text.primary",
padding: 2,
display: "flex",
alignItems:"flex-start",
height:"calc(100vh - 64px)",
justifyContent:"space-evenly",
flexDirection:"column",
transition: "0.3s",

}}
>
<Button color="inherit" sx={{fontSize:"1rem"}}>Home</Button>
<Button color="inherit" sx={{fontSize:"1rem"}}>About</Button>
<Button color="inherit" sx={{fontSize:"1rem"}}>Services</Button>
<Button color="inherit" sx={{fontSize:"1rem"}}>Contact</Button>
</Box>
):(<Box sx={{
 position:"static", top:80,}}> 
   
   
   <Typography>{items.find((item)=>item.name === activeSection)?.component}</Typography>
  
 
  </Box>)}
  <Box sx={{
    position:"fixed",
    top:70,
    right:0,
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
   
  }}> 

    {show &&
     
  <Box sx={{

    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"30vw",
    height:"35vh",
    bgcolor:theme.palette.customBg.hightlight,
   
    padding:"4px"}}>
      <Box style={{display:"flex",
        justifyContent:"center",
        alignItems:"center",
        width:"200px",
        height:"30px",
      }}>
        <ControllableStates/>
    
   
      </Box>
     
  </Box>
 
 
  
    }

     </Box>
 
  
</Box>


);
}