import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Chats from './pages/Chats'
import NotFound from './pages/NotFound'
import { useAuth } from './context/AuthContext'

import { Routes, Route } from 'react-router-dom';

function App() {
  const auth = useAuth();
  console.log(auth?.isLoggedIn);
  return (
    <main>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
       { auth?.isLoggedIn && auth?.user && (<Route path='/chat' element={<Chats />} /> )} 
        <Route path='*' element={<NotFound />} />
      </Routes> 
      </main> 

  )
}

export default App
