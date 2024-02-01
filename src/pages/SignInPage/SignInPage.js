import React, { useState } from "react";
import styles from "./SignInPage.module.scss";
import { useAuth } from "../../contexts/auth.context";
import { useNavigate } from "react-router-dom";

function SignInPage() {
  const navigate = useNavigate(); // useNavigate 호출
  const { signIn } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleClickSignIn = () => {
    if (!username || !password)
      return alert("아이디 또는 비밀번호를 입력해 주세요!");

    if (username === "udemy" && password === "udemy") {
      signIn();
      return navigate("/");
    } else {
      return alert("아이디 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <input
          className={styles.input}
          type="text"
          value={username}
          placeholder="아이디를 입력해주세요."
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <input
          className={styles.input}
          type="password"
          value={password}
          placeholder="패스워드를 입력해주세요."
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className={styles.button} onClick={handleClickSignIn}>
          로그인하기
        </button>
      </form>
    </div>
  );
}

export default SignInPage;
