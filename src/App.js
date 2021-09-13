// Import Index
import './index.css';
// Imports Movie component 
import Movie from './Components/Movie';
//  Import REACT hook
import {useState, useEffect} from 'react'

//TMDB API Data fetched with generated API Key. Note Comedy Genre = 35
const SEARCH_API = "https://api.themoviedb.org/3/discover/movie?api_key=842d504b316030c6fe5b8b42793b3cf9&with_genres=35";


function App() {

  //arrays and variables in hook format
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [dataSource, setDataSource] = useState([]);
  const [Rating, setRating] = useState('');

  //Get JSON data from API using API Key
    useEffect(() => {
      fetch(SEARCH_API).then(res => res.json())
      .then(data =>{
        console.log(data);
        setMovies(data.results);
        setDataSource(data.results);
      })

  }, [])

//Movie search field filter submit event handler
const handleOnSubmit = (e) => {
  e.preventDefault();

      let ndata = dataSource.filter(data => data.title.toLowerCase() === searchTerm.toLowerCase())
      console.log(ndata);
      setMovies(ndata)
};
//Movie search field on change event handler
const handleOnChange = (e) => {
  setSearchTerm(e.target.value);
      let ndata = dataSource.filter(data => data.title.toLowerCase() === searchTerm.toLowerCase())
      console.log(ndata);
      setMovies(ndata);
}

// Sort by vote rating order
const handleRatingOnChange = (e) =>{
  setRating(e.target.value);
  if (e.target.value === 'Ascending'){
      dataSource.sort(function (a, b) {return a.vote_average - b.vote_average})
   } else if (e.target.value === 'Descending'){
      dataSource.sort(function (a, b) {return b.vote_average - a.vote_average})
   } else{

   }
}
  
return (
   <>
    <header>
 {/* Filter movie search field container */}
      <form onSubmit={handleOnSubmit}>
        <input 
          className="search" 
          type="text" 
          placeholder="Search..."
          value = {searchTerm}
          onChange={handleOnChange}
        />
     
      {/*  Rating Sort field container*/}
      <div className = "sorting">
      <label>Rating</label>
       <select onChange={handleRatingOnChange}  style={{width:200, height:40, borderRadius:3}}>
          <option value="" disabled selected>sort by rating</option>
          <option>Ascending</option>
          <option>Descending</option>
          </select>
     </div>
      </form>
     </header>
{/* links to all container for parameters in the view */}
    <div className="movie-container">
        {movies.length > 0 && 
        movies.map((movie) => <Movie key = 
        {movie.id} {...movie}/>)}
    </div>
    </>
  );

}

export default App;
