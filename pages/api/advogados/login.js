import knex from '../../../src/database'
import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

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
                res.json({message: 'Logado com sucesso!', authToken: jwt})
            }else{
                res.json({error: 'Informacoes erradas'})
            }
        })

      } catch (error) {
        return res.status(error)
      }
  }else{
    res.send('Não tem esse método.')
  }
}
