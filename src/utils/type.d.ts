export interface Repo {
    name: string;
    owner: string;
}

export interface Branch {
    name: string;
}

export interface Commit {
    sha: string;
    name: string;
}

export type ProgressPage = 'fileTreeAndOverview' | 'diffViewAndCommitSummary' | 'aiTalk' | 'techDebt' | 'contribute';

interface item {
    name: string;
    value: string;
}
