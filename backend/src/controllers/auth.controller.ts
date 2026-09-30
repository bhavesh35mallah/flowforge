import type { Request, Response } from "express";
import {
    loginSchema,
    registerSchema,
} from "../validators/auth.validator.js";
import {
    getCurrentUser,
    loginUser,
    registerUser,
} from "../services/auth.service.js";

import type { AuthRequest } from "../middleware/auth.middleware.js";

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    maxAge: 24 * 60 * 60 * 1000,
};

export async function register(
    req: Request,
    res: Response
) {
    try {
        const input = registerSchema.parse(req.body);

        const result = await registerUser(input);

        res.cookie(
            "access_token",
            result.token,
            cookieOptions
        );

        return res.status(201).json({
            success: true,
            data: {
                user: result.user,
            },
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "USER_ALREADY_EXISTS"
        ) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Unable to register user",
        });
    }
}

export async function login(
    req: Request,
    res: Response
) {
    try {
        const input = loginSchema.parse(req.body);

        const result = await loginUser(input);

        res.cookie(
            "access_token",
            result.token,
            cookieOptions
        );

        return res.status(200).json({
            success: true,
            data: {
                user: result.user,
            },
        });
    } catch (error) {
        if (
            error instanceof Error &&
            error.message === "INVALID_CREDENTIALS"
        ) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        if (
            error instanceof Error &&
            error.message === "USER_INACTIVE"
        ) {
            return res.status(403).json({
                success: false,
                message: "Your account is not active",
            });
        }

        return res.status(400).json({
            success: false,
            message: "Unable to login",
        });
    }
}

export function logout(
    _req: Request,
    res: Response
) {
    res.clearCookie("access_token");

    return res.status(200).json({
        success: true,
        message: "Logged out successfully",
    });
}

export async function me(
  req: AuthRequest,
  res: Response
) {
  try {
    if (!req.userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const user = await getCurrentUser(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      data: {
        user,
      },
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Unable to get current user",
    });
  }
}