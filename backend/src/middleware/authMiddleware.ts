import { NextFunction, Request, Response } from "express"
import { verifyToken } from "../utils/jwt"

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const token = req.header('Authorizatin')?.replace('Bearer ', '')

    if  ( !token ) {
        return res.status(401)
            .json({error: 'Access denied. No token'})
    }

    try { 
        const decoded = verifyToken(token);
<<<<<<< HEAD
        (req as any).user = decoded;
=======
        req.body.user = decoded;
>>>>>>> a93c026 (Adiciona página de login e registro com validação de formulário)
        next()
    }catch(error){ 
        return res.status(401)
            .json({msg: 'Access denied. Invalid token' + error})
    }
}