export type userRes = {
  _id: string;
  name: string;
  uid: string;
  __v: number;
}

export type roomRes = {
  messages: messageRes[];
  _id: string;
  name: string;
  __v: number;
}

export type messageRes = {
  _id: string;
  message: string;
  user: userRes;
  timestamp: string;
  room: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

