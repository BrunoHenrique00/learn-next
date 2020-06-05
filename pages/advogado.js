import fetch from 'isomorphic-fetch';

export default function advogado({data,cookie}){
    return (
        <div>
            {data.map(user => <div key={user.id}> {user.email} </div>)}
            {cookie}
        </div>
    )
}


advogado.getInitialProps = async (ctx) => {

    const res = await fetch('http://localhost:3000/api/advogados',{
        headers:{
           cookie: ctx.req ? ctx.req.headers.cookie : undefined
        }
    })
    const json = await res.json()
    return {
        data: json
    }
}