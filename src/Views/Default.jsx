// NAME: Default
// PURPOSE: The default view consisting of the movie list, header,
//          filters and favorites.
//
// PROPS: searchedResults: the movie results to display.
//        setSearchedResults: function to set the searched results taking into account
//                            the filters applied to the movie list.
//        showMovieDetails: A function that gets the selected movie's
//                          details and set's them to the current movie.
//        favorites: the list of the user's favorites movies.
//        addToFavorites: A function to add the item from the favorites list.
//        removeFavorite: A function to remove a movie from the favorites list.
//        movies: the movie list without filter restrictions.
//
// ----------------------------------------------------------------------------
import { useState } from "react";
import Favorites from "../Components/Favorites";
import Filters from "../Components/Filters";
import Header from "../Components/Header";
import MovieList from "../Components/MovieList";

export default function Default(props) {
  const genres = getGenres();

  // Get the possibe genres from a list of the movies.
  function getGenres() {
    const movieGenres = [];
    for (let i = 0; i < props.movies.length; i++) {
      const genres = props.movies[i].details.genres;
      if (genres) {
        for (let n = 0; n < genres.length; n++) {
          const genre = genres[n].name;
          if (!movieGenres.includes(genre)) {
            movieGenres.push(genre);
          }
        }
      }
    }
    movieGenres.sort();
    return movieGenres;
  }

  // ---------------- FILTERING STATES -------------------
  const [currentFilter, setCurrentFilter] = useState("title");
  const [titleFilter, setTitleFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");
  const [yearFilterLess, setYearFilterLess] = useState(2023);
  const [yearFilterGreater, setYearFilterGreater] = useState(1900);
  const [ratingFilterLess, setRatingFilterLess] = useState(0.0);
  const [ratingFilterGreater, setRatingFilterGreater] = useState(10.0);

  // ---------------- SORTING STATES -------------------
  const [sorted, setSorted] = useState(props.searchedResults);

  // 1 is ascending, -1 is descending, 0 is none.
  const [direction, setDirection] = useState(-1);

  // 1: title, 2: year, 3: rating, 4: popularity
  const [currentSort, setCurrentSort] = useState(1);

  // -------------------- HANDLERS ---------------------
  const handleSort = (col) => {
    setDirection(direction * -1);

    if (col === 1) {
      direction === 1 ? setSorted(sortTitles(1)) : setSorted(sortTitles(-1));
      setCurrentSort(1);
    } else if (col === 2) {
      direction === 1 ? setSorted(sortYears(1)) : setSorted(sortYears(-1));
      setCurrentSort(2);
    } else if (col === 3) {
      direction === 1 ? setSorted(sortRatings(1)) : setSorted(sortRatings(-1));
      setCurrentSort(3);
    } else {
      direction === 1
        ? setSorted(sortPopularity(1))
        : setSorted(sortPopularity(-1));
      setCurrentSort(4);
    }
  };

  // -------------- SORT FUNCTIONS ------------------
  const sortTitles = (factor) => {
    return sorted.sort(function (a, b) {
      if (a.title < b.title) {
        return -1 * factor;
      } else if (a.title > b.title) {
        return 1 * factor;
      } else {
        return 0;
      }
    });
  };

  const sortYears = (factor) => {
    return sorted.sort(function (a, b) {
      const date1 = new Date(a.release_date);
      const date2 = new Date(b.release_date);
      if (date1 < date2) {
        return -1 * factor;
      } else if (date1 > date2) {
        return 1 * factor;
      } else {
        return 0;
      }
    });
  };

  const sortRatings = (factor) => {
    return sorted.sort(function (a, b) {
      if (factor === 1) {
        return parseFloat(a.ratings.average) - parseFloat(b.ratings.average);
      } else {
        return parseFloat(b.ratings.average) - parseFloat(a.ratings.average);
      }
    });
  };

  const sortPopularity = (factor) => {
    return sorted.sort(function (a, b) {
      if (factor === 1) {
        return (
          parseFloat(a.ratings.popularity) - parseFloat(b.ratings.popularity)
        );
      } else {
        return (
          parseFloat(b.ratings.popularity) - parseFloat(a.ratings.popularity)
        );
      }
    });
  };

  const filterMovies = () => {
    // TITLE FILTER
    if (currentFilter === "title") {
      const lowerSearch = titleFilter.toLowerCase();
      const filtered = props.movies.filter(function (movie) {
        const t = movie.title.toString().toLowerCase().trim();
        return t.includes(lowerSearch);
      });

      props.setSearchedResults(filtered);
    } else if (
      currentFilter === "genre" &&
      genreFilter !== "all" &&
      genreFilter !== ""
    ) {
      const filtered = props.movies.filter(function (movie) {
        return movie.details.genres?.find((g) => g.name === genreFilter);
      });
      props.setSearchedResults(filtered);
    } else if (currentFilter === "year") {
      const filtered = props.movies.filter(function (movie) {
        return (
          yearFilterLess > movie.release_date.slice(0, 4) &&
          movie.release_date.slice(0, 4) > yearFilterGreater
        );
      });
      props.setSearchedResults(filtered);
    } else if (currentFilter === "rating") {
      const filtered = props.movies.filter(function (movie) {
        return (
          ratingFilterLess > movie.ratings.average &&
          movie.ratings.average > ratingFilterGreater
        );
      });
      props.setSearchedResults(filtered);
    }
  };

  // Reset the assigned filters for the movies.
  const filterReset = () => {
    setCurrentFilter("title");
    props.setSearchedResults(props.movies);
    setTitleFilter("");
    setGenreFilter("");
    setYearFilterLess(2023);
    setYearFilterGreater(1900);
    setRatingFilterLess(10.0);
    setRatingFilterGreater(0.0);
  };

  return (
    <div className="bg-zinc-100 flex flex-col h-screen font-myFont">
      <Header />
      <div className="grid grid-cols-[auto_1fr_auto] gap-4 m-4 h-full">
        <Filters
          genres={genres}
          filterReset={filterReset}
          filterMovies={filterMovies}
          setCurrentFilter={setCurrentFilter}
          setTitleFilter={setTitleFilter}
          setGenreFilter={setGenreFilter}
          setYearFilterLess={setYearFilterLess}
          setYearFilterGreater={setYearFilterGreater}
          setRatingFilterLess={setRatingFilterLess}
          setRatingFilterGreater={setRatingFilterGreater}
          currentFilter={currentFilter}
          searchedResults={props.searchedResults}
          titleFilter={titleFilter}
          genreFilter={genreFilter}
          yearFilterLess={yearFilterLess}
          yearFilterGreater={yearFilterGreater}
          ratingFilterLess={ratingFilterLess}
          ratingFilterGreater={ratingFilterGreater}
        />
        <MovieList
          movies={props.searchedResults}
          showMovieDetails={props.showMovieDetails}
          addToFavorites={props.addToFavorites}
          direction={direction}
          currentSort={currentSort}
          handleSort={handleSort}
        />
        <Favorites
          favorites={props.favorites}
          showMovieDetails={props.showMovieDetails}
          removeFavorite={props.removeFavorite}
        />
      </div>
    </div>
  );
};