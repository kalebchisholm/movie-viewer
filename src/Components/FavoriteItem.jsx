// NAME: FavoriteItem
// PURPOSE: Display a movie item that is in the favorites list.
//
// PROPS: movie: The favorited movie.
//        showMovieDetails: A function that gets the selected movie's
//                          details and set's them to the current movie.
//        removeFavorite: A function to remove the item from the favorites list.
//
// ----------------------------------------------------------------------------

import { useState } from "react";
import { Link } from "react-router-dom";

export default function FavoriteItem(props) {
  const [isHover, setIsHover] = useState(false); // state for show remove button

  // --------------- HANDLERS ---------------
  const handleViewClick = () => {
    props.showMovieDetails(props.movie.id);
  };
  const handleFavoriteClick = () => {
    props.removeFavorite(props.movie.id);
  };

  // --------------- RETURN ---------------
  return (
    <div className="grid grid-cols-2 py-2 relative max-w-[240px]">
      <Link
        to={"/detailed"}
        onClick={handleViewClick}
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <figure>
          <img
            src={`https://image.tmdb.org/t/p/w92${props.movie.poster}`}
            alt={props.movie.title}
          />
        </figure>
      </Link>
      <div className="flex items-center">
        <p>{props.movie.title}</p>
      </div>
      {isHover && (
        <button
          className="absolute top-0 right-[140px] bg-white border-2 border-black p-1 rounded-full"
          // check on mouse enter for the button to remove flickering
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={handleFavoriteClick}
        >
          ❌
        </button>
      )}
    </div>
  );
}
