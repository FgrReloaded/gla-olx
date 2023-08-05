import React, { useEffect, useContext, useState } from 'react'
import styles from "@/styles/Myads.module.css"
import { AiOutlineSearch, AiOutlineHeart } from "react-icons/ai"
import { BsEyeFill } from "react-icons/bs"
import glxContext from './context/glxContext'

const myads = () => {
    const { getUserItem, userItems } = useContext(glxContext)
    const [handleFilter, setHandleFilter] = useState("")
    useEffect(() => {
        let currentUser = localStorage.getItem("currentUserId")
        if (!currentUser) {
            window.location.href = "/signup"
        }
        getUserItem(currentUser)
    }, [])

    const handleChange = (e) => {
        setHandleFilter(e.target.value)
    }


    return (
        <>
            <div className={styles.section}>
                <div className={styles.upperSection}>
                    <div className={styles.search}>
                        <AiOutlineSearch />
                        <input type="text" value={handleFilter} placeholder="Search by ad title" onChange={handleChange} />
                    </div>
                    <div className={styles.filter}>
                        <p>Filter By: </p>
                        <div className={styles.filterOptions}>
                            <span className={styles.active}>View all</span>
                            <span>Active Ads</span>
                            <span>Completed Ads</span>
                        </div>
                    </div>
                </div>
                <div className={styles.itemSection}>
                    {
                        userItems.length >0 && userItems.toReversed().map((item, index) => {
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
                                                    <img src={item.images[4]} alt="" />
                                                    <h6>{item.title}</h6>
                                                </div>
                                                <span>₹ {item.price}</span>
                                                <button>Active</button>
                                                <p>This ad is currently live</p>
                                            </div>
                                            <div className={styles.metaData}>
                                                <div>
                                                    <span>
                                                        <BsEyeFill />
                                                        <p>Views: 0</p>
                                                    </span>
                                                    <span>
                                                        <AiOutlineHeart />
                                                        <p>Likes: 0</p>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        })}
                </div>
            </div>
        </>
    )
}

export default myads