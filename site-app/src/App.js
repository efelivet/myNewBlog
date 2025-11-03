import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import LightDarkTheme from './LightDarkTheme';
import Login from './Login'
import Register from './Register'
import Post from './Post'

function App(){
  

   return (
   <>
    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={ <LightDarkTheme/>}/>
      <Route path ='/login' element ={<Login/>}/>
      <Route path ='/register' element ={<Register/>}/>
      <Route path="/post" element={<Post />} />
    </Routes>
    </BrowserRouter>
  
   </>
  
   
   

 );
}

export default App;
