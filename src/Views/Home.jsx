// NAME: Home
// PURPOSE: Home view of the app.
//
// PROPS: handleInput: function to handle change in the search bar input field.
//        handleSearch: function to handle user input for searching movies.
//        handleShowAll: function to handle when the user selects show all movies.
//        isLoading: state for when the fetch statement is loading data from API.
//
// ----------------------------------------------------------------------------
import { Link } from "react-router-dom";

export default function Home(props) {
  return (
    <div className="bg-hero-pattern h-screen w-screen flex flex-col items-center justify-center font-myFont">
      <h1 className="text-center text-white text-5xl font-bold">
        Movie Browser
      </h1>
      {!props.isLoading ? (
        <div className="p-4">
          <div className="flex p-2">
            <label className="text-white text-lg whitespace-nowrap pr-4">
              Movie Title
            </label>
            <input
              className="w-full rounded-lg drop-shadow-lg px-2"
              onChange={props.handleInput}
              type="text"
              placeholder="Enter movie title..."
            />
          </div>
          <div className="mt-2 font-semibold">
            <Link
              to={"/default"}
              className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg"
              onClick={props.handleSearch}
            >
              Show Matching Movies
            </Link>
            <Link
              to={"/default"}
              className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg"
              onClick={props.handleShowAll}
            >
              Show All Movies
            </Link>
          </div>
        </div>
      ) : (
        <svg
          version="1.1"
          id="L9"
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          viewBox="0 0 100 100"
          enable-background="new 0 0 0 0"
        >
          <path
            fill="#fff"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      )}
      <footer className="p-4 text-center absolute bottom-0">
        <p className="">
          Photo by{" "}
          <a href="https://unsplash.com/@thomasw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Thomas William
          </a>{" "}
          on{" "}
          <a href="https://unsplash.com/photos/4qGbMEZb56c?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText">
            Unsplash
          </a>
        </p>
      </footer>
    </div>
  );
}
