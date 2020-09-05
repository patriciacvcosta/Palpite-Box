import React from 'react'
import Link from 'next/link'  //Optimizes the page rendering using prefetch. It loads the page before the user clicks the link.
import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then(res => res.json())

const Index = () => {
    const { data, error } = useSWR('/api/get-promo', fetcher)   //useSWR needs an URL from where it will fetch the data + how it will fetch that data

    return (
        <div>
            <p className='mt-12 text-center font-bold'>
                Restaurant X always seeks to better serve its customers. <br />
                This is is why we are always open to hear what you think.
            </p>
            <div className='text-center my-12'>
                <Link href='/pesquisa'>
                    <a className='bg-blue-400 px-12 py-4 font-bold rounded-lg shadow-lg hover:shadow'>Give an opinion/suggestion</a>
                </Link>
            </div>
            {!data && <p>Loading...</p>}
            {data && data.showCoupon &&
                <p className='my-12 text-center'>
                    {data.message}
                </p>
            }
        </div>
    )
}

export default Index