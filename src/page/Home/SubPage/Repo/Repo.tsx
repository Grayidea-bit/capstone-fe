import { useEffect } from "react";
import { useSelector } from "react-redux";
import { FileTree, Overview } from "../../components"
import styles from "./Repo.module.scss"
import { fetchRepoOverview } from "@/utils/repoAPI";
import type { RootState } from "@/stores/store";

export const Repo = () => {
    const selectedRepo = useSelector((state: RootState) => state.repo.selectedRepo);

    useEffect(() => {
        const fetchData = async () => {
            if (selectedRepo) {
                await fetchRepoOverview();
            }
        };
        fetchData();
    }, [selectedRepo]); // 監聽 selectedRepo 的變化
    
    return (
        <div className={styles.container}>
            <FileTree />
            <Overview alignment='repo' />
        </div>
    );
}