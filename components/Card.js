import React from 'react'
import styles from "@/styles/card.module.css"
import { Lato, Poppins, Montserrat } from "next/font/google"
const lato = Lato({ subsets: ["latin"], weight: "700" })
const pop = Poppins({ subsets: ["latin"], weight: "700" })
const mons = Montserrat({ subsets: ["latin"], weight: "400" })
import { BsFillLightningChargeFill } from "react-icons/bs"
import Link from 'next/link'
import Image from 'next/image'

const Card = ({ item }) => {
    return (
        <>
            <Link href={`/product/${item.title}?seller=${item.seller}&tempToken=${item._id ? item._id : item.productId}`} className={styles.productBox}>
                {/* <div className={styles.ribbon} ><BsFillLightningChargeFill /> Trending</div> */}
                <div className={styles.productImg}>
                    <Image src={Array.isArray(item.images) ? item.images[4] : item.images} alt="img" width={100} height={100} />
                </div>
                <div className={styles.productDetails}>
                    <div style={pop.style} className={styles.productPrice}>
                        <span>₹ {item.price}</span>
                    </div>
                    <div style={lato.style} className={styles.productTitle}>
                        <Link href={`/product/${item.title}?seller=${item.seller}&tempToken=${item._id ? item._id : item.productId}`}>
                            <h3>{
                                item.title.length > 28 ? item.title.substring(0, 28) + "..." : item.title
                            }</h3>
                        </Link>
                    </div>
                    <div style={mons.style} className={styles.productDesc}>
                        <p>
                            {
                                item.desc && item.desc.length > 50 ? item.description.substring(0, 50) + "..." : item.desc
                            }
                        </p>
                    </div>
                </div>
            </Link>

        </>
    )
}

export default Card