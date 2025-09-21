import { createSlice } from "@reduxjs/toolkit";

interface Repo {
    name: string;
    owner: string;
}

interface commit {
    sha: string;
    name: string;
}
export interface repoStatus {
    repos?: Repo[];
    selectedRepo?: Repo;
    commits?: commit[];
    selectedCommit?: commit;
    overview?: string;
    commitOverview?: string;
    diff?: string;
}

const initialState: repoStatus = {
    repos: [],
    selectedRepo: undefined,
    commits: [],
    selectedCommit: undefined,
    overview: undefined,
    commitOverview: undefined,
    diff: undefined,
};

const repoSlice = createSlice({
    name: 'repo',
    initialState,
    reducers: {
        setRepos : (state, action) => {
            state.repos = action.payload;
        },
        setSelectedRepo: (state, action) => {
            state.selectedRepo = action.payload;
        },
        setCommits: (state, action) => {
            state.commits = action.payload;
        },
        setSelectedCommit: (state, action) => {
            state.selectedCommit = action.payload;
        },
        setOverview: (state, action) => {
            state.overview = action.payload;
        },
        setCommitOverview: (state, action) => {
            state.commitOverview = action.payload;
        },
        setDiff: (state, action) => {
            state.diff = action.payload;
        }

    }
})
export const { setRepos, setSelectedRepo, setCommits, setSelectedCommit, setOverview, setCommitOverview, setDiff } = repoSlice.actions;
export default repoSlice.reducer;