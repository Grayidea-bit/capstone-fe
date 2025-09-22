import { createSlice } from "@reduxjs/toolkit";
import type { Repo, Commit } from "@/utils/type";

export interface repoStatus {
    repos?: Repo[];
    selectedRepo?: Repo;
    commits?: Commit[];
    selectedCommit?: Commit;
    overview?: string;
    fileStructure?: string;
    commitOverview?: string;
    diff?: string;
}

const initialState: repoStatus = {
    repos: [],
    selectedRepo: undefined,
    commits: [],
    selectedCommit: undefined,
    overview: undefined,
    fileStructure: undefined,
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
        setFileStructure: (state, action) => {
            state.fileStructure = action.payload;
        },
        setCommitOverview: (state, action) => {
            state.commitOverview = action.payload;
        },
        setDiff: (state, action) => {
            state.diff = action.payload;
        }

    }
})
export const { setRepos, setSelectedRepo, setCommits, setSelectedCommit, setOverview, setFileStructure, setCommitOverview, setDiff } = repoSlice.actions;
export default repoSlice.reducer;