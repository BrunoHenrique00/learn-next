import { verify } from 'jsonwebtoken'

export const authentication = async (req,res) => {
    verify(req.headers.authorization,'20c523ca-733d-4386-8691-33bdb3252636',async (err,decoded) =>{
        if(!err && decoded){
            return await (req,res)
        }else{
            res.status(500).json({message: 'Usuario nao autenticado!'})
        }
    })
}