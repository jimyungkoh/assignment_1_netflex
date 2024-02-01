import { createContext, useContext, useEffect, useState } from "react";
import getRandomName from "../utils/getRandomName";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [nickname, setNickname] = useState("");
  const [likedMovies, setLikedMovies] = useState([]);

  const fetchNickname = async (newNickname = "") => {
    const fetchedNickname = newNickname ? newNickname : await getRandomName();
    setNickname(fetchedNickname);
  };

  useEffect(() => {
    // 비동기 로직을 별도의 함수로 분리하여 처리
    fetchNickname();
  }, []);

  const likeMovie = (targetMovie) => {
    setLikedMovies(() => [...likedMovies, targetMovie]);
  };

  const unlikeMovie = (targetMovie) => {
    setLikedMovies(() =>
      likedMovies.filter((movie) => movie.id !== targetMovie.id)
    );
  };

  const value = {
    nickname,
    likedMovies,
    fetchNickname,
    likeMovie,
    unlikeMovie,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
