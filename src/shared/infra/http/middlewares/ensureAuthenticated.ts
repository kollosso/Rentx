import { Request, Response, NextFunction } from "express";
import { verify } from 'jsonwebtoken'
import { AppError } from "@shared/errors/AppError";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";
import auth from "@config/auth";

interface IPayload {
  sub: string
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction) {
  const authHeader = request.headers.authorization


  const { secret_refresh_token } = auth.jwt

  if (!authHeader) {
    throw new AppError('Token missing', 401)
  }

  const [, token] = authHeader.split(" ")

  try {
    const { sub: userId } = verify(token, secret_refresh_token) as IPayload

    request.user = {
      id: userId
    }

    next()
  } catch (error) {
    throw new AppError('Invalid token!', 401)
  }
}
