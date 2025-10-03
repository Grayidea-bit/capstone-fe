import { useSelector, useDispatch } from 'react-redux';
import { fetchCommitList, fetchCommitOverview } from '@/utils/commitAPI';

import styles from './Sidebar.module.scss';
import type { RootState } from '@/stores/store';
import { setCommitOverview, setCommits, setDiff, setFileStructure, setOverview, setSelectedCommit, setSelectedRepo } from '@/stores/slice/repoSlice';
import { useEffect } from 'react';
import { fetchRepoList } from '@/utils/repoAPI';


export const Sidebar = () => {
    const userName = localStorage.getItem('username');
    const repoList = useSelector((state: RootState) => state.repo.repos || []);
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);
    const commitList = useSelector((state: RootState) => state.repo.commits || []);


    useEffect(() => {
        const fetchData = async () => {
            const response = await fetchRepoList();
            if (response && response.length > 0) {
                dispatch(setSelectedRepo(response[0]));
            }
        };
        fetchData();
    }, [userName]);

    useEffect(() => {
        const fetchCommits = async () => {
            if (selectedRepo) {
                const response = await fetchCommitList();
                if (response && response.length > 0) {
                    dispatch(setSelectedCommit(response[0]));
                }
            }
        };
        fetchCommits();
    }, [selectedRepo]);

    const dispatch = useDispatch();


    const handleNewRepoChange = (repoName: string) => {
        dispatch(setSelectedCommit(null));
        dispatch(setCommits([]));
        dispatch(setFileStructure(undefined));
        dispatch(setOverview(undefined));
        const selectedRepo = repoList.find(repo => repo.name === repoName);
        dispatch(setSelectedRepo(selectedRepo));
    }

    const handleNewCommitChange = async (commitSha: string) => {
        dispatch(setCommitOverview(undefined));
        dispatch(setDiff(undefined));
        const selectedCommit = commitList.find(commit => commit.sha === commitSha);
        dispatch(setSelectedCommit(selectedCommit));
    }

    
  return (
    <div className={styles.container}>
        <div className={styles.topbar}>
            <div className={styles.greeting}>
                <h2>Hello, {userName}</h2>
            </div>
            {/* <button 
            className={styles.hideBtn}
            onClick={handleHideClick}
            >
                <ChevronLeftIcon fontSize='large'/>
            </button> */}
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
            {/* <div className={styles.fileTree}>
                <label htmlFor="commit-select">FileTree:</label>
                <FileTree />
            </div> */}
        </div>
    </div>
  );
};
