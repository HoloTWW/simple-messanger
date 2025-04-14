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
  chatMessages: ChatMessages[];
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
    { id: "chat1", folderId: "0", username: "Alice", message: "Hello!", timestamp: "10:00", fromSender: true },
    { id: "chat2", folderId: "0", username: "Bob", message: "Hi Alice!", timestamp: "10:01", fromSender: false },
    { id: "chat3", folderId: "1", username: "Charlie", message: "Meeting?", timestamp: "10:02", fromSender: null },
    { id: "chat4", folderId: "2", username: "Gena", message: "РАБОТЯТЬ!? РАБОТЯТЬ!", timestamp: "10:00", fromSender: null },
    { id: "chat5", folderId: "3", username: "EugeneSagaz", message: "Всем хай! С вами юджин!", timestamp: "10:00", fromSender: null },
    { id: "chat6", folderId: "4", username: "Тула", message: "Да этот ваш хадуп за 2 недели делается", timestamp: "10:00", fromSender: null },
  ],
  chatMessages:[
    {chatId:"chat2",id:"1",username:"You",timestamp:"10:02",checked:true,message:"Привчедел"},
    {chatId:"chat2",id:"2",username:"You",timestamp:"10:02",checked:true,message:"Как мама?"},
    {chatId:"chat2",id:"3",username:"You",timestamp:"10:03",checked:true,message:":D"},
    {chatId:"chat2",id:"4",username:"Bob",timestamp:"10:05",checked:null,message:"Опять ты выходишь на связь [данные удалены]?"},
    {chatId:"chat2",id:"5",username:"Bob",timestamp:"10:06",checked:null,message:"Сколько раз повторять, я лабы делаю, не мешай!"},
    {chatId:"chat2",id:"6",username:"Bob",timestamp:"10:07",checked:null,message:"-_-"},
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