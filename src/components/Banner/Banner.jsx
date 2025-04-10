import "./Banner.css";
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitteCards from "../TittleCards/TitteCards";
import React, { useEffect, useState } from "react";
import axios from "axios";


const styles= { bottom: -30 }
function  Banner() {

  //useMemo
  // const styles= useMemo(()=>({ bottom: -30 }))


  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMDcxZTVkOGM1Yzc2YjJkNTk4MzA2NGQyZGIyY2MxYyIsIm5iZiI6MTc0Mzk0NDc2Ny4xNDksInN1YiI6IjY3ZjI3YzNmZTFkNWMyM2M2ZWQ5NTVmYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.V6SnQUh5nJMVvWBchxo9DozFLLqperzOtTEhGP2KS8g'
    }
  };
  const randomNumber = Math.floor(Math.random() * 20);
  
  const [Banner , setBanner]= useState({original_title:'',overview:'',backdrop_path:''})
  useEffect(()=>{
    const FetchData= async()=>{
      try { 
        const response =await axios ('https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1', options)
        console.log(response.data.results[randomNumber]) 
        const {original_title,overview,backdrop_path} = response.data.results[randomNumber]
        setBanner({
          original_title,
          overview ,
          backdrop_path
        })
      } catch (error) {
        console.log(error)
      }
    }
 FetchData()
  },[])
    return (
        <>
        <div className="hero">
        {Banner.backdrop_path?<img className="banner-img" src={`https://image.tmdb.org/t/p/original/`+Banner.backdrop_path} alt="" />:<></>}
        <div className="hero-caption">
         <h1>{Banner.original_title}</h1>
          <p>{Banner.overview}
          </p>
          <div className="hero-btns">
            <button className='btn'><img src={play_icon} alt=''/>Play</button>
            <button className='btn dark-btn'><img src={info_icon} alt=''/>More Info</button>
        </div>
        <TitteCards styleName={styles} />
     
        </div>
      </div>

      <div className="more-cards">
      <TitteCards title={'Blockbuster Movies'} category={'top_rated'}/>
      <TitteCards title={'Only on Netfix'} category={'popular'}/>
      <TitteCards title={'Upcoming'} category={'upcoming'}/>
      <TitteCards title={'Topics for you'} category={"now_playing"}/>

      </div>
        </>
    );
}

export default React.memo(Banner);
