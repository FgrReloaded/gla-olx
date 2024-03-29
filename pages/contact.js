import React from 'react'
import styles from "@/styles/contact.module.css"
import Image from 'next/image'
import Head from 'next/head'
import { BsWhatsapp, BsInstagram, BsTwitter, BsFacebook } from "react-icons/bs"

const contact = () => {
    return (
        <>
            <Head>
                <title>Contact Us</title>
            </Head>
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.contactInfo}>
                        <ul className={styles.info}>
                            <h2>Contact Info</h2>

                            <li>
                                <span><Image width={100} height={100} src="/images/location.png" alt="" /></span>
                                <span>GLA</span>
                            </li>
                            <li>
                                <span><Image width={100} height={100} src="/images/mail.png" alt="" /></span>
                                <span>gla-olxsupport@gmail.com</span>
                            </li>
                            <li>
                                <p>We are just one click away!
                                    We continously strive to enhance the user expreience.Tell us what we need to know.

                                </p>
                            </li>

                        </ul>
                        <div className={styles.socials}>
                            <h3>Socials:</h3>
                            <ul className={styles.socials}>
                                <li>
                                    <BsFacebook size={40} color='#fff' />
                                </li>
                                <li>
                                    <BsTwitter size={40} color='#fff' />

                                </li>
                                <li>
                                    <BsInstagram size={40} color='#fff' />
                                </li>
                                <li>
                                    <BsWhatsapp size={40} color='#fff' />
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className={styles.contactForm}>
                        <h2>Send a message</h2>
                        <div className={styles.formBox}>
                            <div className={`${styles.inputBox} ${styles.w50}`}>
                                <input type="text" required />
                                <span>First Name</span>
                            </div>
                            <div className={`${styles.inputBox} ${styles.w50}`}>
                                <input type="text" required />
                                <span>Last Name</span>
                            </div>
                            <div className={`${styles.inputBox} ${styles.w50}`}>
                                <input type="email" required />
                                <span>Email Address</span>
                            </div>
                            <div className={`${styles.inputBox} ${styles.w50}`}>
                                <input type="number" required />
                                <span>Mobile Number</span>
                            </div>
                            <div className={`${styles.inputBox} ${styles.w100}`}>
                                <textarea ></textarea>
                                <span>Write your message here...</span>
                            </div>
                            <div className={`${styles.inputBox} ${styles.w100}`}>
                                <input type="submit" value="Send" />
                            </div>
                        </div>
                    </div>
                </div>
            </section >
        </>
    )
}

export default contact