import React from 'react'
import styles from '@/styles/about.module.css'
import Head from 'next/head'
const about = () => {
    return (
        <>
            <Head>
                <title>
                    About Us
                </title>
            </Head>
            <div className={styles.aboutUs}>
                <div className={styles.left}>
                    <img src="/images/newLogo.png" alt="" />
                </div>
                <div className={styles.right}>
                    <h1>ABOUT US</h1>
                    <p>
                        About GLA OLX

                        Welcome to GLA OLX, your premier online marketplace tailored specifically for college students. At GLA OLX, we understand the unique needs and lifestyles of students, and we&#39;ve created a platform that makes buying and selling items a breeze. <br />Our mission is to simplify the college experience by providing a convenient and safe platform for students to buy and sell items they need, whether it&#39;s textbooks, electronics, furniture, or even event tickets. We aim to foster a vibrant online community where students can connect, save money, and reduce their environmental footprint by reusing and recycling items.
                    </p>
                </div>
            </div>
            <div className={styles.ourTeamWrap}>
                <h1>OUR TEAM</h1>
                <div className={styles.ourTeam}>

                    <div className={styles.card}>
                        <img src="/images/shashank.jpg" alt="" />
                        <div className={styles.info}>
                            <h3>Shashank Shekhar Pandey</h3>
                            <p>UI/UX,Frontend Developer</p>
                        </div>
                    </div>
                    <div className={styles.card}>
                        <img src="/images/nitish.jpg" alt="" />
                        <div className={styles.info}>
                            <h3>Nitish Singh</h3>
                            <p>Full Stack Developer</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default about