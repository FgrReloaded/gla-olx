import React, { useEffect, useContext, useState, useRef } from 'react'
import styles from "@/styles/Myads.module.css"
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai"
import { BsEyeFill } from "react-icons/bs"
import glxContext from '../context/glxContext'
import Link from 'next/link'
import NoItem from '@/components/NoItem'
import Image from 'next/image'
import Head from 'next/head'

const MyAds = () => {
    const ref = useRef();
    const [currentItem, setCurrentItem] = useState([])
    const [filterOpt, setFilterOpt] = useState("All")
    const { getUserItem, userItems, deleteItem, setUserItems } = useContext(glxContext)
    const [handleFilter, setHandleFilter] = useState("")
    const [userId, setUserId] = useState("")
    useEffect(() => {
        const currentUserId = localStorage.getItem("currentUserId")
        setUserId(currentUserId)
        let currentUser = localStorage.getItem("currentUserId")
        if (!currentUser) {
            window.location.href = "/signup"
        }
        getUserItem(currentUser)
    }, [])


    const handleChange = (e) => {
        setHandleFilter(e.target.value)
    }
    const showDrop = (e) => {
        e.target.nextSibling.classList.toggle(styles.show)
    }

    const filterAds = (val) => {
        let filteredItem;
        if (currentItem.length === 0) {
            setCurrentItem(userItems)
        }
        setFilterOpt(val);
        if (val === "Active") {
            filteredItem = userItems.filter(item => item.status === "Active")
            if (filteredItem.length < 1) {
                filteredItem = currentItem.filter(item => item.status === "Active")
            }
            setUserItems(filteredItem)
        }
        else if (val === "Completed") {
            filteredItem = userItems.filter(item => item.status === "Completed")
            if (filteredItem.length < 1) {
                filteredItem = currentItem.filter(item => item.status === "Completed")
            }
            setUserItems(filteredItem)
        } else {
            setUserItems(currentItem)
        }
    }

    return (
        <>
            <Head>
                <title>My Ads</title>
            </Head>
            <div className={styles.section}>
                <div className={styles.upperSection}>
                    <div className={styles.search}>
                        <AiOutlineSearch />
                        <input type="text" value={handleFilter} placeholder="Search by ad title" onChange={handleChange} />
                    </div>
                    <div className={styles.filter}>
                        <p>Filter By: </p>
                        <div className={styles.filterOptions}>
                            <span onClick={() => (filterAds("All"))} className={`${filterOpt === 'All' ? styles.active : ""}`}>View all</span>
                            <span onClick={() => (filterAds("Active"))} className={`${filterOpt === 'Active' ? styles.active : ""}`}>Active Ads</span>
                            <span onClick={() => (filterAds("Completed"))} className={`${filterOpt === 'Completed' ? styles.active : ""}`}>Completed Ads</span>
                        </div>
                    </div>
                </div>
                <div className={styles.itemSection}>
                    {
                        userItems.length > 0 ? userItems.toReversed().map((item, index) => {
                            if (item.title.toLowerCase().includes(handleFilter.toLowerCase())) {
                                return (
                                    <div key={index} className={styles.item}>
                                        <div className={styles.date}>
                                            <span>
                                                <p> From </p>
                                                <strong>
                                                    {new Date(item.createdAt).toLocaleString('default', { month: 'short' })} {new Date(item.createdAt).getDate()}, {new Date(item.createdAt).getFullYear()}
                                                </strong>
                                            </span>
                                            <span>
                                                <p> To </p>
                                                <strong>
                                                    {new Date(new Date(item.createdAt).setMonth(new Date(item.createdAt).getMonth() + 1)).toLocaleString('default', { month: 'short' })} {new Date(item.createdAt).getDate()}, {new Date(item.createdAt).getFullYear()}
                                                </strong>
                                            </span>
                                        </div>
                                        <div className={styles.productData}>
                                            <div className={styles.details}>
                                                <div>
                                                    <Image width={100} height={100} src={item.images[4]} alt="" />
                                                    <h6>{item.title}</h6>
                                                </div>
                                                <span>₹ {item.price}</span>
                                                <button>Active</button>
                                                <p>This ad is currently live</p>
                                                <div className={styles.toggle} onClick={showDrop}>
                                                    &#10247;
                                                </div>
                                                <div ref={ref} className={styles.dropDown}>
                                                    <span>
                                                        <Link href={`/product/${item.title}?seller=${userId}&tempToken=${item._id}`}>
                                                            View Ad
                                                        </Link>
                                                    </span>
                                                    <span>Edit Ad</span>
                                                    <span>Mark as Sold</span>
                                                    <span onClick={() => { deleteItem(item._id) }}>Delete Ad</span>
                                                </div>
                                            </div>
                                            <div className={styles.metaData}>
                                                <div>
                                                    <span>
                                                        <BsEyeFill />
                                                        <p>Views: {item.views}</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }) : <NoItem message={"No items sold yet"} />}
                </div>
            </div>
        </>
    )
}

export default MyAds