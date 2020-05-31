import knex from '../../src/database'

export default async (req, res) => {
  if(req.method === 'GET'){
    const db = await knex.select('id','email').from('advogados')
    res.send(db)
  }
  if(req.method === 'POST'){
      try {
        const { email , password } = req.body
        await knex('advogados').insert({
          email,
          password
        })
        return res.status(201).send("Enviado com sucesso!")
      } catch (error) {
        return res.status(error)
      }
  }else{
    res.send('Não tem esse método.')
  }
}
