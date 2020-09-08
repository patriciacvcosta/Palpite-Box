import React from 'react'
import Header from '../Header'
import Footer from '../Footer'

const Layout = ({ children }) => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <div className='container mx-auto flex-grow'>
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default Layout