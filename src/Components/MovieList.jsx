// NAME: MovieList
// PURPOSE: Display the movie list in the default view.
//
// PROPS: movie: The movie.
//        showMovieDetails: A function that gets the selected movie's
//                          details and set's them to the current movie.
//        addToFavorites: A function to add the item from the favorites list.
//        direction: direction of the sort on the movie list. (asc or desc)
//        currentSort: the current sort applied to the movie list.
//        handleSort: handler function for when a new sort is selected.
//
// ----------------------------------------------------------------------------
import MovieItem from "./MovieItem";
import SortIndicator from "./SortIndicator";

export default function MovieList(props) {
  return (
    <div className="bg-zinc-200 border-solid border-zinc-300 drop-shadow-lg border rounded-lg p-2">
      <h1 className="text-center font-bold text-xl">List / Matches</h1>
      <div className="h-[calc(100vh-138px)] overflow-scroll mt-2 border border-gray-200 rounded-lg">
        {
          props.movies.length > 0 ? (
            <table className="table-auto w-full mt-4">
              <thead>
                <tr>
                  <th
                    className="p-2 cursor-pointer"
                    onClick={() => props.handleSort(1)}
                  >
                    <button>Title</button>
                    <SortIndicator
                      column={1}
                      direction={props.direction}
                      currentSort={props.currentSort}
                    />
                  </th>
                  <th
                    className="p-2 cursor-pointer"
                    onClick={() => props.handleSort(2)}
                  >
                    <button>Year</button>
                    <SortIndicator
                      column={2}
                      direction={props.direction}
                      currentSort={props.currentSort}
                    />
                  </th>
                  <th
                    className="p-2 cursor-pointer"
                    onClick={() => props.handleSort(3)}
                  >
                    <button>Rating</button>
                    <SortIndicator
                      column={3}
                      direction={props.direction}
                      currentSort={props.currentSort}
                    />
                  </th>
                  <th
                    className="p-2 cursor-pointer"
                    onClick={() => props.handleSort(4)}
                  >
                    <button>Popularity</button>
                    <SortIndicator
                      column={4}
                      direction={props.direction}
                      currentSort={props.currentSort}
                    />
                  </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.movies.map((m, index) => (
                  <MovieItem
                    movie={m}
                    key={index}
                    showMovieDetails={props.showMovieDetails}
                    addToFavorites={props.addToFavorites}
                  />
                ))}
              </tbody>
            </table>
          ) : (
            <div className="flex mt-48 justify-center">No movies available...</div>
          )
        }
      </div>
    </div>
  );
}
