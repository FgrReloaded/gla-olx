import React, { useState } from 'react'
import Head from 'next/head'
import styles from "@/styles/singleProduct.module.css"
import { Oswald, Alice, Noto_Sans } from 'next/font/google'
const oswald = Oswald({ subsets: ['latin'] })
const alice = Alice({ subsets: ['latin'], weight: "400" })
const noto = Noto_Sans({ subsets: ['latin'], weight: "400" })
import { AiOutlineShareAlt, AiOutlineHeart, AiFillHeart } from "react-icons/ai"
import { BsArrowRightCircleFill } from "react-icons/bs"
import { TbListDetails, TbEyeCheck } from "react-icons/tb"
import { FaRegHandshake } from "react-icons/fa"
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import Card from '@/components/Card'
import { motion } from "framer-motion"

const item = () => {
    const [hide, setHide] = useState(true)
    let images = ["/images/item1.jpg", "/images/item2.jpg", "/images/item3.jpg", "/images/item4.jpg", "/images/item5.jpg"]
    const [mainSlider, setMainSlider] = useState(images[0])

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

    return (
        <>
            <Head>
                <title>Hacker T-Shirt</title>
            </Head>
            <div className={styles.container}>
                <ul>
                    <li>
                        <span>Home <IoIosArrowForward size={15} color='#20494E'/> </span>
                    </li>
                    <li>
                        <span>Product <IoIosArrowForward size={15} color='#20494E'/></span>
                    </li>
                    <li>
                        <span>Category <IoIosArrowForward size={15} color='#20494E'/></span>
                    </li>
                    <li>
                        <span>Item</span>
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
                        <img src={images[1]} alt={images[1]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img src={images[2]} alt={images[2]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img src={images[3]} alt={images[3]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                        <img src={images[4]} alt={images[4]} onClick={(e) => { setMainSlider(e.target.alt) }} />
                    </div>
                    <div className={styles.itemBox}>
                        <div className={styles.item1}>
                            <div className={styles.price}>
                                <span style={noto.style}>₹1099</span>
                                <span> <AiOutlineShareAlt size={30}/> <AiOutlineHeart onClick={()=>{setHide(!hide)}} style={{display: !hide?"none":"block"}} size={30} /> <AiFillHeart onClick={()=>{setHide(!hide)}} style={{display: hide?"none":"block"}} size={30} color='red' /> </span>
                            </div>
                            <div style={noto.style} className={styles.title}>
                                Product: Hacker T-shirt
                            </div>
                            <div style={noto.style}>
                                Added: 1 Day Ago
                            </div>
                        </div>
                        <div className={styles.item2}>
                            <div className={styles.profile}>
                                <div>
                                    <img src="/images/item1.jpg" alt="img" />
                                </div>
                                <div style={noto.style}>
                                    Nitish Kumar <IoIosArrowForward color='#BBBEBF' size={25} />
                                </div>
                            </div>
                            <button className={styles.buttonChat} style={noto.style}>
                                Chat with seller
                            </button>
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
                                    <span>Brand</span>
                                </div>
                                <div>
                                    <span>Image</span>
                                    <span>Hacker</span>
                                </div>
                            </div>
                        </div>
                        <div className={styles.details}>
                            <h4>Description:</h4>
                            <p>
                                Yourself map understanding noun personal ourselves studied fair test shout cup had surprise came industrial built idea victory something dust hurry ancient garden brief
                                against full disappear frequently gate progress such birds arrangement hot health brain replace pole cut you quickly cell cave pencil pen exciting college expect
                                against full disappear frequently gate progress such birds arrangement hot health brain replace pole cut you quickly cell cave pencil pen exciting college expect
                                against full disappear frequently gate progress such birds arrangement hot health brain replace pole cut you quickly cell cave pencil pen exciting college expect
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.similarItemsBox}>
                <div className={styles.similarItems}>
                    <h4>People also look for:</h4>
                    <div className={styles.products}>
                        <Card />
                    </div>
                </div>
            </div>

        </>
    )
}

export default item