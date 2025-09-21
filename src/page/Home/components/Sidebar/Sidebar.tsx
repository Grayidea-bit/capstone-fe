import { useSelector, useDispatch } from 'react-redux';
import { setSideBarExpanded } from '@/stores/slice/componentsSlice';
import { fetchCommitOverview } from '@/utils/commitAPI';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import styles from './Sidebar.module.scss';
import type { RootState } from '@/stores/store';
import { setSelectedCommit } from '@/stores/slice/repoSlice';

export const Sidebar = () => {
    const userName = localStorage.getItem('username');
    const components = useSelector((state: RootState) => state.components);
    const repoList = useSelector((state: RootState) => state.repo.repos || []);
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);
    const commitList = useSelector((state: RootState) => state.repo.commits || []);
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

    const handleNewRepoChange = (repoName: string) => {
        dispatch(setSelectedCommit(null));
        const selectedRepo = repoList.find(repo => repo.name === repoName);
        
    }
    const handleNewCommitChange = async (commitSha: string) => {
        const selectedCommit = commitList.find(commit => commit.sha === commitSha);
        dispatch(setSelectedCommit(selectedCommit));
        const res = await fetchCommitOverview();
        console.log(res);
    }

    
  return (
    <div className={styles.container}>
        <div className={styles.topbar}>
            <div className={styles.greeting}>
                <h2>Hello, </h2>
                <h2>{userName}</h2>
            </div>
            <button 
            className={styles.hideBtn}
            onClick={handleHideClick}
            >
                <ChevronLeftIcon fontSize='large'/>
            </button>
        </div>
        <div className={styles.content}>
            <form>
                <label htmlFor="repo-select">Repository:</label>
                <select 
                    id="repo-select"
                    value={selectedRepo?.name || ""}
                    onChange={(e) => {handleNewRepoChange(e.target.value);}}
                >
                    {repoList.map((value, index) => (
                        <option key={index} value={value.name}>
                            {value.name}
                        </option>
                    ))}
                </select>
            </form>
            <form>
                <label htmlFor="commit-select">Commit:</label>
                <select 
                    id="commit-select" 
                    value={selectedCommit?.sha || ""}
                    onChange={(e) => {handleNewCommitChange(e.target.value);}}
                >
                    {commitList.map((value, index) => (
                        <option key={index} value={value.sha}>
                            {value.sha.substring(0, 7) + ": " + value.name}
                        </option>
                    ))}
                </select>
            </form>
            <label htmlFor="commit-select">FileTree:</label>
        </div>
    </div>
  );
};
