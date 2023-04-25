// NAME: Favorites
// PURPOSE: Display the list of favorites (composed of favoriteItem).
//
// PROPS: favorites: The list of favorited movies.
//        showMovieDetails: A function that gets the selected movie's
//                          details and set's them to the current movie.
//        removeFavorite: A function to remove the ite.m from the favorites list.
//
// ----------------------------------------------------------------------------
import { useState } from "react";
import FavoriteItem from "./FavoriteItem";

export default function Favorites(props) {
  const [isOpen, setIsOpen] = useState(true); // State for if favorite list is open

  const changeOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const icon = isOpen ? (
    <i className="fa-solid fa-arrow-right"></i>
  ) : (
    <i className="fa-solid fa-arrow-left"></i>
  );

  const openOrClosedCSS = isOpen ? "w-[250px]" : "w-[0px]";

  return (
    <div className="flex flex-row p-2 bg-zinc-200 border-solid border-zinc-300 drop-shadow-lg border rounded-lg">
      <div className="flex justify-end p-2">
        <button onClick={changeOpen}>{icon}</button>
      </div>
      <div className={`${openOrClosedCSS} transition-all`}>
        <div className={`${isOpen ? "" : "hidden"} transition-all`}>
          <h1 className="font-bold text-center text-xl pb-2 w-[230px]">
            Favorites
          </h1>
          <div className="h-[calc(100vh-172px)] overflow-scroll p-2">
            {props.favorites.length > 0 ? (
              props.favorites.map((f, index) => (
                <FavoriteItem
                  key={index}
                  movie={f}
                  showMovieDetails={props.showMovieDetails}
                  removeFavorite={props.removeFavorite}
                />
              ))
            ) : (
              <p className="text-center items-center mt-72">
                Favorites empty...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
