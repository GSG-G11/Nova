import {Request, Response} from 'express'
import {sign} from "jsonwebtoken";
import bcrypt from "bcrypt";
import loginValidation from '../utils/validation/loginValidation';
const login = async (req: Request, res: Response) => {
    //TODO: change user to the incoming request
    const user = {
        id: 1,
        email: "test@test.com",
        password: "Test1@",
        role: "admin"
    }
    const {email, password}: {email: string, password: string} = user;

    const result = await loginValidation(user)
    
    if (result.error) {
        res.status(400).json({error: result.error.message})
    }
    
    //TODO: search for user in collections, check the role and compare password

    // const validPassword: boolean = await bcrypt.compare(password, user.password);

    const validPassword: boolean = password === user.password;

    if (!validPassword) {
        return res.status(400).json({
            error: "Invalid password"
        });
    }
    

    const token: string = sign({id: user.id}, process.env.JWT_SECRET ?? '', {expiresIn: "1h"});

    res.cookie("jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60,
        })

    res.status(200).json({
        message: 'Login successful',
        data: {
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            },
            token
        }
    })


}


export {
    login
}