import { Sidebar, CodeField, Chat } from "./components/Components";
import { useSelector } from "react-redux";
import styles from "./Home.module.css";
import type { RootState } from "@/stores/store";
import { useEffect } from "react";
import axios from "axios";

const Home = () => {
  const components = useSelector((state: RootState) => state.components);

  useEffect (() => {
    axios.get('http://localhost:8000/repo_list/?access_token=' + localStorage.getItem('access_token'))
    .then((response) => {
      console.log(response.data);
    }).catch((error) => {
      console.error("Error fetching repo list:", error);
    });
  }, []);



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