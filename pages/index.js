import Head from 'next/head'
import { useRef } from 'react';
import fetch from 'isomorphic-fetch';
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()

  const emailAdvogado = useRef(null)
  const passwordAdvogado = useRef(null)
  const cpfClient = useRef(null)
  const passwordClient = useRef(null)

  function getAdvogadoInputs(){
    return {
      email: emailAdvogado.current.value,
      password: passwordAdvogado.current.value
    }
  }
  function getAClientInputs(){
    return {
      email: cpfClient.current.value,
      password: passwordClient.current.value
    }
  }

  async function sendAPI(){
    const userData = getAdvogadoInputs()
    const res = await fetch('http://localhost:3000/api/advogados/login',{
      method: 'POST',
      headers: {
        'Content-Type':'application/json'
      },
      body: JSON.stringify(userData)
    })
    const json = await res.json()
    console.log(json)
    router.push('/advogado')
  }

  return (
    <div className="container">
      <Head>
        <title>Probono Platform</title>
      </Head>

      <main>
        <h1 className="title">
          Bem Vindo!
        </h1>

        <p className="description">
          Faça seu login
        </p>

        <div className="grid">
          <div className="card">
            <h3>Advogado &rarr;</h3>
            <p>Entre na plataforma e administre seus processos!</p>
            <input ref={emailAdvogado} placeholder="Email"/>
            <input ref={passwordAdvogado} placeholder="Senha"/>
            <button onClick={sendAPI}>Entrar!</button>
          </div>

          <div className="card">
            <h3>Cliente &rarr;</h3>
            <p>Entre na plataforma e veja seus processos!</p>
            <input ref={cpfClient} placeholder="CPF"/>
            <input ref={passwordClient} placeholder="Senha"/>
            <button >Entrar!</button>
          </div>

        </div>
      </main>
      <footer>
        Probono Project
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input{
          display: block;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          margin: 1rem;
          padding: 1rem;
        }

        button{
          border: 1px solid #eaeaea;
          border-radius: 5px;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card{
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  )
}
