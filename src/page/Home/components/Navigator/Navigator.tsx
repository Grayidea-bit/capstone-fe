import { useDispatch } from 'react-redux';
import styles from './Navigator.module.scss';
import { useSelector } from 'react-redux';
import { setPage } from '@/stores/slice/progressSlice';

export const Navigator = () => {
    const page = useSelector((state: any) => state.progress.page);
    const dispatch = useDispatch();

  return (
    <div className={styles.container}>
      <div className={`${styles.item} ${page === 'fileTreeAndOverview' ? styles.selected : ''}`} onClick={() => dispatch(setPage('fileTreeAndOverview'))}>檔案樹與總覽</div>
      <div className={`${styles.item} ${page === 'diffViewAndCommitSummary' ? styles.selected : ''}`} onClick={() => dispatch(setPage('diffViewAndCommitSummary'))}>Commit Diff</div>
      <div className={`${styles.item} ${page === 'aiTalk' ? styles.selected : ''}`} onClick={() => dispatch(setPage('aiTalk'))}>AI對話</div>
      <div className={`${styles.item} ${page === 'techDebt' ? styles.selected : ''}`} onClick={() => dispatch(setPage('techDebt'))}>技術債</div>
    </div>
  );
}