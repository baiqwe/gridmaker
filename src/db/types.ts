import { apikey } from "./auth.schema";
import { userFiles } from "./app.schema";

export type ApiKey = typeof apikey.$inferSelect;
export type UserFiles = typeof userFiles.$inferSelect;