import { Router } from "express";
import { formLoginUser, requestLoginUser, requestLogOut, formSingUpUser, formForgotPassword, formResetPassword, resetPassword, savingNewPassword, confirmAccount, requestSignUpUser } from '../controller/authenticationController.js';

const router = Router()

router.get('/login', formLoginUser)
router.post('/login', requestLoginUser)

router.get('/signup', formSingUpUser)
router.post('/signup', requestSignUpUser)

router.get('/log-out', requestLogOut)

router.get('/forgot-password', formForgotPassword)
router.post('/forgot-password', formResetPassword)

router.get('/forgot-password/:token', resetPassword)
router.post('/forgot-password/:token', savingNewPassword)

router.get('/confirm-account/:token', confirmAccount)

export default router; 