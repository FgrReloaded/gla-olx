import React from 'react'
import styles from "@/styles/contact.module.css"
import Image from 'next/image'

const contact = () => {
    return (
        <>
            <section className={styles.section}>
                <div className={styles.container}>
                    <div className={styles.contactInfo}>
                        <ul className={styles.info}>
                            <h2>Contact Info</h2>

                            <li>
                                <span><Image width={100} height={100}  src="/images/location.png" alt="" /></span>
                                <span>GLA</span>
                            </li>
                            <li>
                                <span><Image width={100} height={100}  src="/images/mail.png" alt="" /></span>
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
                                <li><a href=""><Image width={100} height={100}  src="/images/1.png" alt="" /></a></li>
                                <li><a href=""><Image width={100} height={100}  src="/images/5.png" alt="" /></a></li>
                                <li><a href=""><Image width={100} height={100}  src="/images/3.png" alt="" /></a></li>
                                <li><a href=""><Image width={100} height={100}  style={{ height: "28px" }} src="/images/whatsapp.png" alt="" /></a></li>
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