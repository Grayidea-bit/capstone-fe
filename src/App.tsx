import Login from './page/Login/Login'
import Home from './page/Home/Home'

import { useDispatch, useSelector } from 'react-redux';
import type { RootState } from './stores/store';

import styles from './App.module.css';
import { setIsLogin } from './stores/slice/progressSlice';
import Topbar from './page/Topbar/Topbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

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
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className={styles.container}>
              <Topbar isReveal={isLogin} />
              <div className={styles.mainContent}>
                <PageLogic />
              </div>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App
