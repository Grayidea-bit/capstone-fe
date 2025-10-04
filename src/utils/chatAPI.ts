import { store } from '@/stores/store';
import axios from 'axios';

export const sendMessage = async (message: string, type: string) => {
    const state = store.getState();

    const selectedRepo = state.repo.selectedRepo;
    const selectedCommit = state.repo.selectedCommit;
    const url = `http://localhost:8000/chat/repos/${selectedRepo?.owner}/${selectedRepo?.name}?access_token=${localStorage.getItem('access_token')}&question=${encodeURIComponent(message)}&target_sha=${selectedCommit?.sha}&mode=${type}`;
    try {
        const response = await axios.post(url);
        return response.data.answer;
    } catch (error) {
        console.error("Error sending message:", error);
    }
}