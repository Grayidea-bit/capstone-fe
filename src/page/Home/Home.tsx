import { Sidebar, CodeField, Chat } from "./components";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Home.module.scss";


const Home = () => {
  const components = useSelector((state: RootState) => state.components);


  return (
    <div className={`${styles.container} 
      ${components.isSideBarExpanded ? styles.sidebarExpanded : ""}
      ${true ? styles["fade-in"] : ""}
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