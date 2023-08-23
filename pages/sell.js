import React, { useEffect, useRef, useState, useContext } from 'react'
import styles from "@/styles/sell.module.css"
import { BiImageAdd } from "react-icons/bi"
import { AiOutlineCloseCircle, AiFillCloseCircle } from "react-icons/ai"
import { IoIosArrowForward } from "react-icons/io"
import glxContext from '../context/glxContext'
import { CldUploadWidget } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Head from 'next/head'
import { Roboto } from "next/font/google"
import Image from 'next/image'
const roboto = Roboto({ subsets: ["latin"], weight: "400" })

const Sell = () => {
  const [productData, setProductData] = useState({ title: "", desc: "", price: "", category: "", subCategory: "", sellerName: "" })
  const category = {
    "Lab Items": ["Lab-Coats", "ED-lab Stuff"],
    "Room Items": ["Posters", "Lights", "General Room Stuff"],
    "Books": ["Course Books", "Novels", "Others"],
    "Sports Items": ["Cricket", "Badminton", "Volleyball", "Football", "Table Tennis", "Basketball"],
    "Gadgets": ["Mobiles", "Laptops", "Headphones", "Speakers", "Others"],
    "Accessories": ["Bags", "Watches", "Wallets", "Belts", "Sunglasses", "Others"],
    "Clothes": ["T-Shirts", "Shirts", "Jeans", "Jackets", "Others"],
    "Others": ["Others"],
  }
  const [categoryList, setCategoryList] = useState([])
  const [profilePic, setprofilePic] = useState("")
  const router = useRouter()
  const [userData, setUserData] = useState([])
  const [files, setFiles] = useState([])
  const [width, setWidth] = useState(80)
  const [height, setHeight] = useState(80)
  const [coverSrc, setCoverSrc] = useState("/images/addImage.png")
  const [coverFile, setCoverFile] = useState(null)
  const ref = useRef(null);
  const ref1 = useRef(null);
  const context = useContext(glxContext);
  const { createItem, showSkeleton } = context;

  const handleSubmit = (e) => {
    e.preventDefault()
    let { title, desc, price, category, subCategory, sellerName } = productData;
    sellerName = userData[0].fullname
    let seller = localStorage.getItem("currentUserId")

    let coverImg = coverFile;
    let images = files.slice(0, 4);
    images.push(coverImg)
    createItem({ title, desc, price, category, subCategory, seller, sellerName, images, sellerPic: profilePic })
  }

  useEffect(() => {
    let currentUserId = localStorage.getItem("currentUserId")
    if (!currentUserId) {
      router.push("/signup")
    }

    let userData = Cookies.get(currentUserId)
    if (userData) {
      setUserData(JSON.parse(userData))
    }

    let profilePi = localStorage.getItem("profilePic")
    if (profilePi) {
      setprofilePic(profilePi)
    }
  }, [])

  const handleCoverFile = (e) => {
    let file = e.target.files[0]
    setCoverFile(file)
    e.target.previousSibling.classList.remove("hidden")
    let url = URL.createObjectURL(file)
    setCoverSrc(url)
    setWidth("100%")
    setHeight("100%")
  }

  const handleImageFiles = (e) => {
    let file = e.target.files
    setFiles([...files, ...file])
  }

  const removeImg = (e) => {
    let order = e.target.parentElement.getAttribute("order")
    let newFiles = files.filter((file, index) => index != order)
    setFiles(newFiles)
  }
  const removeCover = (e) => {
    setCoverSrc("/images/addImage.png");
    setCoverFile(null);
    e.target.classList.add("hidden")
    setWidth(80)
    setHeight(80)
  }


  const handleMiniImageUpload = (e) => {
    e.preventDefault()
    ref1.current.click()
  }



  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value })
  }


  const handleCategories = (e) => {
    let categoryValue = e.target.getAttribute("value");
    if (!categoryValue) {
      categoryValue = e.target.parentElement.getAttribute("value");
    }
    setProductData({ ...productData, category: categoryValue })
    setCategoryList(category[categoryValue])
  }

  return (
    <>
      <Head>
        <title>Sell - GLA-OLX.com</title>
      </Head>
      <header className={styles.header}>
        <h1>CREATE YOUR AD</h1>
      </header>
      {productData.subCategory.length > 0

        &&
        <section className={styles.section}>
          <div style={{ padding: "2rem" }}>

            <h2 className={styles.h2}>ADD COVER PHOTO:</h2>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <div className={styles.add_image} style={{ cursor: "pointer" }} onClick={() => { ref.current.click() }}>
                <span className={`hidden ${styles.removeImg}`} onClick={removeCover}>x</span>
                <input type="file" onChange={handleCoverFile} accept='image/*' ref={ref} style={{ display: "none" }} />
                <Image src={coverSrc} width={80} style={{ height: height, width: width, cursor: "pointer" }} height={80} />
              </div>
            </div>
          </div>
          <div style={{ padding: "2rem" }}>

            <h2 className={styles.h2}>Upload Upto 4 Images:</h2>
            <div className={styles.more_imgs}>
              <input type="file" onChange={handleImageFiles} accept='image/*' multiple ref={ref1} style={{ display: "none" }} />
              {
                files.length > 0 && (files.slice(0, 4).map((file, index) => {
                  return (
                    <div key={index} order={index}>
                      <Image width={100} height={95} src={URL.createObjectURL(file)} style={{ width: "100px", height: "95px", cursor: "default" }} />
                      <span className={styles.removeImg} onClick={removeImg}>x</span>
                    </div>
                  )
                })
                )
              }
              {
                files.length < 4 && (
                  <div>
                    <Image src="/images/addImage.png" className='smallImg' onClick={handleMiniImageUpload} width={30} height={30} />
                  </div>
                )
              }
              {
                files.length === 0 && (
                  <>
                    <div style={{ borderStyle: "dotted" }}>
                    </div>
                    <div style={{ borderStyle: "dotted" }}>
                    </div>
                    <div style={{ borderStyle: "dotted" }}>
                    </div>
                  </>
                )
              }
            </div>
          </div>
          <br />
          <hr />
          <div style={{ padding: "2rem" }}>

            <h2 className={styles.h2}>Include Some Details:</h2>
            <div className={styles.input_field}>
              <input className={styles.input} id="title" name='title' type="text" value={productData.title} onChange={handleChange} required placeholder="Add Product Name.." />
              <span>*This Field is Mandatory</span>
            </div>
            <br />
            <div className={styles.input_field}>
              <input className={styles.input} style={{ marginTop: "0" }} readOnly name='category' value={productData.category} id="category" type="text" onChange={handleChange} required placeholder="Add Product Category.." />
            </div>
            <br />
            <div className={styles.input_field}>
              <textarea name="desc" onChange={handleChange} value={productData.desc} placeholder="Description"></textarea>
              <span>*This Field is Mandatory</span>
            </div>
            <br />
            <h2 className={styles.h2}>Set Appropriate Price:</h2>
            <div className={styles.priceParent}>
              <input type="number" name='price' onChange={handleChange} value={productData.price} className={styles.price} placeholder="Price.." />
              <span>*This Field is Mandatory</span>
            </div>
          </div>
          <hr />
          <div style={{ padding: "2rem" }}>

            <div className={styles.down_sec}>
              <h2 className={styles.h2}>Review Your Details</h2>
              <div className={styles.review_details}>
                <div className={styles.left}><Image width={100} height={100} src={profilePic} alt="profile" />
                </div>
                <div className={styles.reviewParent}>
                  <label htmlFor="">Name</label>
                  <div className={styles.right}>
                    <input className={styles.input} type="text" readOnly value={userData[0]?.fullname} />
                    <span className={styles.counter}>{userData[0]?.fullname.length}/30</span>
                  </div>
                </div>
              </div>
              <div className={styles.last_label}>
                <div>Phone Number:</div>
                <div style={{ color: "#D9D9D9" }}>+91 {userData[0]?.phone}</div>
              </div>
            </div>
          </div>
          <hr />
          <div className={styles.btnParent}>
            <button onClick={handleSubmit} className={styles.post}>
              {
                showSkeleton ? <span className={styles.loader}></span> : "POST"
              }
            </button>
          </div>
        </section>
      }

      {
        !productData.subCategory.length > 0 &&
        <section className={styles.categorySection}>
          <div className={styles.categoryParent}>
            <h3>Choose a category</h3>
            <div>
              <ul className={styles.categories}>
                {
                  Object.keys(category).map((item, index) => {
                    return <li key={index} onClick={handleCategories} value={item} style={roboto.style}>{item}  <span value={item}><IoIosArrowForward value={item} size={25} color='rgba(0,47,52,0.64)' /> </span> </li>
                  })
                }
              </ul>
              <div>
                <div className={styles.subCategories}>
                  {
                    categoryList &&
                    categoryList.map((item, index) => {
                      return (
                        <span onClick={() => { setProductData({ ...productData, subCategory: item }) }} key={index}>{item}</span>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </section>
      }
    </>
  )
}

export default Sell