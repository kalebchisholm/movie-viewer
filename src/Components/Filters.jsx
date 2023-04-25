// NAME: Filters
// PURPOSE: The component housing all of the filters a user can use on the movie list.
//
// PROPS: genres: List of the genres to filter by.
//        filterReset: function to reset the selected filters.
//        filterMovies: function to filter the movies list.
//        setCurrentFilter: state function to set currently selected filter.
//        setTitleFilter: state function to set filter on title.
//        setGenreFilter: state function to set filter on genre.
//        setYearFilterLess: state function to set filter on less than year.
//        setYearFilterGreater: state function to set filter on greater than year.
//        setRatingFilterLess: state function to set filter on less than rating.
//        setRatingFilterGreater: state function to set filter on greater than rating.
//        currentFilter: the value of the currently selected filter option.
//        searchedResults: the movie list of the results from search/all movies.
//        titleFilter: the value of the title filter.
//        genreFilter: the value of the genre filter.
//        yearFilterLess: the value of the year less than filter.
//        yearFilterGreater: the value of the year greater than filter.
//        ratingFilterLess: the value of the rating less than filter.
//        ratingFilterGreater: the value of the rating greater than filter.
//
// ----------------------------------------------------------------------------
import { useState } from "react";

export default function Filters(props) {
  const [isOpen, setIsOpen] = useState(true); // State for if filters is open

  const changeOpen = () => {
    const newIsOpen = !isOpen;
    setIsOpen(newIsOpen);
  };

  const icon = isOpen ? (
    <i className="fa-solid fa-arrow-left"></i>
  ) : (
    <i className="fa-solid fa-arrow-right"></i>
  );

  const openOrClosedCSS = isOpen ? "w-[350px]" : "w-[0px]";

  // --------------- HANDLERS ---------------
  const handleFilterSelect = (e) => {
    props.setCurrentFilter(e.target.value);
  };
  const handleSetTitleFilter = (e) => {
    props.setTitleFilter(e.target.value);
  };
  const handleSetGenreFilter = (e) => {
    props.setGenreFilter(e.target.value);
  };
  const handleSetYearFilterLess = (e) => {
    props.setYearFilterLess(e.target.value);
  };
  const handleSetYearFilterGreater = (e) => {
    props.setYearFilterGreater(e.target.value);
  };
  const handleSetRatingFilterLess = (e) => {
    props.setRatingFilterLess(e.target.value);
  };
  const handleSetRatingFilterGreater = (e) => {
    props.setRatingFilterGreater(e.target.value);
  };

  // --------------- RETURN ---------------
  return (
    <div className="flex flex-row p-2 bg-zinc-200 border-solid border-zinc-300 drop-shadow-lg border rounded-lg">
      <div className={`${openOrClosedCSS} transition-all`}>
        <div className={`${isOpen ? "" : "hidden"} transition-all`}>
          <h1 className="font-bold text-center text-xl pb-2">Movie Filters</h1>
          {/* --------------- TITLE -------------- */}
          <div className="grid grid-cols-2 m-2">
            <div>
              <input
                className="mr-2"
                type="radio"
                name="filter"
                value="title"
                checked={props.currentFilter === "title"}
                onClick={handleFilterSelect}
                readOnly
              />
              <label htmlFor="titleSort">Title</label>
            </div>
            <input
              disabled={props.currentFilter !== "title"}
              className="rounded-lg drop-shadow-lg px-2 border-solid border-gray-100 border"
              placeholder="Enter title here"
              type="text"
              value={props.titleFilter}
              onChange={handleSetTitleFilter}
            />
          </div>

          {/* --------------- GENRE -------------- */}
          <div className="grid grid-cols-2 m-2">
            <div>
              <input
                className="mr-2"
                type="radio"
                name="filter"
                value="genre"
                checked={props.currentFilter === "genre"}
                onClick={handleFilterSelect}
                readOnly
              />
              <label htmlFor="genreSort">Genre</label>
            </div>
            <select
              disabled={props.currentFilter !== "genre"}
              className="rounded-lg drop-shadow-lg px-2 border-solid border-gray-100 border"
              value={props.genreFilter}
              onChange={handleSetGenreFilter}
            >
              <option defaultValue={"Select Genre"} value="all">
                Select Genre
              </option>
              {props.genres.map((g, index) => (
                <option value={g} key={index}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* --------------- YEAR -------------- */}
          <div className="pl-2">
            <input
              className="mr-2"
              type="radio"
              name="filter"
              value="year"
              checked={props.currentFilter === "year"}
              onClick={handleFilterSelect}
              readOnly
            />
            <label>Year</label>
            <div className="grid grid-rows-2 m-2">
              <label>Less than: {props.yearFilterLess}</label>
              <input
                disabled={props.currentFilter !== "year"}
                className="rounded-lg drop-shadow-lg px-2 border-solid border-gray-100 border mb-2"
                type="range"
                min={1900}
                max={2023}
                step={1}
                value={props.yearFilterLess}
                onChange={handleSetYearFilterLess}
              />
              <label>Greater than: {props.yearFilterGreater}</label>
              <input
                disabled={props.currentFilter !== "year"}
                className="rounded-lg drop-shadow-lg px-2 border-solid border-gray-100 border"
                type="range"
                min={1900}
                max={2023}
                step={1}
                value={props.yearFilterGreater}
                onChange={handleSetYearFilterGreater}
              />
            </div>
          </div>

          {/* --------------- RATING -------------- */}
          <div className="pl-2">
            <input
              className="mr-2"
              type="radio"
              name="filter"
              value="rating"
              checked={props.currentFilter === "rating"}
              onClick={handleFilterSelect}
              readOnly
            />
            <label>Rating</label>
            <div className="grid grid-rows-2 m-2">
              <label>Less than: {props.ratingFilterLess}</label>
              <input
                disabled={props.currentFilter !== "rating"}
                className="rounded-lg drop-shadow-lg px-2 border-solid border-gray-100 border mb-2"
                type="range"
                min={0}
                max={10}
                step={1}
                value={props.ratingFilterLess}
                onChange={handleSetRatingFilterLess}
              />
              <label>Greater than: {props.ratingFilterGreater}</label>
              <input
                disabled={props.currentFilter !== "rating"}
                className="rounded-lg drop-shadow-lg px-2 border-solid border-gray-100 border"
                type="range"
                min={0}
                max={10}
                step={1}
                value={props.ratingFilterGreater}
                onChange={handleSetRatingFilterGreater}
              />
            </div>
          </div>

          {/* --------------- SUBMIT/CLEAR -------------- */}
          <div className="flex justify-between m-6">
            <button
              className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg font-semibold"
              onClick={() => props.filterMovies()}
            >
              Filter
            </button>
            <button
              className="bg-emerald-300 py-2 px-4 rounded-lg m-2 drop-shadow-lg font-semibold"
              onClick={() => props.filterReset()}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
      <div className="flex justify-end p-2">
        <button onClick={changeOpen}>{icon}</button>
      </div>
    </div>
  );
}
