import React, { useEffect, useState, useContext } from 'react'
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
import NoItem from '@/components/NoItem';
import LoadingComponent from '@/components/LoadingComponent';

const Home = () => {
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [noContent, setNoContent] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [limit, setLimit] = useState(1)
  const context = useContext(glxContext);
  const { getItem, items, showSkeleton, loadMoreBtn } = context;

  useEffect(() => {
    let currentUser = localStorage.getItem("currentUserId")
    if (currentUser) {
      setCurrentUser(currentUser)
    }
    getItem(limit)
  }, [])

  const loadMore = () => {
    setLimit(limit + 9)
    getItem(limit + 9)
  }
  const handleSearch = (e) => {
    setSearch(e.target.value)
    const ite = items.filter(item => {
      if (item.title.toLowerCase().includes(e.target.value)) {
        return item
      }
    })
    if (ite.length === 0) {
      setNoContent(true)
    } else {
      setNoContent(false)
    }
  }

  const handleCategory = (val) => {
    setCategory(val)
    const ite = items.filter(item => {
      if (item.category.includes(val)) {
        return item
      }
    })
    if (ite.length === 0) {
      setNoContent(true)
    } else {
      setNoContent(false)
    }
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <div className={styles.heroSec} style={pop.style} >
          <div className={styles.searchBox}>
            <input type="text" onChange={handleSearch} className={styles.inputSearch} placeholder="What are you looking for?..." />
            <div className={styles.searchBtn}>
              <span onClick={() => { document.getElementById("cardSec").scrollIntoView(); }}>Search</span> <BiSearchAlt2 color='#D9D9D9' size={25} />
            </div>
          </div>
        </div>
      </main>
      <Category handleCategory={handleCategory} />

      <section className={styles.cardSec} id='cardSec'>
        <h3 className={styles.cardHead} style={roboto.style}>Fresh Recommendation:</h3>
        {!noContent ?
          <div className={styles.productList}>
            {
              items && items.map((item, i) => {
                if (search && item.title.toLowerCase().includes(search.toLowerCase()) && currentUser !== item.seller) {
                  return (
                    <Card item={item} key={i} />
                  )
                }
                else if (category && item.category.toLowerCase().includes(category.toLowerCase()) && currentUser !== item.seller) {
                  return (
                    <Card item={item} key={i} />
                  )
                }
                else if (!search && !category && currentUser !== item.seller) {
                  return (
                    <Card item={item} key={i} />
                  )
                }
              })
            }
            {showSkeleton && <LoadingComponent />}
          </div>
          : <NoItem />
        }
        {
          !noContent && loadMoreBtn &&
          <button onClick={loadMore} className={styles.loadMore} style={pop.style}>
            Load More <AiFillPlusCircle color='#fff' size={25} />
          </button>
        }
      </section>

    </>
  )
}

const newStyle = {
  display: "grid",
  gridTemplateColumns: "1fr",
}
export default Home