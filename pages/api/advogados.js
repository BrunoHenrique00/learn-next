import knex from '../../src/database'

export default async (req, res) => {
  if(req.method === 'GET'){
    const db = await knex('advogados')
    res.json(db)
  }
  if(req.method === 'POST'){
      try {
        const { email , password } = req.body
        await knex('advogados').insert({
          email,
          password
        })
        return res.status(201).send("enviado com sucesso!")
    } catch (error) {
        return res.status(error)
    }
  }else{
    res.send('Não tem esse método.')
  }
}
