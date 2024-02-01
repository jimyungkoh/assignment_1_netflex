import React, { useState, useEffect } from "react";
import styles from "./MyPage.module.scss";
import { useProfile } from "../../contexts/profile.context";
import avatarImage from "../../assets/avatar.png";
import { GrEdit } from "react-icons/gr";
import MoviesList from "../../components/MoviesList";
import { useAuth } from "../../contexts/auth.context";
import { useNavigate } from "react-router";

function MyPage() {
  const navigate = useNavigate();
  const { signedIn } = useAuth();
  const { nickname, fetchNickname, likedMovies } = useProfile();
  const [activeEdit, setActiveEdit] = useState(false);
  const [newNickname, setNewNickname] = useState("");

  if (!signedIn) navigate("/");

  // 닉네임 상태를 프로필 컨텍스트의 닉네임과 동기화
  useEffect(() => {
    setNewNickname(nickname);
  }, [nickname]);

  const toggleEdit = () => {
    setActiveEdit((prev) => !prev);

    // 편집 모드를 종료하고 닉네임이 변경된 경우에만 fetchNickname 호출
    if (activeEdit && newNickname !== nickname) fetchNickname(newNickname);
  };

  const handleNicknameChange = (e) => {
    setNewNickname(e.target.value);
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.profileWrapper}>
        <img src={avatarImage} alt="profile_avatar" />
        <div className={styles.profileCaption}>
          {activeEdit ? (
            <>
              <input
                type="text"
                value={newNickname}
                onChange={handleNicknameChange}
              />
              <button onClick={toggleEdit}>완료하기</button>
            </>
          ) : (
            <>
              <div>{nickname}</div>
              <button onClick={toggleEdit}>
                <GrEdit />
              </button>
            </>
          )}
        </div>
      </section>
      <section className={styles.likedMoviesWrapper}>
        <MoviesList listTitle="내가 찜한 리스트" movies={likedMovies} />
      </section>
    </main>
  );
}

export default MyPage;
