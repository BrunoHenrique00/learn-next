import knex from '../../../src/database'

export default async (req, res) => {
  if(req.method === 'GET'){
      try {
        const { id } = req.query
        const user = await knex('advogados').select('id', 'email').where({id})

        return res.status(201).send(user)
      } catch (error) {

        return res.status(error)
      }
  }
  if(req.method === 'PUT'){
    try {
        const { id } = req.query
        const { email } = req.body
        await knex('advogados')
        .where({id})
        .update({email})

        return res.status(201).send("Atualizado com sucesso!")
      } catch (error) {
        return res.status(error)
      }
  }
  else{
    res.send('Não tem esse método.')
  }
}
