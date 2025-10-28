import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FileTree, Overview } from "../../components"
import styles from "./Repo.module.scss"
import { fetchRepoOverview } from "@/utils/repoAPI";
import type { RootState } from "@/stores/store";

export const Repo = () => {
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);
    const selectedBranch = useSelector((state: RootState) => state.repo.selectedBranch);

    const [expandFileTree, setExpandFileTree] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedRepo&&selectedBranch) {
                await fetchRepoOverview();
            }
        };
        fetchData();
    }, [selectedRepo, selectedBranch]); // 監聽 selectedRepo 的變化
    
    return (
        <div className={`${styles.container} ${expandFileTree ? styles.expand : ""}`}>
            <div className={styles.fileTree}>
                <div className={styles.btn} style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
                    <h3>檔案樹</h3>
                    <button onClick={() => setExpandFileTree(!expandFileTree)}>{expandFileTree ? "收合" : "展開"}</button>
                </div>
                <FileTree />
            </div>
            <div className={styles.overview}>
                <Overview alignment='repo' />
            </div>
        </div>
    );
}