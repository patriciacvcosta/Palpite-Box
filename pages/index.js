import React from 'react'
import Link from 'next/link'  //Optimizes the page rendering using prefetch. It loads the page before the user clicks the link.

const Index = () => {
    return (

        <p>adicionando uma linha</p>
        <div>
            <p className='mt-12 text-center font-bold'>
                O restaurante X sempre busca por atender melhor seus clientes.<br />
                Por isso, estamos sempre abertos a ouvir a sua opinião.
            </p>
            <div className='text-center my-12'>
                <Link href='/pesquisa'>
                    <a className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Dar opinião ou sugestão</a>
                </Link>
            </div>
            <p className='my-12 text-center'>
                Mensagem do desconto. Texto dinâmico vindo da planilha.
            </p>
        </div>
    )
}

export default Index