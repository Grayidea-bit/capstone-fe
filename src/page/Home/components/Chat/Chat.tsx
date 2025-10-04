import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import Circle from '@mui/icons-material/Circle';
import ReactMarkdown from "react-markdown";

import { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { addMessage } from "@/stores/slice/chatSlice";
import type { RootState } from "@/stores/store";

import styles from "./Chat.module.css";
import { sendMessage } from "@/utils/chatAPI";


export const Chat = () => {
    const [isWaitingResponse, setIsWaitingResponse] = useState(false);
    const chat = useSelector((state: RootState) => state.chat);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const selectRef = useRef<HTMLSelectElement>(null);
    const dispatch = useDispatch();

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

    const newMessage = async () => {
        if(textRef.current?.value.trim() === '') return;

        setIsWaitingResponse(true);
        const response = await sendMessage(textRef.current!.value, selectRef.current!.value);
        // await new Promise((resolve) => setTimeout(resolve, 2000));
        if (textRef.current) {
            dispatch(addMessage({
                identity: 'user',
                content: textRef.current.value,
                timestamp: new Date().toLocaleString()
            }));
            dispatch(addMessage({
                identity: 'assistant',
                content: response || "系統无回應，請稍後再試。",
                timestamp: new Date().toLocaleString()
            }));
            // console.log(chat.messages);
            textRef.current.value = ''; 
        }
        setIsWaitingResponse(false);
    }

    const renderTextField = () => {

        return (
            <div className={styles.textField}>
                <textarea ref={textRef} placeholder="想問什麼？" />
                <select ref={selectRef} defaultValue="repository">
                    <option value="repository">問repo</option>
                    <option value="commit">問commit</option>
                    <option value="what-if">問如果</option>
                </select>
                {isWaitingResponse ? (
                    <div className={styles.loadingContainer}>
                        <Circle className={`${styles.loadingIndicator} ${styles.dot1}`} />
                        <Circle className={`${styles.loadingIndicator} ${styles.dot2}`} />
                        <Circle className={`${styles.loadingIndicator} ${styles.dot3}`} />
                    </div>
                ) : (
                    <IconButton onClick={newMessage}>
                        <SendIcon />
                    </IconButton>
                )}
            </div>
        );
    }

  return (
    <div className={styles.container}>
        {createMessages()}
      {renderTextField()}   
    </div>
  );
};
