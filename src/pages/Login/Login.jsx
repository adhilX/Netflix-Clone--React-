import React, {useEffect, useState } from 'react'
import './Login.css'
import logo from '../../assets/logo.png'
import { replace, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { PuffLoader } from 'react-spinners'
import { toast } from 'react-toastify'
import { login, signup } from '../../firebase/AuthServies'
import { auth } from '../../firebase/firebase'

function Login() {
    const navigate = useNavigate()
    const [SignState , setSignState ] = useState('Sign In')
    const [User , setUser] = useState({
        name: "",
        email: '',
        password: ''
    })
    const [LoadingSpinner , setLoadingSpinner] = useState(false)
    useEffect(()=>{
        onAuthStateChanged(auth, (user)=>{
            console.log(user)
          if(user){
            console.log('User Logged In')
            navigate('/',{replace:true})
          }else{
            console.log('User Logged Out')
            navigate('/login'),{replace:true}
          }
        })
    },[])

    function HandelUserInput(e){
    setUser((p)=>({...p,[e.target.name]:e.target.value}))
    }
    const validateForm = () => {
      if (SignState === 'Sign Up') {
        if (User.name.trim() === '' && User.email.trim() === '' && User.password.trim() === '') {
          toast.error('Please fill out all the required details: Name, Email, and Password');
          return false;
        }
    
        if (User.name.trim() === '') {
          toast.error('Name is required for signing up');
          return false;
        }
      }
      if (User.email.trim() === '' && User.password.trim() === '') {
        toast.error('Please enter your email and password');
        return false;
      }
    
    
      if (User.email.trim() === '') {
        toast.error('Email is required');
        return false;
      }
    
      if (!User.email.includes('@') || !User.email.includes('.')) {
        toast.error('Please enter a valid email address');
        return false;
      }
    
      if (User.password.trim() === '') {
        toast.error('Password is required');
        return false;
      }
    
      if (User.password.length < 6) {
        toast.error('Password must be at least 6 characters long');
        return false;
      }
    
      return true;
    };
    
    
    const userAuth = async(e)=>{
        e.preventDefault()
        if(!validateForm())return
        try {    
            setLoadingSpinner(true)
            if(SignState === 'Sign In'){
                await login(User.email,User.password)
            }else{
                await signup(User.name , User.email , User.password)
            }
         setLoadingSpinner(false)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <>
  {LoadingSpinner? <div className='spinner'>
      <PuffLoader  color="#c90000" /> 
         </div> :
    <div className='login'>
      <img src={logo} alt=""  className='login-logo'/>
      <div className="login-form">
        <h1>{SignState}</h1>
        <form onSubmit={userAuth}>
          {SignState=== 'Sign Up' ?<input onChange={HandelUserInput} name='name' type="text" placeholder='Your name'/>:<></>}
          <input type='text' onChange={HandelUserInput} name='email' placeholder='Your Email'/>
          <input type='password' onChange={HandelUserInput} name='password' placeholder='Password'/>
          <button type='submit'>{SignState}</button>
          <div className="form-help">
            <div className="remember">
              <input type='checkbox'/>
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>
        <div className="form-switch">
       {SignState==='Sign In'? <p>New to Netflix?<span onClick={()=>setSignState('Sign Up')}>Sign Up Now</span></p>:
           <p>Already have an Account?<span onClick={()=>setSignState('Sign In')}>Sign In Now</span></p>}
        </div>
      </div>
    </div>}
    </>
  )
}

export default Login
