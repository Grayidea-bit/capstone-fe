import { createSlice } from "@reduxjs/toolkit";
import type { Repo, Branch, Commit } from "@/utils/type";


export interface Debt {
    analysis: string;
    activity_analysis: {
        analysis_text: string;
        top_files: Array<[string, number]>;
        top_modules: Array<[string, number]>;
    }
}

export interface repoStatus {
    repos?: Repo[];
    selectedRepo?: Repo;
    overview?: string;
    fileStructure?: string;
    umlCode?: string;
    debt?: Debt;

    branches?: Branch[];
    selectedBranch?: Branch;

    commits?: Commit[];
    selectedCommit?: Commit;
    commitOverview?: string;
    diff?: string;
}

const initialState: repoStatus = {
    repos: [],
    selectedRepo: undefined,
    overview: undefined,
    fileStructure: undefined,
    umlCode: undefined,
    debt: undefined,
    branches: [],
    selectedBranch: undefined,
    commits: [],
    selectedCommit: undefined,
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
        setBranches: (state, action) => {
            state.branches = action.payload;
        },
        setSelectedBranch: (state, action) => {
            state.selectedBranch = action.payload;
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
        },
        setDebt: (state, action) => {
            state.debt = action.payload;
        },
        setUmlCode: (state, action) => {
            state.umlCode = action.payload;
        },

    }
})
export const { setRepos, setSelectedRepo, setCommits, setSelectedCommit, setBranches, setSelectedBranch, setOverview, setFileStructure, setCommitOverview, setDiff, setDebt, setUmlCode } = repoSlice.actions;
export default repoSlice.reducer;