import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import styles from "./Selector.module.scss";
import type { RootState } from "@/stores/store";
import { setCommits, setOverview, setRepos, setSelectedCommit, setSelectedRepo, setCommitOverview } from "@/stores/slice/repoSlice";
import { useNavigate } from "react-router-dom";
import { fetchCommitOverview } from "@/utils/commitAPI";

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

    useEffect (() => {
        if(progress === "repo") {
            axios.get('http://localhost:8000/repo_list/?access_token=' + localStorage.getItem('access_token'))
            .then((response) => {
                console.log(response.data);
                const savedRepos = response.data.map((repo: any) => ({
                    name: repo.name,
                    owner: repo.owner.login
                }));
                // localStorage.setItem('repos', JSON.stringify(savedRepos));
                dispatch(setRepos(savedRepos));
                setDisplayList(savedRepos.map((repo: any) => repo.name));
            }).catch((error) => {
                console.error("Error fetching repo list:", error);
            });
        } else if (progress === "commit") {
            if(selectedRepo) {
                axios.get(`http://localhost:8000/repo_commit/repos/${selectedRepo.owner}/${selectedRepo.name}/?access_token=${localStorage.getItem('access_token')}`)
                .then((response) => {
                    console.log(response.data);
                    const commits = response.data.commits.map((commit: any) => ({
                        sha: commit.sha,
                        name: commit.name
                    }));
                    dispatch(setCommits(commits));
                    setDisplayList(commits.map((commit: any) => commit.sha.substring(0, 7) + ": " + commit.name));
                }).catch((error) => {
                    console.error("Error fetching commit list:", error);
                });
            }
        }
    }, [progress]);

    const handleRepoChange =  async () => {
        const selectedRepo = repos.find(repo => repo.name === (document.querySelector('select') as HTMLSelectElement).value);
        dispatch(setSelectedRepo(selectedRepo));
        setAnimatedOut(true);
        await new Promise(resolve => setTimeout(resolve, 500));
        setProgress("commit");
        setAnimatedOut(false);
    };

    const handleCommitChange = async () => {
        dispatch(setOverview("載入中..."));
        const selectedCommit = commits.find(commit => commit.sha.substring(0, 7) + ": " + commit.name === (document.querySelector('select') as HTMLSelectElement).value);
        dispatch(setSelectedCommit(selectedCommit));

        setAnimatedOut(true);
        new Promise(resolve => {
            axios.get(`http://localhost:8000/overview/repos/${selectedRepo?.owner}/${selectedRepo?.name}/?access_token=${localStorage.getItem('access_token')}`)
            .then((response) => {
                console.log(response.data);
                dispatch(setOverview(response.data.overview));
                resolve(true);
            });
        });
        await fetchCommitOverview();
        // new Promise(resolve => {
        //     axios.post(`http://localhost:8000/diff/repos/${selectedRepo?.owner}/${selectedRepo?.name}/commits/${selectedCommit?.sha}/?access_token=${localStorage.getItem('access_token')}`)
        //     .then((response) => {
        //         console.log(response.data);
        //         dispatch(setCommitOverview(response.data.analysis));
        //         resolve(true);
        //     });
        // });
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
                    onClick={progress === 'repo' ? handleRepoChange : handleCommitChange}
                >
                    GO
                </button>
            </div>
        </div>
    );
}
export default Selector;