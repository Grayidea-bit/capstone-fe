import { Sidebar, Chat, Navigator } from "./components";
import { Repo, Commit, TechDebt } from "./SubPage";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";




const Home = () => {
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
        return <Commit />;
      case 'aiTalk':
        return <Chat />;
      case 'techDebt':
        return <TechDebt />;
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