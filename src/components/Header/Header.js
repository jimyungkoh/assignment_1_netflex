import React from "react";
import styles from "./Header.module.scss";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/auth.context";
import { useProfile } from "../../contexts/profile.context";

function Header() {
  const { signedIn, signOut } = useAuth();
  const { nickname } = useProfile();

  return (
    <header className={styles.header}>
      <Link to={"/"} className={styles.logo}>
        NETFLEX
      </Link>

      <nav>
        <ul>
          {signedIn ? (
            <>
              <li>{nickname}님 환영합니다!</li>
              <li>
                <Link to="/my-page">마이 페이지</Link>
              </li>
              <li onClick={signOut}>
                <button>로그아웃</button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/sign-in">로그인하기</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
