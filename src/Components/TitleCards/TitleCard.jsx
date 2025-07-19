import React ,{useEffect, useRef, useState} from 'react'
import axios from 'axios';
import './TitleCard.css'


const TitleCard = ({title , category , handleCardClick }) => {

  const CardRef = useRef();
  const [movies , setMovies] = useState([]);

  const handlewheel = (e)=>{
    e.preventDefault();
    e.currentTarget.scrollLeft += e.deltaY;
    
  }
  useEffect(()=> {

    const fetchMovies = async () => {

      try{

        const options = {
          method :'GET',
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5ODExYWI5MTExYWRlZWMxN2UyMzk0Zjg1OTE3OTM4YiIsIm5iZiI6MTcyNTc3NTE5NS40NDMzOCwic3ViIjoiNjZkZDNiNDM1NGFmMGUxNzBlMzhiZTFlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.lyJfiRnaLtIqCuVgBQ8HjcaMKBxWVd-gxLKsceRSGU0',
          },
        };

        const response = await axios.get(`https://api.themoviedb.org/3/movie/${category?
          category : "now_playing"}?language=en-US&page=1`, options);
        setMovies(response.data.results);
      } catch(error){
        console.log('Error fetching movies',error)
      }
    };
    fetchMovies();
  },[category])
  
  useEffect(()=>{
    const refCurrent = CardRef.current;
    refCurrent.addEventListener('wheel', handlewheel);
    return()  => refCurrent.removeEventListener('wheel',handlewheel)
  },[CardRef , movies])

  const handleCardClickEvent = (id) => {
    handleCardClick(id);
  };

  return (
    <div className='title-card' >
      <h2>{title ? title : 'Popular On Netflix'}</h2>

      <div className="card-list" ref={CardRef} >
        
        {
          movies.map(( card )=>{
            return <div className="card" key={card.id} onClick={() => handleCardClickEvent(card.id)}>
              <img src={`https://image.tmdb.org/t/p/w500${card.backdrop_path}`} alt={card.original_title}/>
              <p>{card.original_title }</p>
            </div>

          })
        }
      </div> 
    </div>
    
  )
}

export default TitleCard
