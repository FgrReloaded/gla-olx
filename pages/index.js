import React, { useEffect, useState, useContext, useRef } from 'react'
import { auth, db } from "@/middleware/firebase"
import styles from '@/styles/Home.module.css'
import glxContext from './context/glxContext';
import Head from 'next/head';
import { BiSearchAlt2 } from 'react-icons/bi'
import { Alice, Roboto } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
const roboto = Roboto({ subsets: ["latin"], weight: "300" })
import Card from '@/components/Card';
import { AiFillPlusCircle } from 'react-icons/ai'
import Category from '@/components/Category';

const Home = () => {
  const ref = useRef(null)
  const [search, setSearch] = useState("")
  const context = useContext(glxContext);
  const { getItem, items } = context;
  const categories = {
    "Lab Items": ["Lab-Coats", "ED-lab Stuff"],
    "Room Items": ["Posters", "Lights", "General Room Stuff"],
    "Books": ["Course Books", "Novels", "Others"],
    "Sports Items": ["Cricket", "Badminton", "Volleyball", "Football", "Table Tennis", "Basketball"],
    "Gadgets": ["Mobiles", "Laptops", "Headphones", "Speakers", "Others"],
    "Accessories": ["Bags", "Watches", "Wallets", "Belts", "Sunglasses", "Others"],
    "Clothes": ["T-Shirts", "Shirts", "Jeans", "Jackets", "Others"],
    "Others": ["Others"],
  }

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
            <input type="text" onChange={(e) => { setSearch(e.target.value) }} className={styles.inputSearch} placeholder="What are you looking for?..." />
            <div className={styles.searchBtn}>
              <span onClick={()=>{document.getElementById("cardSec").scrollIntoView();}}>Search</span> <BiSearchAlt2 color='#D9D9D9' size={25} />
            </div>
          </div>
        </div>
      </main>
      <Category categories={categories}/>

      <section className={styles.cardSec} id='cardSec'>
        <h3 className={styles.cardHead} style={roboto.style}>Fresh Recommendation:</h3>
        <div className={styles.productList}>
          {
            items && items.map((item, i) => {
              if (item.title.toLowerCase().includes(search.toLowerCase())) {
                return (
                  <Card item={item} key={i} />
                )
              }
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