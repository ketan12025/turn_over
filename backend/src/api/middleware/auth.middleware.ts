import { Request, Response, NextFunction } from "express";
import { appError } from "../models/global-error-handler.model";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../infrastructure/repositories/impl/user.repository";
import { container } from "../bindings/container-bindings";
import { ContainerTypes } from "../bindings/container-types";

export default async (req: Request, res: Response, next: NextFunction) => {
  const UserRepository = container.get<UserRepository>(
    ContainerTypes.UserRepository
  );
  let token;
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      throw appError(
        "You are not logged in! Please log in to get access.",
        401
      );
    }

    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET || "secret"
    )) as { id: number };
    console.log(decoded);
    const currentUser = await UserRepository.findOne({ id: decoded.id });
    if (!currentUser) {
      throw appError(
        "The user belonging to this token does no longer exist.",
        401
      );
    }
    next();
  } catch (e) {
    res.status(401).json({
      status: false,
      code: 401,
      error: { message: "You are not logged in! Please log in to get access." },
    });
  }
};
