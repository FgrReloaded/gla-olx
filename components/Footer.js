import React from 'react'
import styles from '@/styles/footer.module.css'
import { CiFacebook, CiInstagram, CiTwitter } from 'react-icons/ci'
import {AiOutlinePhone, AiOutlineMail} from   'react-icons/ai'
import { Open_Sans } from 'next/font/google'
import Link from 'next/link'
const os = Open_Sans({ subsets: ['latin'] })

const Footer = () => {


    return (
        <>
            <footer>
                <div className={styles.footerWrapper}>
                    <div className={styles.content}>
                        <div className={styles.title}>GLA OLX</div>
                        <div className={styles.list}>
                            <ul>
                                <li><Link href={'/'}>Home</Link></li>
                                <li><Link href={'/account'}>Account</Link></li>
                                <li><Link href={'/help'}>Help</Link></li>
                                <li><Link href={"/about"}>About</Link></li>
                                <li><Link href={"/"}>Contact Us</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <div className={styles.title}>Follow Us</div>
                        <div className={styles.socialMedia}>
                            <div className={styles.iconList}>
                                <ul>
                                    <CiFacebook className={styles.icons}/>
                                    <CiInstagram className={styles.icons}/>
                                    <CiTwitter className={styles.icons}/>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={styles.footerBottom}>
                    <div className={styles.logo}>
                        <img src="/images/logo.png" alt="logo" />
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