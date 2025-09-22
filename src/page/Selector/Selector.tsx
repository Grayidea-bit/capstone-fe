import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/store";
import { setOverview, setSelectedCommit, setSelectedRepo } from "@/stores/slice/repoSlice";
import { useNavigate } from "react-router-dom";
import { fetchCommitList, fetchCommitOverview } from "@/utils/commitAPI";
import { fetchRepoList, fetchRepoOverview } from "@/utils/repoAPI";
import type { Repo, Commit } from "@/utils/type";

import styles from "./Selector.module.scss";

const Selector = () => {
    const [progress, setProgress] = useState<"repo" | "commit">("repo");
    const [animatedOut, setAnimatedOut] = useState(false);
    const [displayList, setDisplayList] = useState<string[]>([]);
    const userName = localStorage.getItem('username');
    const repos = useSelector((state: RootState) => state.repo.repos || []);
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);
    const commits = useSelector((state: RootState) => state.repo.commits || []);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (progress === "repo") {
                const response = await fetchRepoList();
                setDisplayList((response as Repo[]).map((repo) => repo.name));
            } else if (progress === "commit") {
                if (selectedRepo) {
                    const response = await fetchCommitList();
                    console.log(response);
                    setDisplayList((response! as Commit[]).map((commit) => commit.sha.substring(0, 7) + ": " + commit.name));
                }
            }
        };
        fetchData();
    }, [progress]);

    const handleRepoChange =  async (value: string) => {
        setDisplayList([]);
        const selected = repos.find(repo => repo.name === value);
        dispatch(setSelectedRepo(selected));
        setAnimatedOut(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress("commit");
        setAnimatedOut(false);
    };

    const handleCommitChange = async (value: string) => {
        dispatch(setOverview("載入中..."));
        const selectedCommit = commits.find(commit => commit.sha.substring(0, 7) + ": " + commit.name === value);
        dispatch(setSelectedCommit(selectedCommit));

        setAnimatedOut(true);
        Promise.all([
            new Promise(resolve => {fetchRepoOverview().then(() => resolve(true));}),
            new Promise(resolve => {fetchCommitOverview().then(() => resolve(true));})
        ]);
        setTimeout(() => {
            navigate("/home", { replace: true });
        }, 500);
    };


    return (
        <div className={styles.selector}>
            <div className={`${styles.container} ${animatedOut ? styles["fade-out"] : ""}`}>
                <div className={styles.title}>
                    <h1>Welcome {userName}</h1>
                </div>
                <form>
                    {progress === 'repo' ? <label>Select a repository:</label> : <label>Select a commit:</label>}
                    <select>
                        {displayList.map((value, index) => (
                            <option key={index} value={value}>
                                {value}
                            </option>
                        ))}
                    </select>
                </form>
                <button
                    onClick={progress === 'repo' ? () => handleRepoChange((document.querySelector('select') as HTMLSelectElement).value) : () => handleCommitChange((document.querySelector('select') as HTMLSelectElement).value)}
                >
                    GO
                </button>
            </div>
        </div>
    );
}
export default Selector;