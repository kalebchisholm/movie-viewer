// NAME: MovieItem
// PURPOSE: Display a movie item in the movies list.
//
// PROPS: movie: The movie.
//        showMovieDetails: A function that gets the selected movie's
//                          details and set's them to the current movie.
//        addToFavorites: A function to add the item from the favorites list.
//
// ----------------------------------------------------------------------------
import { Link } from "react-router-dom";

export default function MovieItem(props) {
  // Simplifying props to variables
  const movie = props.movie,
    title = movie.title,
    year = movie.release_date.substring(0, 4),
    rating = movie.ratings.average,
    popularity = Math.round(movie.ratings.popularity);

  // -------------- HANDLERS ----------------
  const handleViewClick = () => {
    props.showMovieDetails(movie.id);
  };
  const handleFavoriteClick = () => {
    props.addToFavorites(movie.id);
  };

  // --------------- RETURN ------------------
  return (
    <tr className="bg-white border border-gray-200 text-center text-lg">
      <td className="p-2 ">
        <div className="flex">
          <img src={`https://image.tmdb.org/t/p/w92${movie.poster}`} alt="" />
          <p className="flex items-center pl-4">{title}</p>
        </div>
      </td>
      <td className="p-4">{year}</td>
      <td className="p-4">{rating}</td>
      <td className="p-4">{popularity}</td>
      <td>
        <div className="flex text-xl justify-evenly m-8">
          <button
            className="bg-white p-4 rounded-full drop-shadow-lg border-2 border-black"
            onClick={handleFavoriteClick}
          >
            ❤️
          </button>
          <Link
            to={"/detailed"}
            className="bg-emerald-300 py-3 px-4 rounded-lg m-2 drop-shadow-lg text-base font-semibold"
            onClick={handleViewClick}
          >
            View
          </Link>
        </div>
      </td>
    </tr>
  );
}