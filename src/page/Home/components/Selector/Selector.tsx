import { useSelector, useDispatch } from 'react-redux';
import { fetchCommitList } from '@/utils/commitAPI';

import styles from './Selector.module.scss';
import type { RootState } from '@/stores/store';
import { setCommitOverview, setCommits, setDiff, setFileStructure, setOverview, setSelectedCommit, setSelectedRepo } from '@/stores/slice/repoSlice';
import { useEffect } from 'react';
import { fetchRepoList } from '@/utils/repoAPI';
import { setPage } from '@/stores/slice/progressSlice';


export const Selector = () => {
    const userName = localStorage.getItem('username');
    const repoList = useSelector((state: RootState) => state.repo.repos || []);
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);
    const commitList = useSelector((state: RootState) => state.repo.commits || []);
    const page = useSelector((state: RootState) => state.progress.page);
    


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
        if (commitSha === '無' && page === 'diffViewAndCommitSummary') {
            dispatch(setPage('fileTreeAndOverview'));
        }
        dispatch(setCommitOverview(undefined));
        dispatch(setDiff(undefined));
        const selectedCommit = commitList.find(commit => commit.sha === commitSha);
        dispatch(setSelectedCommit(selectedCommit));
    }

    
  return (
    <div className={styles.container}>
        <div className={styles.content}>
            <form>
                <label htmlFor="repo-select">Repository 選擇</label>
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
                <label htmlFor="commit-select">Commit 選擇</label>
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
        </div>
    </div>
  );
};
