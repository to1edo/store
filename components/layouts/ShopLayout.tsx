import { FC } from "react"
import Head from "next/head"
import { NavBar } from "../ui"

interface Props {
  children: React.ReactNode,
  title?: string,
  description?: string,
  imageFullUrl?: string
}

export const ShopLayout:FC<Props> = ({title, description, imageFullUrl, children}) => {
  return (
    <>
      <Head>
        <title>{title || 'Clothes Shop'}</title>
        <meta name="description" content={description}/>
        <meta name="og:title" content={title}/>
        <meta name="og:desription" content={description}/>
        {imageFullUrl ? <meta name="og:image" content={imageFullUrl}/> : null}
      </Head>

      <nav>
        <NavBar/>
      </nav>

      {/* Sidebar */}
      
      <main style={{
        margin: '20px auto',
        maxWidth: '1440px',
        padding: '0px 30px'
      }}>
        {children}
      </main>

      <footer>
        
      </footer>
    </>
  )
}
