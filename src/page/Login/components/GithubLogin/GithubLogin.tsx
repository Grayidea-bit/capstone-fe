import styles from "./GithubLogin.module.css"; // 假設您有一個 CSS 模組來處理樣式
import { useDispatch } from "react-redux";
import { setIsLogin } from "../../../../stores/slice/progressSlice";

const CLIENT_ID = "Ov23li56CKrX18dJODju"; // from GitHub Developer Settings
const REDIRECT_URI = "http://localhost:8000/github/callback/"; // your Django endpoint

export const GitHubLogin = () => {
  const dispatch = useDispatch();
  
  // 建立 GitHub OAuth URL
  const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=read:user%20user:email%20repo`;

  const handleLogin = () => {
    localStorage.setItem('isLogin', 'true'); // 設置登入狀態
    dispatch(setIsLogin(true));
    // setIsLoading(true);
    // Redirect user to GitHub login
    // window.location.href = githubAuthURL;
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