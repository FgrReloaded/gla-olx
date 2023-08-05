import React, { useRef } from 'react'
import styles from "@/styles/Home.module.css"
import { Roboto } from "next/font/google"
import { IoIosArrowDropdownCircle } from "react-icons/io"
const roboto = Roboto({ subsets: ["latin"], weight: "300" })
const roboto1 = Roboto({ subsets: ["latin"], weight: "700" })
import Link from "next/link"

const Category = ({ categories }) => {
    const ref = useRef(null)
    return (
        <>
            <section>
                <ul className={styles.category}>
                    <li className={styles.dropDownParent}><a>ALL CATEGORIES</a> <IoIosArrowDropdownCircle onClick={() => { ref.current.classList.toggle("hidden") }} />
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
                                                        <Link href={`/category/${category}#${item}`}>
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
                    <li><a>Chemistry Lab-Coats</a></li>
                    <li><a>ED-lab Stuff</a></li>
                    <li><a>Electronics Items</a></li>
                    <li><a>Student's Notes</a></li>
                    <li><a>Books</a></li>
                    <li><a>Posters</a></li>
                    <li><a>General Room Stuff</a></li>
                </ul>
            </section>
        </>
    )
}

export default Category