import React, { useEffect, useState } from 'react'
import styles from "@/styles/navbar.module.css"
import Link from 'next/link'
import Cookies from 'js-cookie'
import { AiOutlinePlusCircle, AiOutlineHeart } from 'react-icons/ai'
import { BiHelpCircle, BiSpreadsheet } from 'react-icons/bi'
import { IoMdArrowDropdown } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import { Alice, Jost } from 'next/font/google'
const alice = Alice({ subsets: ["latin"], weight: "400" })
const jost = Jost({ subsets: ["latin"] })
import { signOut } from "firebase/auth";
import { auth } from "@/middleware/firebase"
import { useRouter } from 'next/navigation'


const Navbar = () => {
    const router = useRouter()
    const [currentUser, setCurrentUser] = useState()
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
                        <Link href={"/"}>
                        <img src='/images/logo.png' />
                        </Link>
                    </div>

                    <ul style={alice.style}>
                        <li><Link className={`${path === "/" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/"}>Home</Link>
                        </li>
                        <li><Link className={`${path === "/chat" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/chat"}>Contact Us</Link></li>
                        <li><Link className={`${path === "/chat" ? `${styles.active}` : ""} ${styles.navLinks}`} href={"/chat"}>About Us</Link></li>
                        {
                            currentUser &&

                            <li>
                                <div className={styles.userIcon}>
                                    <img src={profilePic} alt="profile" />
                                    <IoMdArrowDropdown onClick={() => { setShowDropdown(!showDropdown) }} id="dropdownDefaultButton" data-dropdown-toggle="dropdown" size={30} color='#fff' />
                                    {showDropdown &&
                                        <div className={styles.dropDown}>
                                            <div className={styles.userData} style={jost.style}>
                                                <div>
                                                    <img src={profilePic} alt="profile" />
                                                    <p>{displayName}</p>
                                                </div>
                                                <div>
                                                    <button>View profile</button>
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
                                                    <AiOutlineHeart size={20} /> <span>
                                                        <Link href={"/myads"}>
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
                        <li>
                            <Link className={`${path === "/sell" ? `${styles.active}` : ""} ${styles.seller}`} href={"/sell"}>
                                <div>
                                    Sell
                                    <AiOutlinePlusCircle />
                                </div>
                            </Link>
                        </li>
                        {!currentUser && (
                            <li><Link className={`${path === "/signup" ? `${styles.active}` : ""} ${styles.loginLink}`} href={"/signup"}>Login</Link></li>
                        )
                        }
                    </ul>
                </div>
            </nav>
        </>
    )
}

export default Navbar