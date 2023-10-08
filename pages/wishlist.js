import React, { useEffect, useState } from 'react'
import styles from "@/styles/wishlist.module.css"
import Card from '@/components/Card'
import NoItem from '@/components/NoItem'
import LoadingComponent from '@/components/LoadingComponent'
import Head from 'next/head'

const Wishlist = () => {
    const [wishlist, setWishlist] = useState([])
    const [showSkeleton, setShowSkeleton] = useState(false)
    useEffect(() => {
        let currentUser = localStorage.getItem("currentUserId");
        getWishList(currentUser);
    }, [])

    const getWishList = async (userId) => {
        setShowSkeleton(true)
        let res = await fetch(`/api/wishlist?userId=${userId}`);
        let { data } = await res.json();
        if (data) {
            setWishlist(data);
            setShowSkeleton(false)
        }
    }


    return (
        <>
        <Head>
            <title>
                Wishlist
            </title>
        </Head>
            <div className={styles.section}>
                <div>
                    <h4>My Wishlist</h4>
                </div>
                <hr />
                {
                    wishlist.length === 0 ? <NoItem message={"No items in wishlist"} /> :
                        <div className={styles.productList}>
                            {
                                wishlist.length > 0 && wishlist.map((item, index) => {
                                    return <Card key={index} item={item.product} />
                                })
                            }
                            {showSkeleton && <LoadingComponent />}

                        </div>
                }
            </div>
        </>
    )
}

export default Wishlist