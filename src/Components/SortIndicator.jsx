// NAME: SortIndicator
// PURPOSE: Indicator showing the user the current sort on the movie list.
//
// PROPS: column: the column being sorted.
//        direction: direction of the sort on the movie list. (asc or desc)
//        currentSort: the current sort applied to the movie list.
//
// ----------------------------------------------------------------------------
export default function SortIndicator(props) {
  return (
    <div>
      {
        props.column === props.currentSort ? (
          props.direction === 1 ? (
            <i className="fa-solid fa-sort-down"></i>
          ) : (
            <i className="fa-solid fa-sort-up"></i>
          )
        ) : (
          <i className="fa-solid fa-sort"></i>
        )
      }
    </div>
  )
}
