import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { CodeField, Overview } from "../../components"
import styles from "./Commit.module.scss"
import type { RootState } from "@/stores/store";
import { fetchCommitOverview } from "@/utils/commitAPI";

export const Commit = () => {
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);
    const [expandFileTree, setExpandFileTree] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCommit) {
                await fetchCommitOverview();
            }
        };
        fetchData();
    }, [selectedCommit]);
    
    return (
        <div className={`${styles.container} ${expandFileTree ? styles.expand : ""}`}>
            <div className={styles.diff}>
                <div className={styles.btn} style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
                    <h3>Diff</h3>
                    <button onClick={() => setExpandFileTree(!expandFileTree)}>{expandFileTree ? "收合" : "展開"}</button>
                </div>
                <div style={{ visibility: expandFileTree ? "visible" : "hidden"}}>
                    <CodeField />
                </div>
            </div>
            <div className={styles.overview}>
                <Overview alignment='commit' />
            </div>
        </div>
    );
}