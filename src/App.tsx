import Login from './page/Login/Login'
import Home from './page/Home/Home'

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './stores/store';

import styles from './App.module.css';
import { setIsLogin } from './stores/slice/progressSlice';

function App() {
  
  const dispatch = useDispatch();
  const isLogin = localStorage.getItem('isLogin') === 'true';
  dispatch(setIsLogin(isLogin));

  const progress = useSelector((state: RootState) => state.progress);
  const PageLogic = () => {
    if(progress.isLogin) {
      dispatch(setIsLogin(true));
      return <Home />
    }
    return <Login />
  }

  return (
    <div className={styles.container}>
      {isLogin ?
        <div className={styles.topbar}>
          <h1>GitHub收藏庫分析器</h1>
          <button onClick={() => {
            localStorage.removeItem('isLogin');
            dispatch(setIsLogin(false));
          }}>
            登出
          </button>
        </div>
      :<></>}
      <div className={styles.mainContent}>
        {PageLogic()}
      </div>
    </div>
  )
}

export default App
