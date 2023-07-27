import React, { useEffect, useState } from 'react'
import { auth, db } from "@/middleware/firebase"
import styles from '@/styles/Home.module.css'
import { doc, getDoc, setDoc } from "firebase/firestore";
import Cookies from 'js-cookie';
import Head from 'next/head';
import { BiSearchAlt2 } from 'react-icons/bi'
import { IoIosArrowDropdownCircle } from "react-icons/io"
import { Alice, Roboto } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
const roboto = Roboto({ subsets: ["latin"], weight: "300" })
import Card from '@/components/Card';
import { AiFillPlusCircle } from 'react-icons/ai'

const Home = () => {

  useEffect(() => {
    let userId = localStorage.getItem("currentUserId")
    if (userId) {
      getUserData(userId)
    }
  }, [])

  const getUserData = async (userId) => {
    let getExistingUserData = Cookies.get(userId)
    if (getExistingUserData) {
      return;
    }
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = []
      data.push(docSnap.data())
      localStorage.setItem("profilePic", docSnap.data().profilePic)
      Cookies.set(userId, JSON.stringify(data), { expires: 5 })
    } else {
      console.log("No such document!");
    }
  }

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
          <Card />
          <Card />

        </div>
        <button className={styles.loadMore} style={alice.style}>
          Load More <AiFillPlusCircle color='#D9d9d9' size={25} />
        </button>
      </section>

    </>
  )
}

export default Home