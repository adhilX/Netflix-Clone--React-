import React, { useEffect, useState } from 'react'
import NavBar from '../../components/Navbar/Navbar'
import Banner from '../../components/Banner/Banner'
import Footer from '../../components/Footer/Footer'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../../firebase/firebase'
import { useNavigate } from 'react-router-dom'

function    Home() {
  
const navigate = useNavigate()
      useEffect(()=>{
        
          onAuthStateChanged(auth, (user)=>{
              console.log(user)
            if(user){
              console.log('User Logged In')
              navigate('/')
            }else{
              console.log('User Logged Out')
              navigate('/login')
            }
          })
      },[])
  return (
   <>
   <NavBar/>
   <Banner/>
   <Footer/>
   </>
  )
}

export default Home