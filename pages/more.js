import React, { useEffect, useState } from 'react'
import styles from "@/styles/moreMenu.module.css"
import Link from 'next/link'
import { AiOutlineHeart, AiOutlineMail } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { BiHelpCircle } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { IoExitOutline } from 'react-icons/io5'

const More = () => {
    const [currentUser, setCurrentUser] = useState("")
    useEffect(() => {
        let currentUserId = localStorage.getItem('currentUserId')
        if (currentUserId) {
            setCurrentUser(currentUserId)
        }

    }, [])

    return (
        <>
            <div className={styles.container}>
                <ul>
                    {
                        currentUser !== "" ?
                            <li>
                                <AiOutlineHeart size={35} />  <Link href="/wishlist">Wishlist</Link> <IoIosArrowForward size={40} />
                            </li> : ""
                    }
                    <li>
                        <BiHelpCircle size={35} />  <Link href="/help">Help</Link> <IoIosArrowForward size={40} />

                    </li>
                    <li>
                        <BsPeople size={35} />  <Link href="/about">About</Link> <IoIosArrowForward size={40} />

                    </li>
                    <li>
                        <AiOutlineMail size={35} />  <Link href="/contact">Contact Us</Link> <IoIosArrowForward size={40} />

                    </li>
                    {
                        currentUser !== "" ?
                            <li>
                                <button>Logout</button> <IoExitOutline size={30} color='var(--secondary)' />
                            </li> : ""
                    }
                </ul>
            </div>
        </>
    )
}

export default More