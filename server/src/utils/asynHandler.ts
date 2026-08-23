import type { Request, Response, NextFunction } from "express";

type AsyncHandler = (
    req: Request,
    res: Response,
    next: NextFunction
) => Promise<unknown>;

const asyncHandler = (fn: AsyncHandler) => {
    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

export { asyncHandler };