// NAME: App
// PURPOSE: The app.
//
// PROJECT AUTHOR: Kaleb Chisholm
// EMAIL: kchis140@mtroyal.ca
// DATE: February 28, 2023
//
// ----------------------------------------------------------------------------
import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Views/Home";
import Default from "./Views/Default";
import MovieDetails from "./Views/MovieDetails";
import * as cloneDeep from "lodash/cloneDeep";

function App() {
  const [search, setSearch] = useState(""); // search parameter
  const [movieData, setMovieData] = useState([]); // the movie data from API.
  const [searchedResults, setSearchedResults] = useState([]); // searched movies.
  const [currentMovie, setCurrentMovie] = useState(); // current movie being viewed.
  const [favorites, setFavorites] = useState([]); // favorites list.
  const [ratedMovies, setRatedMovies] = useState([]); // the movies and associated ratings.
  const [isLoading, setIsLoading] = useState(true); // API loading or not.

  useEffect(() => {

    // Create the list of movie ID, ratings pairs. Initialized to -1 unless rated by user.
    const createRatings = (movies) => {
      if (localStorage.getItem("rating") === null) {
        const ratings = movies.map((movie) => {
          return { movieID: movie.id, rating: -1 };
        });
        localStorage.setItem("rating", JSON.stringify(ratings));
        setRatedMovies(ratings);
      } else {
        setRatedMovies(JSON.parse(localStorage.getItem("rating")));
      }
    };

    // Fetch movie data from API or get from localStorage.
    if (localStorage.getItem("movieData") === null) {
      async function getData() {
        try {
          // Fetch movie data
          const resp = await fetch(
            "https://www.randyconnolly.com/funwebdev/3rd/api/movie/movies-brief.php?limit=200"
          );
          const data = await resp.json();

          // Sort data
          const sortedData = data.sort(function (a, b) {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            } else {
              return 0;
            }
          });

          // Set data
          setMovieData(sortedData);
          createRatings(sortedData);
          localStorage.setItem("movieData", JSON.stringify(sortedData));
          setIsLoading(false);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    } else {
      const data = localStorage.getItem("movieData");
      setMovieData(JSON.parse(data));
      createRatings(JSON.parse(data));
      setIsLoading(false);
    }
  }, []);

  // --------------- HANDLERS ----------------------
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    const lowerSearch = search.toLowerCase();
    const searchedData = movieData.filter(function (movie) {
      const t = movie.title.toString().toLowerCase().trim();
      // return items that contain substring of target or target contains subset of title
      return t.includes(lowerSearch) || lowerSearch.includes(t);
    });
    setSearchedResults(searchedData);
  };

  const handleShowAll = () => {
    setSearchedResults(movieData);
  };

  const showMovieDetails = (id) => {
    const movie = searchedResults.find(function (movie) {
      return movie.id === id;
    });

    setCurrentMovie(movie);
  };

  const addToFavorites = (id) => {
    const movie = searchedResults.find(function (movie) {
      return movie.id === id;
    });

    const alreadyInFavs = favorites.find(function (movie) {
      return movie.id === id;
    });

    if (alreadyInFavs === undefined) {
      setFavorites([...favorites, movie]);
    } else {
      console.log("Already in favorites");
    }
  };

  const removeFavorite = (id) => {
    const copy = cloneDeep(favorites);
    const index = copy.findIndex(function (movie) {
      return movie.id === id;
    });
    copy.splice(index, 1);
    setFavorites(copy);
  };

  return (
    <Router basename="comp4513-a1">
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleInput={handleInput}
              handleSearch={handleSearch}
              handleShowAll={handleShowAll}
              isLoading={isLoading}
            />
          }
        />
        <Route
          path="/default"
          element={
            <Default
              movies={movieData}
              searchedResults={searchedResults}
              setSearchedResults={setSearchedResults}
              showMovieDetails={showMovieDetails}
              favorites={favorites}
              addToFavorites={addToFavorites}
              removeFavorite={removeFavorite}
            />
          }
        />
        <Route
          path="/detailed"
          element={
            <MovieDetails
              movie={currentMovie}
              favorites={favorites}
              ratedMovies={ratedMovies}
              addToFavorites={addToFavorites}
              removeFavorite={removeFavorite}
              showMovieDetails={showMovieDetails}
              setRatedMovies={setRatedMovies}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
