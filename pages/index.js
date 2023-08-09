import React, { useEffect, useState, useContext, useRef } from 'react'
import { auth, db } from "@/middleware/firebase"
import styles from '@/styles/Home.module.css'
import glxContext from './context/glxContext';
import Head from 'next/head';
import { BiSearchAlt2 } from 'react-icons/bi'
import { Poppins, Roboto } from "next/font/google"
const pop = Poppins({ subsets: ["latin"], weight: "500" })
const roboto = Roboto({ subsets: ["latin"], weight: "300" })
import Card from '@/components/Card';
import { AiFillPlusCircle } from 'react-icons/ai'
import Category from '@/components/Category';

const Home = () => {
  const ref = useRef(null)
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [limit, setLimit] = useState(9)
  const context = useContext(glxContext);
  const { getItem, items } = context;

  useEffect(() => {
    getItem(limit)
  }, [])

  const loadMore = () => {
    setLimit(limit + 1)
    getItem(limit + 1)
  }


  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <div className={styles.heroSec} style={pop.style} >
          <div className={styles.searchBox}>
            <input type="text" onChange={(e) => { setSearch(e.target.value) }} className={styles.inputSearch} placeholder="What are you looking for?..." />
            <div className={styles.searchBtn}>
              <span onClick={() => { document.getElementById("cardSec").scrollIntoView(); }}>Search</span> <BiSearchAlt2 color='#D9D9D9' size={25} />
            </div>
          </div>
        </div>
      </main>
      <Category setCategory={setCategory} />

      <section className={styles.cardSec} id='cardSec'>
        <h3 className={styles.cardHead} style={roboto.style}>Fresh Recommendation:</h3>
        <div className={styles.productList}>
          {
            items && items.map((item, i) => {
              if (search && item.title.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <Card item={item} key={i} />
                )
              }
              else if (category && item.category.toLowerCase().includes(category.toLowerCase())) {
                return (
                  <Card item={item} key={i} />
                )
              }
              else if (!search && !category) {
                return (
                  <Card item={item} key={i} />
                )
              }
            })
          }

        </div>
        <button onClick={loadMore} className={styles.loadMore} style={pop.style}>
          Load More <AiFillPlusCircle color='#fff' size={25} />
        </button>
      </section>

    </>
  )
}

export default Home