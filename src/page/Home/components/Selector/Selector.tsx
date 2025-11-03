import { useSelector, useDispatch } from 'react-redux';
import { fetchCommitList } from '@/utils/commitAPI';

import styles from './Selector.module.scss';
import type { RootState } from '@/stores/store';
import { setCommitOverview, setCommits, setDiff, setFileStructure, setOverview, setSelectedBranch, setSelectedCommit, setSelectedRepo } from '@/stores/slice/repoSlice';
import { useEffect } from 'react';
import { fetchBranchList, fetchRepoList } from '@/utils/repoAPI';
import { setPage } from '@/stores/slice/progressSlice';


export const Selector = () => {
    const userName = localStorage.getItem('username');
    const repoList = useSelector((state: RootState) => state.repo.repos || []);
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);
    const selectedBranch = useSelector((state: RootState) => state.repo.selectedBranch);
    const commitList = useSelector((state: RootState) => state.repo.commits || []);
    const branchList = useSelector((state: RootState) => state.repo.branches || []);
    const page = useSelector((state: RootState) => state.progress.page);

    const truncateText = (text: string, maxLength: number = 40) => {
        return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
    };
    


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
                const response = await fetchBranchList();
                if (response && response.length > 0) {
                    dispatch(setSelectedBranch(response[0]));
                }
            }
        };
        fetchCommits();
    }, [selectedRepo]);

    useEffect(() => {
        const fetchCommits = async () => {
            if (selectedBranch) {
                const response = await fetchCommitList();
                if (response && response.length > 0) {
                    dispatch(setSelectedCommit(response[0]));
                }
            }
        };
        fetchCommits();
    }, [selectedBranch]);

    const dispatch = useDispatch();


    const handleNewRepoChange = (repoName: string) => {
        dispatch(setSelectedCommit(null));
        dispatch(setCommits([]));
        dispatch(setFileStructure(undefined));
        dispatch(setOverview(undefined));
        const selectedRepo = repoList.find(repo => repo.name === repoName);
        dispatch(setSelectedRepo(selectedRepo));
    }

    const handleNewBranchChange = async (branchName: string) => {
        dispatch(setSelectedBranch(undefined));
        const selectedBranch = branchList.find(branch => branch.name === branchName);
        dispatch(setSelectedBranch(selectedBranch));
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
                <label htmlFor="branch-select">Branch 選擇</label>
                <select 
                    id="branch-select" 
                    value={selectedBranch?.name || ""}
                    onChange={(e) => {handleNewBranchChange(e.target.value);}}
                >
                    {branchList.map((value, index) => (
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
                            {truncateText(value.name)}
                        </option>
                    ))}
                </select>
            </form>
        </div>
    </div>
  );
};
