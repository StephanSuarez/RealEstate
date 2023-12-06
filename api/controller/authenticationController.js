import { check, validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import User from "../../models/User.js";
import { generateId, generateJWT } from '../../helpers/tokens.js';
import { emailRegister, emailForgotPassword } from '../../helpers/mailer.js';

// GET forms -> render pages.
const formLoginUser = (req, res)=>{
  return res.render('./authentication/login.pug', {
    page: 'Login'
  });
}

const requestLoginUser = async (req, res)=>{
  await check('email').isEmail().withMessage('Invalid Email').run(req);
  await check('password').notEmpty().withMessage('Invalid Password').run(req);

  let result = validationResult(req);

  if(!result.isEmpty()){
    return res.render('./authentication/login.pug', {
      page: 'Login',
      errors: result.array()
    });
  }

  const { email, password } = req.body;
  const user = await User.findOne({ where: {email} })

  if(user==null){
    return res.render('./authentication/login.pug', {
      page: 'Login',
      errors: [{ msg: 'This email is not register' }]
    })
  }

  if(user.confirm==null){
    return res.render('./authentication/login.pug', {
      page: 'Login',
      errors: [{ msg: 'Your account is not confirm' }]
    })
  }

  if(!user.checkPassword(password)){
    return res.render('./authentication/login.pug', {
      page: 'Login',
      errors: [{ msg: 'Incorrect Password' }]
    })
  }
  
  const jwtUser = generateJWT(user.id, user.name)
  
  return res.cookie('_token', jwtUser, {
    httpOnly: true 
    // Secure: true
  }).redirect('/properties');
}

const requestLogOut = (req, res)=>{
  return res.clearCookie('_token').status(200).redirect('/');

}

const formSingUpUser = (req, res)=>{
  res.render('./authentication/signUp.pug', {page: 'Create Account'});
}

const formForgotPassword = (req, res)=>{
  res.render('./authentication/forgotPassword.pug', {page: 'Forgot Password'});
}

const formResetPassword = async (req, res)=>{
  await check('email').isEmail().withMessage('Invalid Email').run(req);

  let result = validationResult(req);

  if(!result.isEmpty()){
    return res.render('./authentication/forgotPassword.pug', {
      page: 'Forgot Password',
      errors: result.array()
    })
  }

  const { email } = req.body
  const user = await User.findOne({where: {email} });


  if(!user){
    return res.render('./authentication/forgotPassword.pug', {
      page: 'Create Account',
      errors: [{msg: 'Email is not registered'}],
    })
  }

  user.token = generateId()
  await user.save()

  emailForgotPassword({name: user.name, email: user.email, token: user.token})
    return res.render('./templates/message.pug', {
      page: 'Password Reset',
      msg: 'we have send an email with instruction about reset your password'
    })

}

const resetPassword = async (req, res)=>{
  const { token } = req.params; 

  const user = await User.findOne({ where: { token } });

  if(!user){
    return res.render('./templates/message.pug', {
      page: 'Reset Password',
      msg: 'There was and error reseting your password'
    })
  }
  res.render('./authentication/resetPassword.pug', {
    page: 'Reset Password'
  })
}

const savingNewPassword = async (req, res)=>{
  await check('newPassword').isLength({ min: 6 }).withMessage('Invalid Password, must contain at least 6 letters').run(req);
  let result = validationResult(req);

  if(!result.isEmpty()){
    return res.render('./authentication/resetPassword.pug',  {
      page: 'Reset Password',
      errors: result.array(),
    })
  }

  const { token } = req.params;
  const { newPassword } = req.body;
  
  const user = await User.findOne({where: {token} });
  const saltRounds = await bcrypt.genSalt(10);
  
  user.password = await bcrypt.hash(newPassword, saltRounds);
  user.token = null;
  await user.save();

  res.render('./authentication/confirmAccount.pug', {
    page: 'Reset Password Success'
  })
}

// Used to POST sing Up
const requestSignUpUser = async (req, res)=>{
  await check('name').notEmpty().withMessage('Invalid Name').run(req);
  await check('email').isEmail().withMessage('Invalid Email').run(req);
  await check('password').isLength({ min: 6 }).withMessage('Invalid Password, must contain at least 6 letters').run(req);
  await check('confirmPassword').equals(req.body.password).withMessage('Passwords must be equeals').run(req);

  let result = validationResult(req);

  const {name, email, password} = req.body;
  
  // Verify error in the inputs
  if(!result.isEmpty()){
    return res.render('./authentication/signUp.pug',  {
      page: 'Create Account',
      errors: result.array(),
      user: {
        name: req.body.name,
        email: req.body.email
      }
    })
  }
  
  // verify if user is already registered
  const userExist = await User.findOne({where: {email} });

  if(userExist){
    return res.render('./authentication/signUp.pug', {
      page: 'Create Account',
      errors: [{msg: 'Email already registered'}],
      user: {
        name,
        email
      }
    })
  }

  // Create user 
  const userRegister = await User.create({
    name, 
    email,
    password,
    token: generateId()
  })

  // Confirm Email Message
  emailRegister({name: userRegister.name, email: userRegister.email, token: userRegister.token})
  res.render('./templates/message.pug', {
    page: 'Confirm Email',
    msg: `We've sen an email to ${email} to confirm the account`
  })
}

// Confirm Account
const confirmAccount = async (req, res)=>{
  const {token} = req.params;

  // Invalid Token
  const user = await User.findOne( {where: {token} } )
  if(!user){
    return res.render('./authentication/confirmAccount.pug',{
      page: 'Confirm Account',
      message: 'There was an error confirm your account',
      error: true
    })
  }
  user.token = null;
  user.confirm = true;
  await user.save()

  // Valid Token
  res.render('./authentication/confirmAccount.pug', {
    page: 'Confirm Account',
    message: 'Successful confirm account'
  })
}

export{
    formLoginUser,
    requestLoginUser,
    formSingUpUser,
    formForgotPassword,
    formResetPassword,
    requestLogOut,
    resetPassword,
    savingNewPassword,
    requestSignUpUser,
    confirmAccount
}



