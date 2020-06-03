import knex from '../../src/database'
import {hash} from 'bcrypt'
import { authentication } from '../../src/api_functions/authentication'

export default async (req, res) => {
  if(req.method === 'GET'){ 
    authentication(req,res)
    // Get all users
    const db = await knex.select('id','email','password').from('advogados')
    res.send(db)
  }
  if(req.method === 'POST'){
    // register route
      try {
        const { email , password } = req.body
        // Hashing password
        hash(password, 10, async (err, hash) => {
          // Storing in the database
          await knex('advogados').insert({
            email: email,
            password: hash
          })
        })

        return res.status(201).send("Enviado com sucesso!")
      } catch (error) {
        return res.status(error)
      }
  }else{
    res.send('Não tem esse método.')
  }
}
