import Category from '@/components/Category'
import React, { useEffect, useState } from 'react'
import styles from '@/styles/Category.module.css'
import Link from 'next/link'
import { IoIosArrowForward } from "react-icons/io"
import mongoose from 'mongoose'
import Item from '@/models/Item'
import Card from '@/components/Card'
const category = ({ category, items }) => {
    const [subCat, setSubCat] = useState("")
    const categories = {
        "Lab Items": ["Lab-Coats", "ED-lab Stuffs"],
        "Room Items": ["Posters", "Lights", "General Room Stuffs"],
        "Books": ["Course Books", "Novels", "Others"],
        "Sports Items": ["Cricket", "Badminton", "Volleyball", "Football", "Table Tennis", "Basketball"],
        "Gadgets": ["Mobiles", "Laptops", "Headphones", "Speakers", "Others"],
        "Accessories": ["Bags", "Watches", "Wallets", "Belts", "Sunglasses", "Others"],
        "Clothes": ["T-Shirts", "Shirts", "Jeans", "Jackets", "Others"],
        "Others": ["Others"],
    }


    return (
        <>
            <Category />
            <section>
                <div className={styles.heading}>
                    <Link href={"/"}>Home</Link>
                    <h3>{category}</h3>
                </div>
                <div className={styles.container}>
                    <div className={styles.categorySection}>
                        <h5>Categories</h5>
                        <div>
                            <h4 onClick={() => { setSubCat("") }}><IoIosArrowForward /> {category}</h4>
                            <ul>
                                {
                                    items && categories[category].map((item, i) => {
                                        return (
                                            <li key={i} onClick={() => { setSubCat(item) }}>
                                                {item}
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                    <div className={styles.itemSection}>
                        {
                            items && items.map((item, i) => {
                                if (item.subCategory.toLowerCase().includes(subCat.toLowerCase())) {
                                    return (
                                        <Card item={item} key={i} />
                                    )
                                }
                            })
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export async function getServerSideProps(context) {
    const { category } = context.params
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGODB_URI)
    }
    let items = await Item.find({ category })

    return {
        props: {
            category, items: JSON.parse(JSON.stringify(items))
        }
    }
}

export default category