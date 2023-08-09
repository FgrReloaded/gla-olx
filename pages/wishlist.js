import React, { useEffect, useState } from 'react'
import styles from "@/styles/wishlist.module.css"
import Card from '@/components/Card'

const wishlist = () => {
    const [wishlist, setWishlist] = useState([])
    useEffect(() => {
        let currentUser = localStorage.getItem("currentUserId");
        getWishList(currentUser);
    }, [])

    const getWishList = async (userId) => {
        let res = await fetch(`/api/wishlist?userId=${userId}`);
        let { data } = await res.json();
        if (data) {
            setWishlist([data[0].product]);
        }
    }


    return (
        <>
            <div className={styles.section}>
                <div>
                    <h4>My Wishlists</h4>
                </div>
                <hr />
                <div className={styles.productList}>
                    {
                        wishlist && wishlist.map((item, index) => {
                            return <Card key={index} item={item} />
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default wishlist