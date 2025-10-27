import { useState, useRef, useEffect } from 'react';
import styles from './Chat.module.scss';
import { useSelector } from 'react-redux';
import { IconButton } from "@mui/material";
import Circle from '@mui/icons-material/Circle';
import SendIcon from '@mui/icons-material/Send';
import { newMessage } from './utils/newMessage';
import ReactMarkdown from 'react-markdown';
import type { RootState } from '@/stores/store';

interface ChatProps {
  isOpen: boolean;
}
const Chat = (props: ChatProps) => {
    if (!props.isOpen) {
        return null;
    }
    
    const [isWaitingResponse, setIsWaitingResponse] = useState(false);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const selectedCommit = useSelector((state: RootState) => state.repo.selectedCommit);
    const chat = useSelector((state: RootState) => state.chat);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [isWaitingResponse]);
        


    const createMessages = () => {
        return (
            <div className={styles.blockField}>
                {chat.messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${styles[`${msg.identity}`]}`}>
                        <span className={styles.identity}>{msg.identity}</span>
                        <span className={styles.content}>
                            <ReactMarkdown >{msg.content}</ReactMarkdown>
                        </span>
                        <span className={styles.timestamp}>{msg.timestamp}</span>
                    </div>
            ))}
                <div ref={messagesEndRef} />    
            </div>
        );
    }

    
    const handleSendMessage = async () => {
        setIsWaitingResponse(true);

        if(textRef.current==null || selectRef.current==null) return;

        await new Promise((resolve) => 
            newMessage({ textRef, selectRef }).then(() => setIsWaitingResponse(false)).then(resolve)
        );
    }
    
    return (
        <div className={styles.container}>
            <div className={styles.chatArea}>
                {createMessages()}
            </div>
            <div className={styles.textArea}>
                <textarea ref={textRef} className={styles.textbox} placeholder="Type a message..." />
                <select ref={selectRef} defaultValue="repository">
                    <option value="repository">問repo</option>
                    {selectedCommit?.sha!=='無' && <option value="commit">問commit</option>}
                </select>
                {isWaitingResponse ? (
                    <div className={styles.loadingContainer}>
                        <Circle className={`${styles.loadingIndicator} ${styles.dot1}`} />
                        <Circle className={`${styles.loadingIndicator} ${styles.dot2}`} />
                        <Circle className={`${styles.loadingIndicator} ${styles.dot3}`} />
                    </div>
                ) : (
                    <IconButton onClick={handleSendMessage}>
                        <SendIcon />
                    </IconButton>
                )}
            </div>
        </div>
    );
};

export default Chat;