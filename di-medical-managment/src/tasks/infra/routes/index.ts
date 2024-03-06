import { Request, Response } from "express";
import { validationResult } from "express-validator";

export function validateReqSchema(req: Request, res: Response, next: Function) {
  const validationErrors = validationResult(req);
  if (validationErrors.isEmpty()) {
    return next();
  }
  const errors = validationErrors.array().map((err: any) => ({ [err.path]: err.msg }));
  
  return res.status(400).json({
    errors: errors
  });
}
