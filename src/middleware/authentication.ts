import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ValidationRequest, UserData } from '../controllers/authController';
// Implemente o middleware de autenticação aqui

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest
    const {authorization} = validationReq.headers;

    console.log('here: ', authorization)

    if(!authorization){
        return res.status(401).json({
            message: 'Token diperlukan'
        })
    }

    const token = authorization.split(' ')[1];
    const secret = process.env.JWT_SECRET!;

    try {
        const jwtDecode = jwt.verify(token, secret);

        if(typeof jwtDecode !== 'string'){
            validationReq.userData = jwtDecode as UserData
        }
    } catch (error) {
        return res.status(401).json({
            message: 'Unauthorized'
        })
    }
    next()
};

