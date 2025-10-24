import { store } from '@/stores/store';
import { setCommitOverview, setCommits, setDiff } from '@/stores/slice/repoSlice';
import axios from 'axios';


export const fetchCommitList = async () => { 
    const state = store.getState();
    const selectedRepo = state.repo.selectedRepo;
    const repo = selectedRepo?.name;
    const owner = selectedRepo?.owner;

    const response = await axios.get(`http://localhost:8000/repo_commit/repos/${owner}/${repo}/?access_token=${localStorage.getItem('access_token')}`)
    const commits = response.data.commits.map((commit: any) => ({
        sha: commit.sha,
        name: commit.name
    }));

    const emptyOption = [{sha: '無', name: '請選擇 commit'}];
    const newList = [...emptyOption, ...commits];
    store.dispatch(setCommits(newList));
    return newList;
}


export const fetchCommitOverview = async () => {
    const state = store.getState();
    const selectedRepo = state.repo.selectedRepo;
    const repo = selectedRepo?.name;
    const owner = selectedRepo?.owner;
    const selectedCommit = state.repo.selectedCommit;
    const sha = selectedCommit?.sha;


    store.dispatch(setCommitOverview(undefined)); // 清除前次 overview
    store.dispatch(setDiff(undefined)); // 清除前次 diff

    try {
        const response = await axios.post(
            `http://localhost:8000/diff/repos/${owner}/${repo}/commits/${sha}?access_token=${localStorage.getItem('access_token')}`
        );

        if (response.status !== 200) {
            throw new Error('Failed to fetch commit overview');
        }

        const data = response.data.analysis || "No overview available.";
        store.dispatch(setDiff(response.data.diff || "No diff available."));
        store.dispatch(setCommitOverview(data));
        return response.data;
    } catch (error) {
        console.error('Error fetching commit overview:', error);
        throw error;
    }
};
