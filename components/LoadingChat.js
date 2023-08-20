import React from 'react'
import styles from "@/styles/chat.module.css"

const LoadingChat = () => {
    return (
        <>
            <div className={styles.loadingChat}>
                <div className={styles.img}></div>
                <div className={styles.contentBox}>
                    <div className={styles.name}></div>
                    <div className={styles.prod}></div>
                </div>
            </div>
        </>
    )
}

export default LoadingChat