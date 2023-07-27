import React from 'react'
import styles from "@/styles/card.module.css"
import { Alice } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
import { BsFillLightningChargeFill } from "react-icons/bs"

const Card = () => {
    return (
        <>
            <div className={styles.productBox}>
                <div className={styles.ribbon} ><BsFillLightningChargeFill /> Trending</div>
                <div className={styles.productImg}>
                    <img src="/images/item1.jpg" alt="img" />
                </div>
                <div className={styles.productDetails}>
                    <div className={styles.productPrice}>
                        <span>₹ 1099</span>
                    </div>
                    <div className={styles.productTitle}>
                        <h3>stay</h3>
                    </div>
                    <div className={styles.productDesc}>
                        <p>Lorem ipsum dolor sit ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
            <div className={styles.productBox}>
                <div className={styles.ribbon} ><BsFillLightningChargeFill /> Trending</div>

                <div className={styles.productImg}>
                    <img src="/images/item2.jpg" alt="img" />
                </div>
                <div className={styles.productDetails}>

                    <div className={styles.productPrice}>
                        <span>₹ 1099</span>
                    </div>
                    <div className={styles.productTitle}>
                        <h3>seeing</h3>
                    </div>
                    <div className={styles.productDesc}>
                        <p>Lorem ipsum dolor sit ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
            <div className={styles.productBox}>
                <div className={styles.ribbon} ><BsFillLightningChargeFill /> Trending</div>

                <div className={styles.productImg}>
                    <img src="/images/item3.jpg" alt="img" />
                </div>
                <div className={styles.productDetails} >

                    <div className={styles.productPrice}>
                        <span>₹ 1099</span>
                    </div>
                    <div className={styles.productTitle}>
                        <h3>park</h3>
                    </div>
                    <div className={styles.productDesc}>
                        <p>Lorem ipsum dolor sit ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
            <div className={styles.productBox}>
                <div className={styles.ribbon} ><BsFillLightningChargeFill /> Trending</div>

                <div className={styles.productImg}>
                    <img src="/images/item4.jpg" alt="img" />
                </div>
                <div className={styles.productDetails}>

                    <div className={styles.productPrice}>
                        <span>₹ 1099</span>
                    </div>
                    <div className={styles.productTitle}>
                        <h3>time</h3>
                    </div>
                    <div className={styles.productDesc}>
                        <p>Lorem ipsum dolor sit ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card