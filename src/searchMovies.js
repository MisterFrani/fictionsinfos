import React, { useState } from "react";
import MovieCard from "./movieCard";

export default function SearchMovies() {
  //states - input query, movies

  const [$query, $setQuery] = useState("");

  const [$movies, $setMovies] = useState([]);

  const $searchMovies = async (e) => {
    e.preventDefault();

    const $url = `https://api.themoviedb.org/3/search/movie?api_key=f94b1a69910c525c58e1093fbdef2da1&language=fr-FR&query=${$query}&page=1&include_adult=false`;

    try {
      const $res = await fetch($url);
      const $data = await $res.json();
      $setMovies($data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={$searchMovies}>
        <label className="label" htmlFor="$query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="$query"
          placeholder="Recherche"
          value={$query}
          onChange={(e) => $setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Recherche
        </button>
      </form>
      <div className="card-list">
        {$movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}
