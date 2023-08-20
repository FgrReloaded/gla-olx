import React from 'react'
import styles from "@/styles/loadingComponent.module.css"

const LoadingComponent = () => {
    return (
        <>
            <div className={styles.card}>
                <div className={styles.imgBox}>

                </div>
                <div className={styles.contentBox}>
                    <div className={styles.price}></div>
                    <div className={styles.title}></div>
                    <div className={styles.desc}></div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.imgBox}>

                </div>
                <div className={styles.contentBox}>
                    <div className={styles.price}></div>
                    <div className={styles.title}></div>
                    <div className={styles.desc}></div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.imgBox}>

                </div>
                <div className={styles.contentBox}>
                    <div className={styles.price}></div>
                    <div className={styles.title}></div>
                    <div className={styles.desc}></div>
                </div>
            </div>
            <div className={styles.card}>
                <div className={styles.imgBox}>

                </div>
                <div className={styles.contentBox}>
                    <div className={styles.price}></div>
                    <div className={styles.title}></div>
                    <div className={styles.desc}></div>
                </div>
            </div>
        </>
    )
}

export default LoadingComponent
