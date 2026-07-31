export interface User {
  id: string; 
  username: string;
  birthdate: string; 
  description: string;
  avatarUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Chat {
  id: string;
  name?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  text: string;
  chatId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}
