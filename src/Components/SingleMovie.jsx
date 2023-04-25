// NAME: SingleMovie
// PURPOSE: A single movie view with associated details.
//
// PROPS: movie: The movie.
//        addToFavorites: A function to add the item from the favorites list.
//        ratedMovies: list of movies with user assigned ratings.
//        setRatedMovies: function to assign the movie a rating.
//
// ----------------------------------------------------------------------------
import { Link } from "react-router-dom";
import Modal from "react-modal";
import Rating from "./Rating";
import Stars from "./Stars";
import { useState } from "react";

export default function SingleMovie(props) {
  const [isOpen, setIsOpen] = useState(); // state for modal open/close.

  // ------------ HANDLERS -------------------
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleFavorite = () => {
    props.addToFavorites(movie.id);
  };

  // Modal styles.
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  // Simplifying props into variables.
  const movie = props.movie,
    title = movie.title,
    tagline = movie.tagline,
    release = movie.release_date,
    runtime = movie.runtime,
    revenue = movie.revenue,
    imdb = `https://www.imdb.com/title/${movie.imdb_id}`,
    tmdb = `https://www.themoviedb.org/movie/${movie.tmdb_id}`,
    genres = movie.details.genres,
    popularity = movie.ratings.popularity,
    rank = movie.ratings.average,
    count = movie.ratings.count,
    desc = movie.details.overview;

  // ------------------ RETURN ----------------
  return (
    <div className="flex p-4 bg-white rounded-lg border border-gray-200 drop-shadow-lg">
      <div>
        <h1 className="text-4xl font-bold">{title}</h1>
        <figure className="w-[342px]" onClick={openModal}>
          <img src={`https://image.tmdb.org/t/p/w342${movie.poster}`} alt="" />
        </figure>
      </div>
      <div className="mt-16 p-4">
        <p className="text-4xl font-bold mb-4">{tagline}</p>
        <div className="flex flex-row">
          <div className="whitespace-nowrap">
            <div className="py-2">
              <span className="font-semibold">Release date:</span> {release}
            </div>
            <div className="py-2">
              <span className="font-semibold">Runtime:</span> {runtime}mins
            </div>
            <div className="py-2">
              <span className="font-semibold">Revenue:</span> $
              {revenue.toLocaleString("en-US")} USD
            </div>
            <div className="flex flex-wrap w-[350px]">
              {genres.map((g, index) => (
                <div
                  key={index}
                  className="bg-emerald-300 w-min py-2 px-4 mr-2 my-2 rounded-full border border-emerald-400 drop-shadow-lg whitespace-nowrap"
                >
                  {g.name}
                </div>
              ))}
            </div>
          </div>
          <div className="px-4 py-2">{desc}</div>
        </div>
        <div className="flex flex-row">
          <div className="my-auto pr-12">
            <button className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg">
              <a href={tmdb}>TMDB</a>
            </button>
            <button className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg">
              <a href={imdb}>IMDB</a>
            </button>
          </div>
          <div className="text-center mt-2 w-1/2 flex">
            <div className="bg-gray-200 p-6 m-2 rounded-lg border border-gray-300 drop-shadow-lg">
              <h1 className="text-xl">User Ratings</h1>
              <Stars count={rank} />
              <div>
                ({popularity}, {rank}, {count})
              </div>
            </div>
            <div className="bg-gray-200 p-6 m-2 rounded-lg border border-gray-300 drop-shadow-lg">
              <Rating
                movie={movie}
                ratedMovies={props.ratedMovies}
                setRatedMovies={props.setRatedMovies}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row h-14">
        <button
          className="whitespace-nowrap bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg"
          onClick={handleFavorite}
        >
          ❤️ Favorite
        </button>
        <Link
          to={"/default"}
          className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg"
        >
          Close
        </Link>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="About the Site Modal"
        style={customStyles}
      >
        <figure className="w-[500px]">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster}`}
            alt={`movie-poster-${title}`}
          />
        </figure>
      </Modal>
    </div>
  );
}
