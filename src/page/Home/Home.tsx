import { Sidebar, CodeField, Chat, Navigator, FileTree } from "./components";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProgressPage } from "@/utils/type";
import { Repo } from "./SubPage/Repo/Repo";



const Home = () => {
  const components = useSelector((state: RootState) => state.components);
  const user = useSelector((state: RootState) => state.user);
  const page = useSelector((state: RootState) => state.progress.page);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.access_token) {
      navigate('/');
    }
  }, [user.access_token]);

  const pageLogic = () => {
    switch (page) {
      case 'fileTreeAndOverview':
        return <Repo />;
      case 'diffViewAndCommitSummary':
        return <CodeField />;
      case 'aiTalk':
        return <Chat />;
      case 'techDebt':
        return <CodeField />;
      default:
        return null;
    }
  }

  return (
    <div className={`${styles.container}`}>
      <Sidebar />
      <Navigator />
      {pageLogic()}
    </div>
  );
}
export default Home;