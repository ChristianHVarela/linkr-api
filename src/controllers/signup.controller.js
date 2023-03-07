import bcrypt from 'bcrypt';
import { signupRepository } from '../repositories/signup.repository.js';

export async function signup(req, res) {
    const { email, password, name, image } = req.body;

    const encryptedPassword = bcrypt.hashSync(password, 10);

    try {
        await signupRepository(email, encryptedPassword, name, image);
        res.sendStatus(201);
    } catch (error)
    {
        if (error.code == 23505) return res.status(409).send("email já cadastrado!");
        console.log(error);
        res.sendStatus(500);
    }
}