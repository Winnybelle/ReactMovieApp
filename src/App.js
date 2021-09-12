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
  const [dataSource, setDataSource] = useState([])

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
  
return (
   <>
    <header>
 {/* Filter movie search field container */}
      <form onSubmit={handleOnSubmit}>
        <input 
          className="search" 
          type="text" 
          placeholder="...Search"
          value = {searchTerm}
          onChange={handleOnChange}
        />
      </form>
      {/*  Rating Sort field container*/}
      <div className = "sorting">
      <label>ratings</label>
       <select style={{width:200, height:40, borderRadius:3}}>
          <option value="" disabled selected></option>
          <option>Ascending</option>
          <option>Descending</option> 
        </select>
     </div>
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
