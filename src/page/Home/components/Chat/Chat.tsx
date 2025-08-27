import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/stores/store";
import styles from "./Chat.module.css";
import { useState } from "react";
import { IconButton, ToggleButton, ToggleButtonGroup } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export const Chat = () => {
    // const [shouldRenderContent, setShouldRenderContent] = useState(false);
    const [alignment, setAlignment] = useState("chat");
    const chat = useSelector((state: RootState) => state.chat);

    const createMessages = () => {
        return (
            <div className={styles.blockField}>
                {chat.messages.map((msg) => (
                    <div key={msg.timestamp} className={`${styles.message} ${styles[`${msg.identity}`]}`}>
                        <span className={styles.identity}>{msg.identity}</span>
                        <span className={styles.content}>{msg.content}</span>
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
                <p>這是簡易的摘要範例</p>
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
        setAlignment(newAlignment);
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
