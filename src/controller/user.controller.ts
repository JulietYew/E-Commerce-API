import { Request, Response } from 'express';
import userService from '../services/user.service';
import { hashPassword, verifyPassword } from '../utils/bcrypt';
import { generateToken } from '../utils/token';
import { IUser } from '../interfaces/user.interface'

class UserController{
    async signup(req: Request, res: Response) {
        try {
          // Checks for existing user
          const existingUser = await userService.find({
            email: req.body.email,
          });
    
          if (existingUser && existingUser.email === req.body.email) {
            return res.status(403).json({
              message: `Email already exist, try registering with another email`,
              success: false,
            });
          }
          // Hashes the given password
          const hashedPassword = await hashPassword(req.body.password);
          // Creates a new user
        const newUser = await userService.create({
            fullname: <string>req.body.fullname,
            email: <string>req.body.email,
            phoneNumber: <string>req.body.phoneNumber,
            password: hashedPassword,

        })
        // save the details of the user
        await newUser.save();

        return res.status(201).json({
            success: true,
            message: "User created successfully"
        })
   
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error"
        })       
    }
}
    async login(req: Request, res: Response) {
        try {
      // Checks if the user already exists
        const existingUser = await userService.find({
        email: <string>req.body.email,
         });

        // Returns a message if user doesn't exist
        if (!existingUser) {
            return res.status(404).json({
            message: "User does not exist, would you like to sign up instead?",
            success: false,
        });
      }

        if (existingUser && existingUser.deleted === true) {
            return res.status(403).json({
             message: `This email belongs to a disabled account.`,
            success: false,
        });
      }

      // Checks if the password input by the client matches the protected password of the returned user
        const isValidPassword = await verifyPassword(
            <string>req.body.password,
            existingUser.password
      );

      // Sends a message if the input password doesn't match
        if (!isValidPassword) {
            return res.status(401).json({
            message: "Incorrect password, please retype your password",
            success: false,
        });
      }

      // Generates an access token
      const payload = existingUser.toObject();
      const token = await generateToken(payload);

    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Error",
          });
    }
}
}