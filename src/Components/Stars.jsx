// NAME: Stars
// PURPOSE: The stars to show for a movie rating.
//
// PROPS: count: The count of the stars to output.
//
// CITATION: rounding a number to nearest 0.5.
// https://stackoverflow.com/questions/6137986/javascript-roundoff-number-to-nearest-0-5
//
// ----------------------------------------------------------------------------
export default function Stars(props) {
  // Get an array of full, half, and empty stars.
  const makeStars = () => {
    const stars = [];
    const full = Math.round(props.count * 2) / 2;
    const half = Math.round(full % 1);

    for (let i = 0; i < Math.floor(full); i++) {
      stars.push(<i className="fa-solid fa-star"></i>);
    }

    for (let i = 0; i < half; i++) {
      stars.push(<i className="fa-solid fa-star-half-stroke"></i>);
    }

    for (let i = 10 - half - full; i > 0; i--) {
      stars.push(<i className="fa-regular fa-star"></i>);
    }

    return stars;
  };

  const stars = makeStars();

  return (
    <div className="flex flex-row">
      {stars.map((s, index) => (
        <div key={index} className="text-2xl">
          {s}
        </div>
      ))}
    </div>
  );
};