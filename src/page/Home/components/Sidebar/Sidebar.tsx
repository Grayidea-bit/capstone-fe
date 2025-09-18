import { useSelector, useDispatch } from 'react-redux';
import { setSideBarExpanded } from '@/stores/slice/componentsSlice';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './Sidebar.module.css';
import type { RootState } from '@/stores/store';

export const Sidebar = () => {
    const components = useSelector((state: RootState) => state.components);
    const dispatch = useDispatch();
    const handleHideClick = () => {
        dispatch(setSideBarExpanded(false));
    }

    if(components.isSideBarExpanded === false) {
        return (
            <div className={styles.show}>
                <button 
                    className={styles.showBtn}
                    onClick={() => dispatch(setSideBarExpanded(true))}
                >
                    <ChevronRightIcon  fontSize='large'/>
                </button>
            </div>
        );
    }

    
  return (
    <div className={styles.container}>
        <div className={styles.topbar}>
            <h2>Sidebar</h2>
            <button 
            className={styles.hideBtn}
            onClick={handleHideClick}
            >
                <ChevronLeftIcon fontSize='large'/>
            </button>
        </div>
        <div className={styles.content}>
            <p>repo selector</p>
            <p>commit selector</p>
            <p>file tree</p>
        </div>
    </div>
  );
};
