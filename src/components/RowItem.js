import React from 'react';
import './RowItem.css';

function RowItem({ movie, isLargeRow }) {
  const base_url = 'https://image.tmdb.org/t/p/original/';

  return (
    <img
      className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
      src={`${base_url}${
        isLargeRow ? movie.poster_path : movie.backdrop_path
      }`}
      alt={movie.name}
    />
  );
}

export default RowItem;