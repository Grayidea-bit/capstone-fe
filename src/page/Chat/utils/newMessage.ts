import { sendMessage } from "@/utils/chatAPI";
import { store } from "@/stores/store";
import { addMessage } from "@/stores/slice/chatSlice";

interface SendMessageProps {
    textRef: React.RefObject<HTMLTextAreaElement | null>;
    selectRef: React.RefObject<HTMLSelectElement | null>;
}


export const newMessage = async (props: SendMessageProps) => {
    const { textRef, selectRef } = props;
    
    if(textRef.current?.value.trim() === '') return;
    const response = await sendMessage(textRef.current!.value, selectRef.current!.value);
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    if (textRef.current) {
        store.dispatch(addMessage({
            identity: 'user',
            content: textRef.current.value,
            timestamp: new Date().toLocaleString()
        }));
        store.dispatch(addMessage({
            identity: 'assistant',
            content: response || "系統无回應，請稍後再試。",
            timestamp: new Date().toLocaleString()
        }));
        // console.log(chat.messages);
        textRef.current.value = ''; 
    }
}