import knex from '../../../src/database'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import cookie from 'cookie';

export default async (req, res) => {
  if(req.method === 'POST'){
    // login route
      try {
        const { email , password } = req.body
        const [user] = await knex('advogados').where({email}).select()

        compare(password, user.password, (err, result) => {
            if( !err && result){
                const claims = {id: user.id, myEmail: user.email}
                const jwt = sign(claims,'20c523ca-733d-4386-8691-33bdb3252636',{expiresIn: '1h'})
                res.setHeader('Set-Cookie', cookie.serialize('auth', jwt,{
                  httpOnly: true,
                  secure: false,
                  sameSite: true,
                  path: '/'
                }))
                res.json({message: 'Logado com sucesso!', email: email})
                return res.status(200).end()
            }else{
                res.json({error: 'Informacoes erradas'})
                res.end()
            }
        })

      } catch (error) {
        return res.status(error)
      }
  }else{
    res.send('Não tem esse método.')
  }
}
