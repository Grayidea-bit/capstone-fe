import { FileTree, Overview } from "../../components"
import styles from "./Repo.module.scss"

export const Repo = () => {
    return (
        <div className={styles.container}>
            <FileTree />
            <Overview alignment='repo' />
        </div>
    );
}