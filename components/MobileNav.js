import React from 'react'
import styles from "@/styles/mobileNav.module.css"
import Link from 'next/link'
import { BiHomeAlt2 } from 'react-icons/bi'
import { BsChatLeftDots } from 'react-icons/bs'
import { AiOutlinePlus, AiOutlineUnorderedList } from 'react-icons/ai'
import { CiViewList } from 'react-icons/ci'
import { usePathname } from 'next/navigation'
import { FiMoreHorizontal } from 'react-icons/fi'



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
                            <BsChatLeftDots size={26} />
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
                            <AiOutlineUnorderedList size={28} />
                            My Ads
                        </Link>
                    </li>
                    <li>
                        <Link href={"/more"} className={`${location === "/more" ? styles.active : ""}`}>
                            <FiMoreHorizontal size={28} />
                            More
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default MobileNav