import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
export const SECRET_KEY: Secret = 'your-secret-key';
export default class JwtService {

    public static generateToken = (payload: object): string => {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });
    };

    public static verifyToken = (token: string): any => {
        try {
            return jwt.verify(token, SECRET_KEY);
        } catch (error) {
            throw new Error('Invalid token');
        }
    };

    public static decodeToken = (token: string): any => {
        try {
            return jwt.decode(token);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
