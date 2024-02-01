import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import api from "../../api/api";
import styles from "./MoviesDetailPage.module.scss";
import getTMDBImgSrc from "../../utils/getTMDBImgPrefix";
import { useProfile } from "../../contexts/profile.context";
import { useAuth } from "../../contexts/auth.context";
import { FaHeartBroken, FaHeart } from "react-icons/fa";
function MoviesDetailPage() {
  const { signedIn } = useAuth();
  const { likedMovies, likeMovie, unlikeMovie } = useProfile();
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [like, setLike] = useState(false);

  useEffect(() => {
    api.movies.getMovie(movieId).then((movie) => setMovie(movie));
  }, [movieId]);

  useEffect(() => {
    const like = likedMovies.some((movie) => movie.id === parseInt(movieId));
    setLike(like);
  }, [likedMovies, movieId]);

  if (movie === null) return null;

  const handleClickLike = () => {
    like ? unlikeMovie(movie) : likeMovie(movie);
    setLike(!like);
  };

  return (
    <div className={styles.wrapper}>
      <section className={styles.mainInfo}>
        <img
          className={styles.posterImg}
          src={getTMDBImgSrc(movie.poster_path)}
          alt={movie.title}
        />

        <div className={styles.mainInfoRight}>
          <h1 className={styles.title}>{movie.title}</h1>
          <p className={styles.overview}>{movie.overview}</p>
          <div>
            <strong>평점: {movie.vote_average}</strong>
            {signedIn && (
              <button onClick={handleClickLike}>
                {like ? <FaHeartBroken /> : <FaHeart />}
              </button>
            )}
          </div>
          <ul className={styles.genres}>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </div>
      </section>
      <section>
        <img src={getTMDBImgSrc(movie.backdrop_path)} alt={movie.title} />
      </section>
    </div>
  );
}

export default MoviesDetailPage;
