import React, { useEffect, useState, useRef } from 'react'
import styles from "@/styles/navbar.module.css"
import Link from 'next/link'
import Cookies from 'js-cookie'
import { AiOutlinePlusCircle, AiOutlineHeart } from 'react-icons/ai'
import { BiHelpCircle, BiSpreadsheet } from 'react-icons/bi'
import { BsChatDots } from 'react-icons/bs'
import { IoMdArrowDropdown } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import { Alice, Jost, Poppins } from 'next/font/google'
const alice = Alice({ subsets: ["latin"], weight: "400" })
const jost = Jost({ subsets: ["latin"] })
const pop = Poppins({ subsets: ["latin"], weight: "400" })
import { signOut } from "firebase/auth";
import { auth } from "@/middleware/firebase"
import { useRouter } from 'next/router'
import Image from 'next/image'

const Navbar = () => {
    const ref = useRef();
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState()
    const [nav, setNav] = useState(false)
    const [showDropdown, setShowDropdown] = useState(false)
    const [profilePic, setProfilePic] = useState("/images/user.png")
    const [displayName, setDisplayName] = useState("")
    let path = usePathname();
    useEffect(() => {
        let userId = localStorage.getItem("currentUserId")
        let profilePic = localStorage.getItem("profilePic")
        if (profilePic) {
            setProfilePic(profilePic)
        }
        if (userId) {
            setCurrentUser(userId)
            setDisplayName(JSON.parse(Cookies.get(userId))[0].fullname)
        }
        router.events.on('routeChangeComplete', () => {
            setNav(false)
            setShowDropdown(false)
            if (ref.current) {
                ref.current.style.left = "100%";
            }
        })

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
    const showNav = () => {
        setNav(!nav)
        if (ref.current.style.left === "0%") {
            setShowDropdown(false)
            ref.current.style.left = "100%";
            return;
        }
        ref.current.style.left = "0%"
    }
    const visitProfile = () => {
        router.push("/profile")
    }

    return (
        <>
            <nav>
                <div className={styles.navWrapper}>
                    <div className={styles.logo}>
                        <Link href={"/"}>
                            <Image width={100} height={100} src='/images/mainLogo.png' />
                        </Link>
                    </div>
                    <div onClick={showNav} className={`${styles.toggle} ${nav ? styles.toggleActive : ""}`}></div>
                    {
                        currentUser ?
                            <Image width={50} onClick={visitProfile} className={styles.mobileProfile} height={50} loading='lazy' src={profilePic} alt="profile" /> :
                            <li className={`${styles.sellerBtn} ${styles.mobileSellerBtn}`}>
                                <Link className={styles.loginLink} href={"/signup"}>Login</Link>
                            </li>
                    }

                    <ul ref={ref} style={pop.style}>
                        <li><Link className={`${path === "/" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/"}>Home</Link>
                        </li>
                        <li><Link className={`${path === "/contact" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/contact"}>Contact Us</Link></li>
                        <li><Link className={`${path === "/about" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/about"}>About Us</Link></li>
                        {
                            currentUser &&
                            <li>
                                <div className={styles.userIcon}>
                                    <Image width={100} height={100} loading='lazy' src={profilePic} alt="profile" />
                                    <IoMdArrowDropdown onClick={() => { setShowDropdown(!showDropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" size={30} color='#fff' />
                                    {showDropdown &&
                                        <div className={styles.dropDown}>
                                            <div className={styles.userData}>
                                                <div>
                                                    <Image width={100} height={100} loading='lazy' src={profilePic} alt="profile" />
                                                    <p>{displayName}</p>
                                                </div>
                                                <div>
                                                    <Link href={"/editprofile"}>View profile</Link>
                                                </div>
                                            </div>
                                            <hr />
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <BiSpreadsheet size={20} /> <span>
                                                        <Link href={"/myads"}>
                                                            My Ads
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <BsChatDots size={20} /> <span>
                                                        <Link href={"/chat"}>
                                                            Inbox
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <AiOutlineHeart size={20} /> <span>
                                                        <Link href={"/wishlist"}>
                                                            My Wishlists
                                                        </Link>
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={styles.otherDrops}>
                                                <div>
                                                    <BiHelpCircle size={20} />
                                                    <span>Help</span>
                                                </div>
                                            </div>
                                            <hr />
                                            <div onClick={handleLogout} className={styles.otherDrops}>Logout</div>
                                        </div>
                                    }
                                </div>

                            </li>
                        }
                        <li className={styles.sellerBtn}>
                            <Link className={`${path === "/sell" ? `${styles.active}` : ""} ${styles.seller}`} href={"/sell"}>
                                <div>
                                    Sell
                                    <AiOutlinePlusCircle />
                                </div>
                            </Link>
                        </li>
                        {!currentUser && (
                            <li className={styles.sellerBtn}><Link className={`${path === "/signup" ? `${styles.active}` : ""} ${styles.loginLink}`} href={"/signup"}>Login</Link></li>
                        )
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar