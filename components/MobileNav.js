import React from 'react'
import styles from "@/styles/mobileNav.module.css"
import Link from 'next/link'
import { BiHomeAlt2 } from 'react-icons/bi'
import { BsChat } from 'react-icons/bs'
import { AiOutlinePlus } from 'react-icons/ai'
import { CiViewList } from 'react-icons/ci'
import { usePathname } from 'next/navigation'
import {CgProfile} from 'react-icons/cg'



const MobileNav = () => {
    let location = usePathname();
    return (
        <>
            <div className={styles.mobileNav}>
                <ul>
                    <li>
                        <Link href={"/"} className={`${location === "/" ? styles.active : ""}`}>
                            <BiHomeAlt2 size={28} />
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href={"/chat"} className={`${location === "/chat" ? styles.active : ""}`}>
                            <BsChat size={28} />
                            Chat
                        </Link>
                    </li>
                    <li className={styles.sell}>
                        <Link href={"/sell"} className={`${location === "/sell" ? styles.active : ""}`}>
                            <AiOutlinePlus color='#0097b2' size={50} />
                            <p>
                                Sell
                            </p>
                        </Link>
                    </li>
                    <li>
                        <Link href={"/myads"} className={`${location === "/myads" ? styles.active : ""}`}>
                            <CiViewList size={28} />
                            My Ads
                        </Link>
                    </li>
                    <li>
                        <Link href={"/profile"} className={`${location === "/profile" ? styles.active : ""}`}>
                            <CgProfile size={28} />
                            Profile
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MobileNav