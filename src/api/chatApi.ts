import axiosInstance from './axiosInstance';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getMyChatRoomListAPI = async () => {
  const res = await axiosInstance.get(`${API_BASE_URL}/chats/rooms/`);
  return res.data;
};

export const createNewChatRoomAPI = async (groupName: string) => {
  const res = await axiosInstance.post(`${API_BASE_URL}/chats/rooms/`, {
    room_name: `${groupName}Room`,
  });
  return res.data;
};

export const getMyChatRoomDetailAPI = async (roomId: number) => {
  const res = await axiosInstance.get(`${API_BASE_URL}/chats/rooms/${roomId}/`);
  return res.data;
};

export const putChatRoomDetailAPI = async (
  roomId: number,
  newRoomName: string,
) => {
  const res = await axiosInstance.put(
    `${API_BASE_URL}/chats/rooms/${roomId}/`,
    {
      room_name: newRoomName,
    },
  );
  return res.data;
};

export const patchChatRoomDetailAPI = async (
  roomId: number,
  newRoomName?: string,
) => {
  const res = await axiosInstance.put(
    `${API_BASE_URL}/chats/rooms/${roomId}/`,
    {
      ...(newRoomName ? { room_name: newRoomName } : {}),
    },
  );
  return res.data;
};

export const deleteChatRoomAPI = async (roomId: number) => {
  const res = await axiosInstance.delete(
    `${API_BASE_URL}/chats/rooms/${roomId}/`,
  );
  return res.data;
};

export const joinChatRoomAPI = async (roomId: number, roomName: string) => {
  const res = await axiosInstance.post(
    `${API_BASE_URL}/chats/rooms/${roomId}/join/`,
    {
      room_name: roomName,
    },
  );
  return res.data;
};

export const leaveChatRoomAPI = async (roomId: number, roomName: string) => {
  const res = await axiosInstance.post(
    `${API_BASE_URL}/chats/rooms/${roomId}/leave/`,
    {
      room_name: roomName,
    },
  );
  return res.data;
};

export const getChatMessageAPI = async (roomId: number, page: number) => {
  const res = await axiosInstance.get(
    `${API_BASE_URL}/chats/rooms/${roomId}/messages/?page=${page}`,
  );
  return res.data;
};

export const getChatRoomParticipantsAPI = async (
  roomId: number,
  page: number,
) => {
  const res = await axiosInstance.get(
    `${API_BASE_URL}/chats/rooms/${roomId}/participants/?page=${page}`,
  );
  return res.data;
};
