import { useDispatch } from 'react-redux';
import { setIsLogin } from '@stores/slice/progressSlice';

import styles from './Topbar.module.scss'

interface TopbarProps {
    isReveal: boolean;
}

const Topbar = ({ isReveal }: TopbarProps) => {
    if(!isReveal) return null;

    const dispatch = useDispatch();

    return (
        <div className={styles.topbar}>
          <h1>GitHub收藏庫分析器</h1>
          <button onClick={() => {
            localStorage.removeItem('isLogin');
            dispatch(setIsLogin(false));
          }}>
            登出
          </button>
        </div>
    );
}
export default Topbar