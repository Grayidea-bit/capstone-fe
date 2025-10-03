export interface Repo {
    name: string;
    owner: string;
}

export interface Commit {
    sha: string;
    name: string;
}

export type ProgressPage = 'fileTreeAndOverview' | 'diffViewAndCommitSummary' | 'aiTalk' | 'techDebt';