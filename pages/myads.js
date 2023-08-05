import React from 'react'
import styles from "@/styles/Myads.module.css"
import { AiOutlineSearch,AiOutlineHeart } from "react-icons/ai"
import { BsEyeFill } from "react-icons/bs"

const myads = () => {
    return (
        <>
            <div className={styles.section}>
                <div className={styles.upperSection}>
                    <div className={styles.search}>
                        <AiOutlineSearch />
                        <input type="text" placeholder="Search by ad title" />
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
                    <div className={styles.item}>
                        <div className={styles.date}>
                            <span>
                                <p> From </p>
                                <strong>
                                    August 4, 2023
                                </strong>
                            </span>
                            <span>
                                <p> To </p>
                                <strong>
                                    July 4, 2023
                                </strong>
                            </span>
                        </div>
                        <div className={styles.productData}>
                            <div className={styles.details}>
                                <div>
                                    <img src="/images/item1.jpg" alt="" />
                                    <h6>Product Name</h6>
                                </div>
                                <span>Rs. 1000</span>
                                <button>Active</button>
                                <p>This ad is currently live</p>
                            </div>
                            <div className={styles.metaData}>
                                <div>
                                    <span>
                                        <BsEyeFill/>
                                        <p>Views: 0</p>
                                    </span>
                                    <span>
                                        <AiOutlineHeart/>
                                        <p>Likes: 0</p>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default myads