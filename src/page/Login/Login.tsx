import { GitHubLogin } from "./components/GithubLogin/GithubLogin";

import styles from "./Login.module.css"; // 假設您有一個 CSS 模組來處理樣式

const Login = () => {
  return (
    <div className={styles.loginLayout}>
      <div className={styles.container}>
        <GitHubLogin />
      </div>
    </div>
  );
};
export default Login;
