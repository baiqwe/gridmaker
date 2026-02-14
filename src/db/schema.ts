import * as authSchema from "./auth.schema";

export const schema = {
    ...authSchema,
    // ... your other schemas
} as const;