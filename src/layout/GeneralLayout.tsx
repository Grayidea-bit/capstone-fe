import { Outlet } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setIsLogin } from '@stores/slice/progressSlice';
import styles from "./GeneralLayout.module.scss";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const GeneralLayout = () => {
  const dispatch = useDispatch();
  const isLogin = useMemo(() => localStorage.getItem('isLogin') === 'true', []);
  const isChatOpen = useSelector((state: any) => state.components.isChatOpen);
  dispatch(setIsLogin(isLogin));

  return (
    <div className={` ${styles.container} ${!isLogin ? styles.bg : ''}`}>
        <Outlet />  
    </div>
  );
};
export default GeneralLayout;
