import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.scss";
import MoviesList from "../../components/MoviesList";
import api from "../../api/api";

function HomePage() {
  const [movies, setMovies] = useState({ nowPlaying: [], topRated: [] });

  useEffect(() => {
    Promise.all([
      api.movies.getMovies("nowPlaying"),
      api.movies.getMovies("topRated"),
    ]).then(([nowPlaying, topRated]) => setMovies({ nowPlaying, topRated }));
  }, []);

  return (
    <div className={styles.page}>
      <main>
        <MoviesList listTitle="현재 상영작" movies={movies.nowPlaying} />
        <MoviesList listTitle="평점이 높은 영화" movies={movies.topRated} />
      </main>
    </div>
  );
}

export default HomePage;
