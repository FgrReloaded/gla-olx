import React, { useEffect, useState, useContext } from 'react'
import { auth, db } from "@/middleware/firebase"
import styles from '@/styles/Home.module.css'
import glxContext from './context/glxContext';
import Head from 'next/head';
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { Alice, Roboto } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
const roboto = Roboto({ subsets: ["latin"], weight: "300" })
import Card from '@/components/Card';
import { AiFillPlusCircle } from 'react-icons/ai'

const Home = () => {
  const context = useContext(glxContext);
  const { getItem, items } = context;

  useEffect(() => {
    getItem()
  }, [])

  

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>


      <main>
        <div className={styles.heroSec} style={alice.style} >
          <div className={styles.searchBox}>
            <input type="text" className={styles.inputSearch} placeholder="What are you looking for?..." />
            <div className={styles.searchBtn}>
              <span>Search</span> <BiSearchAlt2 color='#D9D9D9' size={25} />
            </div>
          </div>
        </div>
      </main>
      <section>
        <ul className={styles.category}>
          <li><a>ALL CATEGORIES</a> <IoIosArrowDropdownCircle /> </li>
          <li><a>Chemistry Lab-Coats</a></li>
          <li><a>ED-lab Stuff</a></li>
          <li><a>Electronics Items</a></li>
          <li><a>Student's Notes</a></li>
          <li><a>Books</a></li>
          <li><a>Posters</a></li>
          <li><a>General Room Stuff</a></li>
        </ul>
      </section>

      <section className={styles.cardSec}>
        <h3 className={styles.cardHead} style={roboto.style}>Fresh Recommendation:</h3>
        <div className={styles.productList}>
          {
            items && items.map((item, i) => {
              return <Card key={i} item={item} />
            })
          }

        </div>
        <button className={styles.loadMore} style={alice.style}>
          Load More <AiFillPlusCircle color='#D9d9d9' size={25} />
        </button>
      </section>

    </>
  )
}

export default Home