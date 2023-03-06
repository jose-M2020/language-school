import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 4000;
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/language-school";
export const JWT_SECRET = process.env.JWT_SECRET || "secretkey";
export const ALLOWED_ORIGINS = 
  ((process.env.ALLOWED_ORIGINS)?.split(",").map(item => item.trim())) || '*';
