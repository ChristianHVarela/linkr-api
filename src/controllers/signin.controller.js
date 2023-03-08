import bcrypt from 'bcrypt';
import signinRepository from '../repositories/signin.repository.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function signin(req, res) {
    const { email, password } = req.body;

    try {
        const user = await signinRepository(email);
        if (user.rowCount === 0) return res.status(401).send("email or password does not exists!");
        if (!bcrypt.compareSync(password, user.rows[0].password)) return res.status(401).send("email or password does not exists!");

        const token = jwt.sign({ email: user.rows[0].email }, process.env.JWT_KEY);

        res.status(200).send({ token });
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}