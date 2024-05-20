import { NextFunction, Request, Response, Router } from "express";
import { BaseRouter } from "./BaseRouter";
import userRepository from "../repositories/userRepository";
import {
    login,
    resendEmail,
    signUp,
    verifyAccout,
} from "../controllers/user.controller";
import catchAsync from "../utils/catchAsync";

/**
 * @description AuthLoginRouter
 */
class AuthLoginRouter extends BaseRouter {
    constructor() {
        super();
        this.init();
    }

    /**
     * Connect routes to their matching controller endpoints.
     */
    protected init() {
        this.router.post("/login", catchAsync(login));
        this.router.post("/sign-up", catchAsync(signUp));
        this.router.post("/verify", catchAsync(verifyAccout));
        this.router.post("/resend-verify", catchAsync(resendEmail));
    }
}

export default new AuthLoginRouter().router;
