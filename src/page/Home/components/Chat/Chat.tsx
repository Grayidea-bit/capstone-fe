import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Chat.module.css";
import { setChatExpanded } from "@/stores/slice/componentsSlice";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { useEffect, useMemo, useState } from "react";

export const Chat = () => {
    const [shouldRenderContent, setShouldRenderContent] = useState(false);
    const chat = useSelector((state: RootState) => state.chat);
    const components = useSelector((state: RootState) => state.components);
    const dispatch = useDispatch();


    useEffect(() => {
        if (components.isChatExpanded) {
            const timer = setTimeout(() => {
                setShouldRenderContent(true);
            }, 300); // 延遲 300ms，配合動畫時間
            return () => clearTimeout(timer);
        } else {
            setShouldRenderContent(false);
        }
    }, [components.isChatExpanded]);
        
    if (!components.isChatExpanded) {
        return (
            <div className={styles.show}>
                <button 
                    className={styles.showBtn}
                    onClick={() => dispatch(setChatExpanded(true))}
                >
                    <ChevronLeftIcon  fontSize='large'/>
                </button>
            </div>
        );
    }

    const createMessages = () => {
        return chat.messages.map((msg) => (
            <div key={msg.timestamp} className={styles.message}>
                <span className={styles.identity}>{msg.identity}</span>
                <span className={styles.content}>{msg.content}</span>
                <span className={styles.timestamp}>{msg.timestamp}</span>
            </div>
        ));
    }

  return (
    <div className={styles.container}>
        <div className={styles.topbar}>
            <button className={styles.hideBtn} onClick={() => { dispatch(setChatExpanded(false)); }}>
                <ChevronRightIcon fontSize='large'/>
            </button>
            <h2>Chat</h2>
        </div>
      <div className={styles.blockField}>
                {shouldRenderContent ? createMessages() : <div>Loading...</div>}
      </div>
      <div className={styles.textField}>
        <textarea placeholder="Type your message here..." />
        <button>Send</button>
      </div>
    </div>
  );
};
