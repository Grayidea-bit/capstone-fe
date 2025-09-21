import { Sidebar, CodeField, Chat } from "./components";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const Home = () => {
  const components = useSelector((state: RootState) => state.components);
  const repo = useSelector((state: RootState) => state.repo);
  const navigate = useNavigate();

  useEffect(() => {
    if (!repo.selectedRepo || !repo.selectedCommit) {
      navigate('/selector');
    }
  }, [repo.selectedRepo, repo.selectedCommit]);

  return (
    <div className={`${styles.container} 
      ${components.isSideBarExpanded ? styles.sidebarExpanded : ""}
      `}>
      <div className={styles.sidebar}>
        <Sidebar />
      </div>
      <div className={styles.mainContent}>
        <CodeField />
      </div>
      <div className={styles.chat}>
        <Chat />
      </div>
    </div>
  );
}
export default Home;