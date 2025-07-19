import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Player.css';

const VITE_TMDB_API = import.meta.env.VITE_TMDB_API

const Player = ({ videoId, closeModal }) => {
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      if (!videoId) return;
      
      try {
        const options = {
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${VITE_TMDB_API}`
          },
        };

        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${videoId}/videos?language=en-US`,
          options
        );
        const video = response.data.results[0];
        if (video) {
          setVideoData(video);
        }
      } catch (error) {
        console.error('Error fetching video data:', error);
      }
    };
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    console.log(videoData);
  }, [videoData]);

  if (!videoData) return null;

  return (
    <div className='modal'>
      <div className='modal-content'>
        <button className='close-btn' onClick={closeModal}>
          X
        </button>
        <iframe
          width='90%'
          height='90%'
          src={`https://www.youtube.com/embed/${videoData.key}`}
          title={videoData.name}
          frameBorder='0'
          allowFullScreen
        ></iframe>
        <div className='player-info'>
          <p><strong>Published Date:</strong> {new Date(videoData.published_at).toLocaleDateString()}</p>
          <p><strong>Name:</strong> {videoData.name}</p>
          <p><strong>Type:</strong> {videoData.type}</p>
        </div>
      </div>
    </div>
  );
};

export default Player;
