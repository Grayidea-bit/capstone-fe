import { BrowserRouter } from 'react-router-dom';

import { AppRouter } from './routes/router';
import { useSelector } from 'react-redux';

import styles from './App.module.scss';
import Chat from './page/Chat/Chat';

function App() {
  const isChatOpen = useSelector((state: any) => state.components.isChatOpen);
  

  return (
    <BrowserRouter>
    <div className={`${styles.main} ${isChatOpen ? styles.open : ''}`}>
      <div className={styles.app}>
        <AppRouter />
      </div>
      <div className={`${styles.chat} ${isChatOpen ? styles.open : ''}`}>
        <Chat isOpen={isChatOpen} />
      </div>
    </div>
    </BrowserRouter>
  )
}

export default App
