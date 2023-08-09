import React, { useRef, useState } from 'react'
import styles from "@/styles/Home.module.css"
import { Roboto } from "next/font/google"
import { IoIosArrowDropdownCircle, IoIosArrowForward } from "react-icons/io"
const roboto = Roboto({ subsets: ["latin"], weight: "300" })
const roboto1 = Roboto({ subsets: ["latin"], weight: "700" })
import Link from "next/link"

const Category = ({ setCategory }) => {
    const [rotate, setRotate] = useState(false)
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
    const ref = useRef(null)

    const showCategory = () => {
        let allLi = document.getElementsByTagName("li")
        setRotate(!rotate)
        let value = "none"
        if (!rotate) {
            value = "block"
        }
        for (let i = 0; i < allLi.length; i++) {
            if (i === 0) {
                allLi[i].style.display = !rotate ? "flex" : value
            } else {
                allLi[i].style.display = value
            }
        }
    }
    return (
        <>
            <section>
                <ul className={styles.category}>
                    <label onClick={showCategory} style={roboto1.style}><IoIosArrowForward className={`${rotate ? styles.rotateArrow : ""}`} /> Filter</label>
                    <li onClick={() => { ref.current.classList.toggle("hidden"); setCategory("") }} className={styles.dropDownParent}><a>ALL CATEGORIES</a> <IoIosArrowDropdownCircle />
                        <div ref={ref} className={`${styles.dropDown} hidden`}>
                            {categories &&
                                Object.keys(categories).map((category, i) => {
                                    return (
                                        <div key={i}>
                                            <Link href={`/category/${category}`}>
                                                <h3 style={roboto1.style}>{category}</h3>
                                            </Link>
                                            <div>
                                                {categories[category].map((item, index) => {
                                                    return (
                                                        <Link key={index} href={`/category/${category}#${item}`}>
                                                            <span style={roboto.style} key={index}>{item}</span>
                                                        </Link>
                                                    )
                                                })
                                                }
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </li>
                    <li><a onClick={(e) => { setCategory(e.target.innerText) }}>Lab Items</a></li>
                    <li><a onClick={(e) => { setCategory(e.target.innerText) }}>Room Items</a></li>
                    <li><a onClick={(e) => { setCategory(e.target.innerText) }}>Books</a></li>
                    <li><a onClick={(e) => { setCategory(e.target.innerText) }}>Sports Items</a></li>
                    <li><a onClick={(e) => { setCategory(e.target.innerText) }}>Gadgets</a></li>
                    <li><a onClick={(e) => { setCategory(e.target.innerText) }}>Accessories</a></li>
                    <li><a onClick={(e) => { setCategory(e.target.innerText) }}>Clothes</a></li>
                </ul>
            </section>
        </>
    )
}

export default Category