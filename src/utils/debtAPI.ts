import { setDebt } from '@/stores/slice/repoSlice';
import { store } from '@/stores/store';
import axios from 'axios';

export const checkDebt = async () => {
    const state = store.getState();

    const selectedRepo = state.repo.selectedRepo;
    const selectedBranch = state.repo.selectedBranch?.name;
    const url = `http://localhost:8000/tech_debt/repos/${selectedRepo?.owner}/${selectedRepo?.name}/${selectedBranch}/tech-debt?access_token=${localStorage.getItem('access_token')}`;
    try {
        const response = await axios.get(url);
        store.dispatch(setDebt(response.data));
        return response.data;
    } catch (error) {
        console.error("Error checking debt:", error);
    }
}

export const contribute = async() => {
    const state = store.getState();

    const selectedRepo = state.repo.selectedRepo;
    const url = `http://localhost:8000/contributions/repos/${selectedRepo?.owner}/${selectedRepo?.name}/contributions?access_token=${localStorage.getItem('access_token')}`;
    try {
        const response = await axios.get(url);
        console.log(response.data);
        // store.dispatch(setDebt(response.data));
        return response.data;
    } catch (error) {
        console.error("Error checking debt:", error);
    }    
}