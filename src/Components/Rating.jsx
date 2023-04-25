// NAME: Rating
// PURPOSE: Rating system component to let the user rate a movie.
//
// PROPS: movie: The movie.
//        ratedMovies: list of movies with user assigned ratings.
//        setRatedMovies: function to assign the movie a rating.
//
// ----------------------------------------------------------------------------
import { useState } from "react";
import Stars from "./Stars";

export default function Rating(props) {
  // Current movie and associated rating
  const movieRating = props.ratedMovies.find(
    (movie) => movie.movieID === props.movie.id
  );

  const [rating, setRating] = useState(5); // rating to assign to movie.
  const [disabled, setDisabled] = useState(movieRating.rating !== -1); // if movie has rating

  // ------------------ HANDLERS -----------------------
  const handleRatingChange = (e) => {
    const changedRatings = props.ratedMovies.map((movie) => {
      if (movie.movieID === props.movie.id) {
        return { movieID: props.movie.id, rating: e.target.value };
      } else {
        return movie;
      }
    });

    props.setRatedMovies(changedRatings);
    localStorage.setItem("rating", JSON.stringify(changedRatings));
    movieRating.rating = e.target.value;
    setRating(e.target.value);
  };

  const handleSetRating = () => {
    setRating(rating);
    setDisabled(true);
    console.log(rating);
  };

  // ----------------------- RETURN ------------------------
  return (
    <div className="flex flex-col justify-center">
      {!disabled ? (
        <h1 className="text-xl">Rate this movie {rating} stars</h1>
      ) : (
        <h1 className="text-xl">Your Rating</h1>
      )}
      <div>
        {!disabled ? (
          <div>
            <input
              disabled={disabled}
              className="rounded-lg drop-shadow-lg px-2 border-solid border-gray-100 border mb-2"
              type="range"
              min={0}
              max={10}
              step={0.5}
              value={rating}
              onChange={(e) => handleRatingChange(e)}
            />
            <button
              className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg"
              disabled={disabled}
              onClick={handleSetRating}
            >
              Submit Rating
            </button>
          </div>
        ) : (
          <div>
            <Stars count={movieRating.rating} />
            <p>{movieRating.rating} stars</p>
          </div>
        )}
      </div>
    </div>
  );
}
