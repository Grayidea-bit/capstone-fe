import { Sidebar, Chat, Navigator } from "./components";
import { Repo, Commit, TechDebt } from "./SubPage";
import { useSelector } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Home.module.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";




const Home = () => {
  const user = useSelector((state: RootState) => state.user);
  const page = useSelector((state: RootState) => state.progress.page);
  const navigate = useNavigate();

  const [isNavigating, setIsNavigating] = useState(false);

  useEffect(() => {
    if (!user.access_token) {
      
      navigate('/');
    }
  }, [user.access_token]);

  useEffect(() => {
    setIsNavigating(true);
    setTimeout(() => {
      setIsNavigating(false);
    }, 1000); // 假設導航動畫持續1000毫秒
  }, [page]);

  const pageLogic = () => {

    // if (isNavigating) new Promise(resolve => setTimeout(resolve, 500));

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
      <div className={`${styles.mask} ${isNavigating ? styles.animating : ''}`} />
      <div className={`${styles.content} ${isNavigating ? styles.animating : ''}`}>
        {pageLogic()}
      </div>
    </div>
  );
}
export default Home;