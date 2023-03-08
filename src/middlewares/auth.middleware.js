import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { authRepository } from '../repositories/auth.repository';
dotenv.config();

export async function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    const key = process.env.JWT_KEY;

    if (!token) return res.status(401).send("Authorization missing!");

    try {
        const { email } = jwt.verify(token, key);
        const data = await authRepository(email);
        if (data.rowCount === 0) return res.status(401).send("Failed to authenticate");

        res.locals.user = data.rows[0];
        next();
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}