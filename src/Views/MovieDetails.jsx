// NAME: MovieDetails
// PURPOSE: The view for seeing the details of a selected movie.
//
// PROPS: showMovieDetails: A function that gets the selected movie's
//                          details and set's them to the current movie.
//        favorites: the list of the user's favorites movies.
//        addToFavorites: A function to add the item from the favorites list.
//        removeFavorite: A function to remove a movie from the favorites list.
//        movies: the movie list without filter restrictions.
//        ratedMovies: the array of movies with user given ratings.
//        setRatedMovies: the function for assigning rating to a movie.
//
// ----------------------------------------------------------------------------
import Favorites from "../Components/Favorites";
import Header from "../Components/Header";
import SingleMovie from "../Components/SingleMovie";

export default function MovieDetails(props) {
  return (
    <div className="bg-gray-100 flex flex-col h-screen font-myFont">
      <Header />
      <div className="grid grid-cols-[1fr_auto] gap-4 m-4 h-full">
        <SingleMovie
          movie={props.movie}
          addToFavorites={props.addToFavorites}
          ratedMovies={props.ratedMovies}
          setRatedMovies={props.setRatedMovies}
        />
        <Favorites
          favorites={props.favorites}
          showMovieDetails={props.showMovieDetails}
          removeFavorite={props.removeFavorite}
        />
      </div>
    </div>
  );
}
