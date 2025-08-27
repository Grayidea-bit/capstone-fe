import { Sidebar, CodeField, Chat } from "./components/Components";
import { useSelector } from "react-redux";
import styles from "./Home.module.css";
import type { RootState } from "@/stores/store";

const Home = () => {
  const components = useSelector((state: RootState) => state.components);

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