import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import styles from "@/styles/singleProduct.module.css"
import { Alice, Noto_Sans } from 'next/font/google'
import { AiOutlineShareAlt, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { TbListDetails, TbEyeCheck } from "react-icons/tb"
import { FaRegHandshake } from "react-icons/fa"
import { IoIosArrowForward } from "react-icons/io"
import Card from '@/components/Card'
import mongoose from 'mongoose'
import Item from '@/models/Item'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const alice = Alice({ subsets: ['latin'], weight: "400" })
const noto = Noto_Sans({ subsets: ['latin'], weight: "400" })

const item = ({ item, similarItems, seller }) => {
    const router = useRouter()
    const [diff, setDiff] = useState("")
    const [currentWishlist, setCurrentWishlist] = useState("")
    useEffect(() => {
        checkWishlist()
        let today = new Date()
        let createdAt = new Date(item.createdAt)
        let diff = today - createdAt
        let mins = Math.floor(diff / (1000 * 60))
        let hours = Math.floor(diff / (1000 * 60 * 60))
        let days = Math.floor(hours / 24)
        if (days < 1) {
            if (hours < 1) {
                setDiff(`${mins} mins ago`)
            } else {
                setDiff(`${hours} hours ago`)
            }
        } else {
            setDiff(`${days} days ago`)
        }

    }, [])
    const [hide, setHide] = useState(true)
    let images = item.images
    const [mainSlider, setMainSlider] = useState(images[4])

    const handleSeller = (seller) => {
        let currentUser = localStorage.getItem("currentUserId")
        router.push(`/chat?currentUser=${currentUser}&userTempToken=${seller}&item=${item.title}&itemPrice=${item.price}`)
    }

    const handleSlider = (e) => {
        let direct = e.target.getAttribute("direct")
        if (direct === "left") {
            let index = images.indexOf(mainSlider)
            if (index === 0) {
                setMainSlider(images[images.length - 1])
            } else {
                setMainSlider(images[index - 1])
            }
        } else {
            let index = images.indexOf(mainSlider)
            if (index === images.length - 1) {
                setMainSlider(images[0])
            } else {
                setMainSlider(images[index + 1])
            }
        }
    }

    const copyLink = () => {
        let link = window.location.href
        navigator.clipboard.writeText(link)
    }

    const handleWishlist = async () => {
        let userId = localStorage.getItem("currentUserId")
        let product = {
            seller: item.seller,
            productId: item._id,
            title: item.title,
            price: item.price,
            images: item.images[4]
        }
        if (hide) {
            let res = await fetch("/api/wishlist", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, productId: item._id, product })
            })
            let data = await res.json()
            if (data.success) {
                setHide(false)
            } else {
                alert("Item already in wishlist")
            }
        }
        else {
            let res = await fetch(`/api/wishlist?id=${currentWishlist}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            let data = await res.json()
            if (data.success) {
                setHide(true)
            } else {
                alert("Item not in wishlist")
            }
        }
    }

    const checkWishlist = async () => {
        let userId = localStorage.getItem("currentUserId")
        let productId = item._id
        let res = await fetch("/api/wishlist?userId=" + userId + "&productId=" + productId)
        let data = await res.json()
        if (data.success) {
            setCurrentWishlist(data.data[0]._id)
            setHide(false)
        } else {
            setHide(true)
        }
    }


    return (
        <>
            <Head>
                <title>{item.title}</title>
            </Head>
            <div className={styles.container}>
                <ul>
                    <li>
                        <Link href={"/"}>
                            <span>Home <IoIosArrowForward size={15} color='#20494E' /> </span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${item.category}`}>
                            <span>{item.category} <IoIosArrowForward size={15} color='#20494E' /></span>
                        </Link>
                    </li>
                    <li>
                        <Link href={`/${item.subCategory}`}>
                            <span>{item.subCategory} <IoIosArrowForward size={15} color='#20494E' /></span>
                        </Link>
                    </li>
                    <li>
                        <span>{item.title}</span>
                    </li>
                </ul>
            </div>

            <div className={styles.box} style={alice.style}>
                <div className={styles.innerBox}>
                    <div className={styles.sliderBox}>
                        <div className={styles.sliderElement}>
                            <img src={mainSlider} alt="img" />
                        </div>
                        <img src='/images/arr.png' className={styles.left} direct="left" onClick={handleSlider} />
                        <img src='/images/arr.png' className={styles.right} direct="right" onClick={handleSlider} />
                    </div>
                    <div className={styles.imgBox}>
                        <img src={images[0]} alt={images[0]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img src={images[1]} alt={images[1]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img src={images[2]} alt={images[2]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img src={images[3]} alt={images[3]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                    </div>
                    <div className={styles.itemBox}>
                        <div className={styles.item1}>
                            <div className={styles.price}>
                                <span style={noto.style}>₹{item.price}</span>
                                {
                                    seller === item.seller ? null :
                                        <span> <AiOutlineShareAlt onClick={copyLink} size={30} /> <AiOutlineHeart onClick={handleWishlist} style={{ display: !hide ? "none" : "block" }} size={30} /> <AiFillHeart onClick={handleWishlist} style={{ display: hide ? "none" : "block" }} size={30} color='red' /> </span>
                                }
                            </div>
                            <div style={noto.style} className={styles.title}>
                                Product: {item.title}
                            </div>
                            <div style={noto.style}>
                                Added: {diff}
                            </div>
                        </div>
                        <div className={styles.item2}>
                            <div className={styles.profile}>
                                <div>
                                    <img src="/images/item1.jpg" alt="img" />
                                </div>
                                <div style={noto.style}>
                                    {item.sellerName} <IoIosArrowForward color='#BBBEBF' size={25} />
                                </div>
                            </div>
                            {
                                seller === item.seller ? null :
                                    <button onClick={() => { handleSeller(item.seller) }} className={styles.buttonChat} style={noto.style}>
                                        Chat with seller
                                    </button>
                            }
                        </div>
                        <div className={styles.item3} style={noto.style}>
                            <div>
                                <TbListDetails color='#949B9D' size={30} />
                                <span>Get all details</span>
                            </div>
                            <div>
                                <TbEyeCheck color='#949B9D' size={30} />
                                <span>See What You Buy</span>
                            </div>
                            <div>
                                <FaRegHandshake color='#949B9D' size={30} />
                                <span>Negotiate with seller</span>
                            </div>
                        </div>
                    </div>

                    <div className={styles.detailsBox} style={alice.style}>
                        <div className={styles.details}>
                            <h4>Product Details:</h4>
                            <div className={styles.productInfo}>
                                <div>
                                    <span>Type</span>
                                    <span>Category</span>
                                </div>
                                <div>
                                    <span>{item.category}</span>
                                    <span>{item.subCategory}</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <h4>Description:</h4>
                            <p>
                                {item.desc}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {
                similarItems.length > 0 &&
                <div className={styles.similarItemsBox}>
                    <div className={styles.similarItems}>
                        <h4>People also look for:</h4>
                        <div className={styles.products}>
                            {
                                similarItems.map((item) => {
                                    return (
                                        <Card key={item._id} item={item} />
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            }

        </>
    )
}

export async function getServerSideProps(context) {
    if (!mongoose.connections[0].readyState) {
        await mongoose.connect(process.env.MONGODB_URI)
    }
    const { seller, tempToken } = context.query
    let items = await Item.findOne({ seller, _id: tempToken })
    let similarProduct = await Item.find({ category: items.category })
    similarProduct = similarProduct.filter((item) => {
        return item._id.toString() !== items._id.toString()
    })

    return { props: { item: JSON.parse(JSON.stringify(items)), similarItems: JSON.parse(JSON.stringify(similarProduct)), seller } }
}

export default item