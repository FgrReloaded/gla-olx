import React from 'react'
import styles from '@/styles/footer.module.css'
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci'
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import { Open_Sans } from 'next/font/google'
import Link from 'next/link'
const os = Open_Sans({ subsets: ['latin'] })
import { usePathname } from 'next/navigation'
import Image from 'next/image'

const Footer = () => {
    let path = usePathname();

    if (path === "/signup") {
        return null
    }

    return (
        <>
            <footer>
                <div className={styles.footerWrapper}>
                    <div className={styles.content}>
                        <div className={styles.title}>GLA OLX</div>
                        <div className={styles.list}>
                            <ul>
                                <li><Link href={'/'}>Home</Link></li>
                                <li><Link href={'/editprofile'}>Profile</Link></li>
                                <li><Link href={'/help'}>Help</Link></li>
                                <li><Link href={"/about"}>About</Link></li>
                                <li><Link href={"/contact-us"}>Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>Follow Us</div>
                        <div className={styles.socialMedia}>
                            <div className={styles.iconList}>
                                <ul>
                                    <CiFacebook cursor={"pointer"} className={styles.icons} />
                                    <CiInstagram cursor={"pointer"} className={styles.icons} />
                                    <CiTwitter cursor={"pointer"} className={styles.icons} />
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.logo}>
                        <Image width={100} height={100} src="/images/logo.png" alt="logo" />
                    </div>
                    <div className={styles.copyright}>
                        <p>All rights reserved © 2023 GLA-OLX </p>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer