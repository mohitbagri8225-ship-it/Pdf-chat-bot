import { JwtUserPayload } from "./auth.types.js";

declare global {
    namespace Express {
        interface Request {
            user?: JwtUserPayload;
        }
    }
}

export {};