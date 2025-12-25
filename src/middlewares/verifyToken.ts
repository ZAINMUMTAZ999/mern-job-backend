import  { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
};

const JWT_SECRET_KEY  ="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
export const verifyToken =  (
  req: Request,
  resp: Response,
  next: NextFunction
) => {

  const token = req.cookies["auth_token"];
  if (!token) resp.status(400).json({ message: "token not found" });

  try {
    const decoded = jwt.verify(token,JWT_SECRET_KEY);
    req.userId = (decoded as JwtPayload).userId;
    next();
  } catch (error) {
    console.log(error);
    resp.status(500).json({ message: "Unauthorized" });
  }
};

