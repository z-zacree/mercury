import { Timestamp } from "firebase/firestore";

export interface UserData {
  username: string;
  fullname: string;
  createdAt: Timestamp;
}
