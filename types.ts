
export interface Novel {
  _id: string;
  title: string;
  author: string;
  description: string;
  coverImage: string;
  createdAt: string;
  isPremium?: boolean; // If true, entire novel requires subscription
}

export interface Chapter {
  _id: string;
  novelId: string;
  title: string;
  content: string;
  order: number;
  isPremium?: boolean; // If true, individual chapter is locked
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  isSubscribed: boolean;
}
