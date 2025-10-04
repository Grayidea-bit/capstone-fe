import { createSlice } from "@reduxjs/toolkit";

type message = {
    identity: 'user' | 'assistant';
    content: string;
    timestamp: string;
}
export interface chatStatus {
    messages: message[];
    isLoading: boolean;
}

const mockMessages: message[] = [
    {
        identity: 'user',
        content: '你好，我想問一下這個 React 專案的架構',
        timestamp: '2025-08-14T10:30:00Z'
    },
    {
        identity: 'assistant',
        content: '您好！這個專案使用 React + TypeScript + Vite 架構，採用 Redux Toolkit 進行狀態管理，並使用 CSS Modules 處理樣式。有什麼具體想了解的嗎？',
        timestamp: '2025-08-14T10:30:15Z'
    },
    {
        identity: 'user',
        content: '可以解釋一下 Redux 的設置嗎？',
        timestamp: '2025-08-14T10:31:00Z'
    },
    {
        identity: 'assistant',
        content: '當然！這個專案的 Redux 設置包含：\n\n1. **Store 配置**：使用 configureStore\n2. **Slice 管理**：分別有 chatSlice 和 componentsSlice\n3. **TypeScript 支援**：定義了 RootState 類型\n\n每個 slice 都管理特定的狀態部分，讓代碼更模組化和易維護。',
        timestamp: '2025-08-14T10:31:20Z'
    },
    {
        identity: 'user',
        content: 'Grid 佈局是怎麼實現的？',
        timestamp: '2025-08-14T10:32:00Z'
    },
    {
        identity: 'assistant',
        content: '專案使用 CSS Grid 實現三欄佈局：\n\n```css\ngrid-template-columns: 4.5rem 2fr 1fr;\n```\n\n- **左側**：4.5rem 固定寶度（可展開至 20rem）\n- **中間**：2fr 彈性寬度（主要內容區）\n- **右側**：1fr 彈性寬度（聊天區）\n\n透過 transition 實現平滑的展開/收縮動畫。',
        timestamp: '2025-08-14T10:32:30Z'
    }
];

const initialState: chatStatus = {
    // messages: mockMessages,
    messages: [{
        identity: 'assistant',
        content: '您好！我是您的 AI 助手，有什麼我可以幫助您的嗎？',
        timestamp: new Date().toLocaleString()
    }],
    isLoading: false,
};

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload;
        },
        clearMessages: (state) => {
            state.messages = [];
        },
        loadMockMessages: (state) => {
            state.messages = mockMessages;
        }
    }
})
export const { addMessage, setLoading, clearMessages, loadMockMessages } = chatSlice.actions;
export default chatSlice.reducer;


