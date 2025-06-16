import React, { useState, useEffect, useRef } from "react";
import axios from "../axios"; 
import "./Row.css";
import { ChevronLeft, ChevronRight } from "lucide-react"; // Left/right arrows

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const rowRef = useRef();

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchData();
  }, [fetchUrl]);

  const scroll = (direction) => {
    if (direction === "left") {
      rowRef.current.scrollLeft -= 500; 
    } else {
      rowRef.current.scrollLeft += 500;
    }
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row__container">
        <ChevronLeft
          className="row__arrow row__arrow--left"
          onClick={() => scroll("left")}
        />

        <div className="row__posters" ref={rowRef}>
          {movies.map((movie) => (
            <div key={movie.id} className="row__item">
              <img
                className={`row__poster ${isLargeRow ? "row__posterLarge" : ""}`}
                src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.name || movie.title || movie.original_name}
              />
              <p className="row__title">
                {movie.title || movie.name || movie.original_name}
              </p>
            </div>
          ))}
        </div>

        <ChevronRight
          className="row__arrow row__arrow--right"
          onClick={() => scroll("right")}
        />
      </div>
    </div>
  );
}

export default Row;
