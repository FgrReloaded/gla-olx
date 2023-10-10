import React, { useEffect, useState, useContext } from 'react'
import styles from '@/styles/Home.module.css'
import glxContext from '../context/glxContext';
import Head from 'next/head';
import { BiSearchAlt2 } from 'react-icons/bi'
import { Poppins, Roboto, Alice } from "next/font/google"
const pop = Poppins({ subsets: ["latin"], weight: "500" })
const roboto = Roboto({ subsets: ["latin"], weight: "300" })
const alice = Alice({ subsets: ["latin"], weight: "400" })
import Card from '@/components/Card';
import { AiFillPlusCircle, AiOutlineClose } from 'react-icons/ai'
import Category from '@/components/Category';
import NoItem from '@/components/NoItem';
import LoadingComponent from '@/components/LoadingComponent';

const Home = () => {
  const [category, setCategory] = useState("")
  const [search, setSearch] = useState("")
  const [noContent, setNoContent] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [showSearchItem, setShowSearchItem] = useState("")
  const [limit, setLimit] = useState(9)
  const context = useContext(glxContext);
  const { getItem, items, getItemBySearch, searchItem, setSearchItem, showSkeleton, loadMoreBtn } = context;

  useEffect(() => {
    let currentUser = localStorage.getItem("currentUserId")
    let profilePic = localStorage.getItem("profilePic")
    if (!profilePic) {
      localStorage.setItem("profilePic", "/images/user.png")
    }
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
    e.target.addEventListener("keyup", (e) => {
      if (e.keyCode === 13) {
        handleSearchItem()
      }
    })
  }

  const handleCategory = (val) => {
    setShowSearchItem(false)
    setCategory(val)
    const ite = items.filter(item => {
      if (item.category.includes(val) && item.seller !== currentUser) {
        return item
      }
    })
    if (ite.length === 0) {
      setNoContent(true)
    } else {
      setNoContent(false)
    }
  }
  const handleSearchItem = () => {
    document.getElementById("cardSec").scrollIntoView();
    const ite = items.filter(item => {
      if (item.title.toLowerCase().includes(search.toLowerCase())) {
        return item
      }
    })

    if (ite.length === 0) {
      getItemBySearch(search, limit)
      if (searchItem.length === 0) {
        setNoContent(true)
        setShowSearchItem(false)
      } else {
        setShowSearchItem(true)
      }
    } else {
      setShowSearchItem(true)
      setSearchItem(ite)
      setNoContent(false)
    }
  }

  const handleCloseSearch = (e) => {
    setShowSearchItem(false)
    setSearch("")
  }

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main>
        <div className={styles.heroSec} style={pop.style} >
          <div className={styles.searchBox}>
            <input style={alice.style} type="text" value={search} onChange={handleSearch} className={styles.inputSearch} placeholder="What are you looking for?..." />
            <div className={styles.searchBtn}>
              <span onClick={handleSearchItem}>Search</span> <BiSearchAlt2 color='#D9D9D9' size={25} />
            </div>
          </div>
        </div>
      </main>
      <Category handleCategory={handleCategory} />

      <section className={styles.cardSec} id='cardSec'>
        <h3 className={styles.cardHead} style={roboto.style}>Fresh Recommendation:
          <span onClick={handleCloseSearch} className={`${styles.hideSearchResult} ${showSearchItem?"":"hidden"}`}>Search Result <AiOutlineClose /> </span>
        </h3>
        {!noContent && items.length !== 0 ?
          <div className={styles.productList}>
            {
              items && !showSearchItem && items.map((item, i) => {
                if (category && item.category.toLowerCase().includes(category.toLowerCase()) && currentUser !== item.seller) {
                  return (
                    <Card item={item} key={i} />
                  )
                }
                else if (!category && currentUser !== item.seller) {
                  return (
                    <Card item={item} key={i} />
                  )
                }
              })
            }
            {showSearchItem && searchItem && searchItem.map((item, i) => {
              return (
                <Card item={item} key={i} />
              )
            })}
            {showSkeleton && <LoadingComponent />}
          </div>
          : !showSkeleton && <NoItem />
        }
        <div className={styles.productList}>

        {
          showSkeleton && <LoadingComponent />
        }
        </div>
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

export default Home