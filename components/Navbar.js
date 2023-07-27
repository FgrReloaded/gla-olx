import React, { useEffect, useState } from 'react'
import styles from "@/styles/navbar.module.css"
import Link from 'next/link'
import Cookies from 'js-cookie'
import { AiOutlinePlusCircle } from 'react-icons/ai'
import { BsFillMarkdownFill } from 'react-icons/bs'
import { usePathname } from 'next/navigation'
import { Alice } from 'next/font/google'
const alice = Alice({ subsets: ["latin"], weight: "400" })
import { signOut } from "firebase/auth";
import { auth } from "@/middleware/firebase"
import { useRouter } from 'next/navigation'


const Navbar = () => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState()
    let path = usePathname();
    useEffect(() => {
        let userId = localStorage.getItem("currentUserId")
        if (userId) {
            setCurrentUser(userId)
        }
    }, [])


    if (path === "/signup") {
        return null
    }

    const handleLogout = () => {
        signOut(auth).then(() => {
            Cookies.remove(currentUser)
            localStorage.removeItem("currentUserId")
            localStorage.removeItem("profilePic")
            setCurrentUser(null)
            router.push("/")
        }).catch((error) => {
            console.log(error)
        });
    }


    return (
        <>
            <nav>
                <div className={styles.navWrapper}>
                    <div className={styles.logo}>
                        <img src='/images/logo.png' />
                    </div>

                    <ul style={alice.style}>
                        <li><Link className={`${path === "/" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/"}>Home</Link>
                        </li>
                        <li><Link className={`${path === "/chat" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/chat"}>Contact Us</Link></li>
                        <li><Link className={`${path === "/chat" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/chat"}>About Us</Link></li>
                        <li>
                            <Link className={`${path === "/sell" ? `${styles.active}` : ""} ${styles.seller}`} href={"/sell"}>
                                <div>
                                    Sell
                                    <AiOutlinePlusCircle />
                                </div>
                            </Link>
                        </li>
                        {!currentUser ? (
                            <li><Link className={`${path === "/signup" ? `${styles.active}` : ""} ${styles.loginLink}`} href={"/signup"}>Login</Link></li>
                        ) : (<li><div className={styles.loginLink} style={{ cursor: "pointer" }} onClick={handleLogout} >Logout</div></li>)
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar