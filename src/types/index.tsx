export type AudioFile = {
  id: string;
  name: string;
  url: string;
  length: number;
  comments: Comment[];
};

export type User = {
  id: string;
  email: string;
  name: string;
  comments: Comment[];
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  userId: string;
  audioFileId: string;
  subject: AudioFile;
  author: User;
  text: string;
  title: string;
  timestamp: number;
};
