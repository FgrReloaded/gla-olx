import React from 'react'
import styles from "@/styles/card.module.css"
import { Alice } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
import { BsFillLightningChargeFill } from "react-icons/bs"
import Link from 'next/link'

const Card = ({ item }) => {
    return (
        <>
            <div className={styles.productBox}>
                <div className={styles.ribbon} ><BsFillLightningChargeFill /> Trending</div>
                <div className={styles.productImg}>
                    <img src={item.images[4]} alt="img" />
                </div>
                <div className={styles.productDetails}>
                    <div className={styles.productPrice}>
                        <span>₹ {item.price}</span>
                    </div>
                    <div className={styles.productTitle}>
                        <Link href={`/product/${item.title}?seller=${item.seller}&tempToken=${item._id}`}>
                            <h3>{item.title}</h3>
                        </Link>
                    </div>
                    <div className={styles.productDesc}>
                        <p>{item.desc}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card