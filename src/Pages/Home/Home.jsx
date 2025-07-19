import React, { useState } from 'react'
import './Home.css'
import Navbar from  '../../Components/Navbar/Navbar'
import hero_banner from '../../assets/hero_banner.jpg'
import hero_title from '../../assets/hero_title.png'
import play_icon from '../../assets/play_icon.png'
import info_icon from '../../assets/info_icon.png'
import TitleCard from '../../Components/TitleCards/TitleCard'
import Footer from '../../Components/Footer/Footer'
import Player from '../Player/Player'

const Home = () => {
  
  const [selectedVideoId , setSelectedVideoId] = useState(null);
  const [showModal , setModal ] = useState(false);

  const handleCardClick = (videoId) => {
    setSelectedVideoId(videoId);
    setModal(true);
  }

  const closeModal = () => {
    setModal(false);
    setSelectedVideoId(null);
  };
  return (
    <div className='home' >

      <Navbar/>
      <div className="hero">

        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />

          <p>Discovering his ties to a secret ancient order, a young man
            living in modern Istanbul embarks on a quest to save the city
            from an immortal enemy.</p>

            <div className='hero-btns'>

              <button className='btn' ><img src={play_icon} alt="" />play</button>
              <button className='btn dark-btn' ><img src={info_icon} alt="" />More info</button>

            </div>
            
            <TitleCard handleCardClick={handleCardClick} />

        </div>
      </div>
      <div className="more-cards">

      <TitleCard title={'Blockbuster Movies'} category={'top_rated'} handleCardClick={handleCardClick} />
      <TitleCard title={'Only On Netflix'} category={'popular'} handleCardClick={handleCardClick} />
      <TitleCard title={'Upcoming'} category={'upcoming'} handleCardClick={handleCardClick} />
      <TitleCard title={'Top Pics for You'} category={'now_playing'} handleCardClick={handleCardClick} />
        
      </div>

      {showModal && selectedVideoId && (
        <Player videoId={selectedVideoId} closeModal={closeModal} />
      )}
      <Footer/>
    </div>
  )
}

export default Home
