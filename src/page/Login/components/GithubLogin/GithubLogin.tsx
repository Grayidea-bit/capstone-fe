import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { setIsLogin, setProgress } from "../../../../stores/slice/progressSlice";
import axios from "axios";
const CLIENT_ID = "Ov23li56CKrX18dJODju";
const REDIRECT_URI = "http://localhost:5175";
import styles from "./GithubLogin.module.css"; // 假設您有一個 CSS 模組來處理樣式
import { useEffect, useRef } from 'react';
import { setAccessToken, setAvatarURL, setName } from '@/stores/slice/userSlice';


export const GitHubLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const processingCodeRef = useRef<string | null>(null);  

  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=read:user%20user:email%20repo`;

   useEffect(() => {
    const fetchData = async () => {
      const query = new URLSearchParams(location.search);
      const code = query.get('code');
      // console.log("Authorization code:", code);
      if(code) {
          if(processingCodeRef.current !== code) processingCodeRef.current = code;
          await axios.get(`http://localhost:8000/login/?code=${code}`, {
              headers: { Accept: 'application/json' },
            })
            .then((response) => {
              if (response.data) {
                // console.log(response.data);
                dispatch(setIsLogin(true));
                dispatch(setProgress('select'));
                dispatch(setAvatarURL(response.data.user.avatar_url));
                dispatch(setAccessToken(response.data.access_token));
                dispatch(setName(response.data.user.login));

                localStorage.setItem('isLogin', 'true'); // 設置登入狀態
                localStorage.setItem('access_token', response.data.access_token); 
                localStorage.setItem('username', response.data.user.login);
                localStorage.setItem('avatar_url', response.data.user.avatar_url);
                navigate("/home", { replace: true });
              }
            }).catch((error) => {
              console.error("Error during login:", error);
            });
      }
    };
    fetchData();
  }, [location.search, navigate]);

  const handleLogin = async () => {
    processingCodeRef.current = null;
    window.location.href = githubAuthURL;
  };

  return (
    <div className={styles.container}>
        <div className={styles.title}> 
            <h1>歡迎使用</h1>
            <h1>GitHub收藏庫分析器</h1>
        </div>
        <div className={styles.loginBox}>
        <button
            onClick={handleLogin}
        >
            GITHUB登入
        </button>
        <span>使用 GitHub 帳號登入以開始使用</span>
        </div>
    </div>
  );
};