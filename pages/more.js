import React, { useEffect, useState } from 'react'
import styles from "@/styles/moreMenu.module.css"
import Link from 'next/link'
import { AiOutlineHeart, AiOutlineMail } from 'react-icons/ai'
import { IoIosArrowForward } from 'react-icons/io'
import { BiHelpCircle } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { IoExitOutline } from 'react-icons/io5'
import { signOut } from "firebase/auth";
import { auth } from "@/middleware/firebase"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import Head from 'next/head'

const More = () => {
    const [currentUser, setCurrentUser] = useState("")
    useEffect(() => {
        let currentUserId = localStorage.getItem('currentUserId')
        if (currentUserId) {
            setCurrentUser(currentUserId)
        }
    }, [])

    const handleLogout = () => {
        signOut(auth).then(() => {
            Cookies.remove(currentUser)
            localStorage.removeItem("currentUserId")
            localStorage.removeItem("profilePic")
            setCurrentUser(null)
            window.location.href = "/"
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <>
            <Head>
                <title>
                    More Menu
                </title>
            </Head>
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
                            <li onClick={handleLogout}>
                                <button>Logout</button> <IoExitOutline size={30} color='var(--secondary)' />
                            </li> : ""
                    }
                </ul>
            </div>
        </>
    )
}

export default More