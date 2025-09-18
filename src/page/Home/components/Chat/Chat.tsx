import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Chat.module.css";
import { useState } from "react";
import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import ReactMarkdown from "react-markdown";


export const Chat = () => {
    // const [shouldRenderContent, setShouldRenderContent] = useState(false);
    const [alignment, setAlignment] = useState<"chat" | "summary">("summary");
    const chat = useSelector((state: RootState) => state.chat);
    const overview = useSelector((state: RootState) => state.repo.overview || "載入中...");

    const createMessages = () => {
        return (
            <div className={styles.blockField}>
                {chat.messages.map((msg) => (
                    <div key={msg.timestamp} className={`${styles.message} ${styles[`${msg.identity}`]}`}>
                        <span className={styles.identity}>{msg.identity}</span>
                        <span className={styles.content}>
                            <ReactMarkdown >{msg.content}</ReactMarkdown>
                        </span>
                        <span className={styles.timestamp}>{msg.timestamp}</span>
                    </div>
            ))}
            </div>
        );
    }

    const renderMainBlock = () => {
        if (alignment === "chat") {
            return createMessages();
        }

        return (
            <div className={styles.summary}>
                <h3>專案概述</h3>
                <div className={styles.textarea}>
                    <ReactMarkdown >{overview}</ReactMarkdown>
                </div>
                <h3>commit概述</h3>
                <div className={styles.textarea}>
                    <ReactMarkdown >{overview}</ReactMarkdown>
                </div>
            </div>
        );
    }

    const renderTextField = () => {
        if(alignment === 'summary') {
            return null;
        }

        return (
            <div className={styles.textField}>
                <textarea placeholder="Type your message here..." />
                <IconButton>
                    <SendIcon />
                </IconButton>
            </div>
        );
    }



    const handleChange = (event: React.MouseEvent<HTMLElement>, newAlignment: string) => {
        setAlignment(newAlignment as "chat" | "summary");
    }

  return (
    <div className={styles.container}>
        <div className={styles.topbar}>
            <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                size="large"
            >
                <ToggleButton value="summary">總結</ToggleButton>
                <ToggleButton value="chat">對話</ToggleButton>
            </ToggleButtonGroup>        
        </div>
      <div className={styles.blockField}>
        {renderMainBlock()}
      </div>
      {renderTextField()}   
    </div>
  );
};
