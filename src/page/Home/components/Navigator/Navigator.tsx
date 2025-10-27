import { useDispatch } from 'react-redux';
import styles from './Navigator.module.scss';
import { useSelector } from 'react-redux';
import { setPage } from '@/stores/slice/progressSlice';
import type { RootState } from '@/stores/store';

export const Navigator = () => {
    const page = useSelector((state: RootState) => state.progress.page);
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);
    const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <label>Repository 功能</label>
      <div className={styles.row}>
        <div className={`${styles.item} ${page === 'fileTreeAndOverview' ? styles.selected : ''}`} onClick={() => dispatch(setPage('fileTreeAndOverview'))}>檔案樹與總覽</div>
        <div className={`${styles.item} ${page === 'techDebt' ? styles.selected : ''}`} onClick={() => dispatch(setPage('techDebt'))}>技術債</div>
      </div>
      <label>Commit 功能</label>
      <div className={styles.row}>
        <div 
          className={`
            ${styles.item} 
            ${page === 'diffViewAndCommitSummary' ? styles.selected : ''} 
            ${selectedCommit?.sha === "無" ? styles.hidden : ''}
          `} 
          onClick={() => { 
            if (selectedCommit?.sha !== "無") 
            dispatch(setPage('diffViewAndCommitSummary')) 
          }}
          >
            Commit Diff
        </div>
      </div>
      {/* <div className={`${styles.item} ${page === 'aiTalk' ? styles.selected : ''}`} onClick={() => dispatch(setPage('aiTalk'))}>AI對話</div> */}
    </div>
  );
};