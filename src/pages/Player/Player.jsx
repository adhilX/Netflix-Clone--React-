import React, { useEffect,useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import netflix_spinner from '../../assets/netflix_spinner.gif'
import { CircleLoader, PuffLoader } from 'react-spinners'

const Player = () => {
    const [ApiData, setApiData] = useState({
        name:'',
        key:'',
        published_at : '',
        typeof: ''
    })
        const [LoadingSpinner , setLoadingSpinner] = useState(false)
    
    const {id} = useParams()
    const navigate = useNavigate()
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDcxZTVkOGM1Yzc2YjJkNTk4MzA2NGQyZGIyY2MxYyIsIm5iZiI6MTc0Mzk0NDc2Ny4xNDksInN1YiI6IjY3ZjI3YzNmZTFkNWMyM2M2ZWQ5NTVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V6SnQUh5nJMVvWBchxo9DozFLLqperzOtTEhGP2KS8g'
        }
      };
      

      useEffect(() => {
        async function FetchData(){
          try {
            setLoadingSpinner(true)
          const results= await  axios(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
          // console.log(results.data.results[0])
             setApiData(results.data.results[0])
             setLoadingSpinner(false)
            
          } catch (error) {
          console.log(error)            
          }
        }
        FetchData()
        
      }, [])
      
  return (
    <>
      {LoadingSpinner? <div className='spinner'>
    <PuffLoader  color="#c90000" /> 
       </div>:
<div className="player">
  <img onClick={() => navigate(-2)} src={back_arrow_icon} alt="back" />
  <div className="player-content">
    <iframe
      width="100%"
      height="100%"
      src={`https://www.youtube.com/embed/${ApiData.key}`}
      title="Trailer"
      frameBorder="0"
      allowFullScreen
      ></iframe>
  </div>
  <div className="player-info">
    <p><strong>Published:</strong> {ApiData.published_at.slice(0, 10)}</p>
    <p><strong>Title:</strong> {ApiData.name}</p>
    <p><strong>Type:</strong> {ApiData.type}</p>
  </div>
</div>}
  </>
  )
}

export default Player
