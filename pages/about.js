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
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione omnis sapiente laborum at beatae molestiae ipsum, recusandae laudantium cumque quae facere itaque reprehenderit repellendus quis, saepe animi impedit maxime odit quibusdam alias ex est. Quas veniam et placeat voluptates at ipsa modi quibusdam maxime corporis enim iusto, velit nostrum distinctio tenetur esse ullam ipsum ab. Nisi harum vitae placeat maxime mollitia quidem aliquam inventore veniam minima nobis, suscipit dicta enim aliquid autem ab error iusto. Voluptatem, cum eum.</p>
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