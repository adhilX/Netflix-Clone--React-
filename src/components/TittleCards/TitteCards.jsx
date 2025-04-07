import React, { useState } from "react";
import "./TitteCards.css";
import { Link } from "react-router-dom";
import netflix_spinner from '../../assets/netflix_spinner.gif'
import axios from "axios";
import { CircleLoader, PuffLoader } from "react-spinners";

function TitteCards({ title, category ,styleName}) {
    const [LoadingSpinner , setLoadingSpinner] = useState(false)
    const [ApiData , setApiData]= useState([])

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDcxZTVkOGM1Yzc2YjJkNTk4MzA2NGQyZGIyY2MxYyIsIm5iZiI6MTc0Mzk0NDc2Ny4xNDksInN1YiI6IjY3ZjI3YzNmZTFkNWMyM2M2ZWQ5NTVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V6SnQUh5nJMVvWBchxo9DozFLLqperzOtTEhGP2KS8g",
      },
    };
  
    React.useEffect(()=>{ 
      async function FetchData() {
          try {
            setLoadingSpinner(true)
            const result = await axios( `https://api.themoviedb.org/3/movie/${category?category:'now_playing'}?language=en-US&page=1`,options )
               setApiData(result.data.results)
              //  console.log(result.data.results)    
              setLoadingSpinner(false)        
          } catch (error) {
           console.log(error)            
          }
      }
      FetchData()
    },[])

  return (
    <>
      {LoadingSpinner? <div className='spinner'>
          <PuffLoader  color="#c90000" /> 
             </div> :
    <div className="titlecards">
      <h2>{title ? title : "Popular on Netfix"}</h2>
      <div className="card-list">
        {ApiData.map((card, index) => {
          return (
            <Link to={`/player/${card.id}`} className="card" key={index}>
{card.backdrop_path?<img src={`https://image.tmdb.org/t/p/w500/${card.backdrop_path}`} alt="" />:
     <div className='spinner'>
     <PuffLoader  color="#c90000" /> 
        </div>}
           <p style={styleName||undefined}>{card.original_title}</p>
            </Link>
          );
        })}
      </div>
    </div>}
  </>
  );
}

export default TitteCards;
