import jwt, { JwtPayload } from 'jsonwebtoken' 
import { IUser } from '../interfaces/user.interface'

const secretKey = <string>process.env.SECRET_KEY
const expiresIn = <string>process.env.JWT_EXPIRES_IN

// Generates a token by signing a user's unique details against a secret key whenever they sign in.
export const generateToken = async (payload: Partial <IUser>): Promise<string> => {
    return jwt.sign(payload, secretKey, {expiresIn: expiresIn})  
}

// Verifies the authenticity of a user by checking the validity of the user's token against the secret key
export const verifyToken = async (token: string): Promise<string | JwtPayload> => {
    return jwt.verify(token, secretKey)  
}