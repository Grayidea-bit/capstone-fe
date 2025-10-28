import { store } from '@/stores/store';
import { setBranches, setFileStructure, setOverview, setRepos } from '@/stores/slice/repoSlice';
import axios from 'axios';


export const fetchRepoList = async () => {
    try {
        const response = await axios.get('http://localhost:8000/repo_list/?access_token=' + localStorage.getItem('access_token'));
        // console.log(response.data);
        const savedRepos = response.data.map((repo: any) => ({
            name: repo.name,
            owner: repo.owner.login
        }));
        store.dispatch(setRepos(savedRepos));
        
        return savedRepos;
    } catch (error) {
        console.error("Error fetching repo list:", error);
    }
}

export const fetchRepoOverview = async () => {
    const state = store.getState();
    const selectedRepo = state.repo.selectedRepo;
    const selectedBranch = state.repo.selectedBranch;
    try {
        const response = await axios.get(`http://localhost:8000/overview/repos/${selectedRepo?.owner}/${selectedRepo?.name}/${selectedBranch?.name}/?access_token=${localStorage.getItem('access_token')}`);
        // console.log(response.data);
        store.dispatch(setOverview(response.data.overview));
        store.dispatch(setFileStructure(response.data.file_structure));
        await new Promise(resolve => setTimeout(resolve, 0));
    } catch (error) {
        console.error("Error fetching repo overview:", error);
    }
};


export const fetchBranchList = async () => {
    const selectedRepo = store.getState().repo.selectedRepo;
    try {
        const response = await axios.get(`http://localhost:8000/branches/${selectedRepo?.owner}/${selectedRepo?.name}/?access_token=` + localStorage.getItem('access_token'));
        // console.log(response.data);
        const savedBranches = response.data.branches.map((branch: any) => ({
            name: branch,
        }));
        store.dispatch(setBranches(savedBranches));
        console.log(savedBranches);
        return savedBranches;
    } catch (error) {
        console.error("Error fetching repo list:", error);
    }
}