import { memo } from 'react';
import { useDispatch } from 'react-redux';
import styles from './Header.module.scss';
import { setChatOpen } from '@/stores/slice/componentsSlice';
const Header = () => {
    const userName = localStorage.getItem('username');
    const dispatch = useDispatch();

    return (
        <div className={styles.topbar}>
            <div className={styles.greeting}>
                <h2>Hello, {userName}</h2>
            </div>
            <div className={styles.chatBtn} onClick={() => dispatch(setChatOpen(null))}>
                <h4>AI</h4>
            </div>
            {/* <button 
            className={styles.hideBtn}
            onClick={handleHideClick}
            >
                <ChevronLeftIcon fontSize='large'/>
            </button> */}
        </div>
    );
};
export default memo(Header);