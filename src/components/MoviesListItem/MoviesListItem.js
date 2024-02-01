import React, { useEffect, useState } from "react";
import styles from "./MoviesListItem.module.scss";
import { Link } from "react-router-dom";
import getTMDBImgSrc from "../../utils/getTMDBImgPrefix";
import { useAuth } from "../../contexts/auth.context";
import { useProfile } from "../../contexts/profile.context";
import { FaHeart, FaHeartBroken } from "react-icons/fa";

function MoviesListItem({ movie }) {
  const { signedIn } = useAuth();
  const { likedMovies, likeMovie, unlikeMovie } = useProfile();

  const [like, setLike] = useState(false);

  useEffect(() => {
    if (!signedIn) return;
    setLike(likedMovies.map((movie) => movie.id).includes(movie.id));
  }, [likedMovies, movie.id, signedIn]);

  const handleClickLike = () => {
    like ? unlikeMovie(movie) : likeMovie(movie);
    setLike(!like);
  };

  return (
    <div className={styles.wrapper}>
      <Link to={`/movies/${movie.id}`}>
        <img
          className={styles.img}
          src={getTMDBImgSrc("") + movie.backdrop_path}
          alt={movie.title}
        />
      </Link>
      <div className={styles.captionBox}>
        <h6>{movie.title}</h6>
        {signedIn && (
          <button onClick={handleClickLike}>
            {like ? <FaHeartBroken /> : <FaHeart />}
          </button>
        )}
      </div>
    </div>
  );
}

export default MoviesListItem;
