import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определите интерфейсы
interface ChatListItemData {
  username: string;
  message: string;
  timestamp: string;
  fromSender?: boolean | null;
  id: string;
  folderId: string;
}

interface Folder {
  id: string;
  name: string;
}

// username={"Me"} 
//         timestamp={"19.02.2025 22:44"} 
//         checked={false}
//         message="my final message, goodbye... "/>

interface ChatMessages {
  chatId:string;
  id: string;
  username: string;
  timestamp: string;
  checked: boolean | null;
  message: string; 
}

interface AppState {
  folders: Folder[];
  chatListItems: ChatListItemData[];
  currentFolderId: string | null; // Может быть null, если ничего не выбрано
  selectedChatId: string | null; // Может быть null, если ничего не выбрано
}

// Начальное состояние
const initialState: AppState = {
  folders: [
    { id: "0", name: "General" },
    { id: "1", name: "Private" },
    { id: "2", name: "Work" },
    { id: "3", name: "Coworkers" },
    { id: "4", name: "Fools" }
  ],
  chatListItems: [
    { id: "chat1", folderId: "0", username: "Alice", message: "", timestamp: "10:00", fromSender: true },
    { id: "chat2", folderId: "0", username: "Bob", message: "...Бывает", timestamp: "10:01", fromSender: null },
    { id: "chat3", folderId: "1", username: "Charlie", message: "Meeting?", timestamp: "10:02", fromSender: null },
    { id: "chat4", folderId: "2", username: "Gena", message: "РАБОТЯТЬ!? РАБОТЯТЬ!", timestamp: "10:00", fromSender: null },
    { id: "chat5", folderId: "3", username: "EugeneSagaz", message: "Всем хай! С вами юджин!", timestamp: "10:00", fromSender: null },
    { id: "chat6", folderId: "4", username: "Тула", message: "Да этот ваш хадуп за 2 недели делается", timestamp: "10:00", fromSender: null },
  ],
  currentFolderId: "0", // Выбрана папка General по умолчанию
  selectedChatId: null,
};

// Создайте slice для управления состоянием папок и чатов
const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    // Установите текущую выбранную папку
    setCurrentFolder: (state, action: PayloadAction<string | null>) => {
      state.currentFolderId = action.payload;
    },
    setSelectedChatId: (state, action: PayloadAction<string | null>) => {
      state.selectedChatId = action.payload;
    },
  },
});

// Экспортируйте actions
export const { setCurrentFolder, setSelectedChatId } = appSlice.actions;

// Создайте store
export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
  },
});

// Export the RootState type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;