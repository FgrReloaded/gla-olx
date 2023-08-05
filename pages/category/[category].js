import Category from '@/components/Category'
import React from 'react'
import styles from '@/styles/Category.module.css'
import Link from 'next/link'
const category = () => {
    return (
        <>
            <Category />
            <section>
                <div className={styles.heading}>
                    <Link href={"/"}>Home</Link>
                </div> 
                <div className={styles.container}>
                    <div className={styles.categorySection}>

                    </div>
                    <div className={styles.itemSection}>

                    </div>
                </div>
            </section>
        </>
    )
}

export default category