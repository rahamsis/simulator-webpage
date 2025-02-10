import { RowDataPacket } from "mysql2/promise";

export type User = RowDataPacket & {
    id: string;
    name: string;
    email: string;
    password: string;
    message?: string;
  };