import dotenv from "dotenv";
dotenv.config();

export const PORT = process.env.PORT || 4000;

export const YELP_API_URL = process.env.YELP_API_URL || "";
export const YELP_API_KEY = process.env.YELP_API_KEY || "";

export const DEFAULT_LIMIT = 20;
export const DEFAULT_OFFSET = 0;
