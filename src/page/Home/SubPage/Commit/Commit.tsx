import { useEffect } from "react";
import { useSelector } from "react-redux";
import { CodeField, Overview } from "../../components"
import styles from "./Commit.module.scss"
import type { RootState } from "@/stores/store";
import { fetchCommitOverview } from "@/utils/commitAPI";

export const Commit = () => {
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCommit) {
                await fetchCommitOverview();
            }
        };
        fetchData();
    }, [selectedCommit]);
    
    return (
        <div className={styles.container}>
            <CodeField />
            <Overview alignment='commit' />
        </div>
    );
}