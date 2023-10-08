import React from 'react'
import styles from "@/styles/loadingChat.module.css"

const LoadingChat = () => {
    return (
        <>
            <div className={styles.loadingChat}>
                <div className={styles.imgBox}></div>
                <div className={styles.contentBox}>
                    <div className={styles.name}></div>
                    <div className={styles.prod}></div>
                </div>
            </div>
            <div className={styles.loadingChat}>
                <div className={styles.imgBox}></div>
                <div className={styles.contentBox}>
                    <div className={styles.name}></div>
                    <div className={styles.prod}></div>
                </div>
            </div>
            <div className={styles.loadingChat}>
                <div className={styles.imgBox}></div>
                <div className={styles.contentBox}>
                    <div className={styles.name}></div>
                    <div className={styles.prod}></div>
                </div>
            </div>
        </>
    )
}

export default LoadingChat