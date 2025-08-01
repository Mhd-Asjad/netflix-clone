import { useEffect } from 'react'
import Home from './Pages/Home/Home'
import { Routes , Route, useNavigate } from 'react-router-dom'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user)=>{

      if (user){
        navigate('/')
      }else{
        console.log("logged Out")
        navigate('/login')
      }
    })
  },[navigate])

  return (
    <div>
      <ToastContainer theme='dark' />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/player' element={<Player/>} />
      </Routes>
    </div>
  )
}

export default App
