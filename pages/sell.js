import React, { useEffect, useRef, useState, useContext } from 'react'
import styles from "@/styles/sell.module.css"
import { BiImageAdd } from "react-icons/bi"
import { AiOutlineCloseCircle, AiFillCloseCircle } from "react-icons/ai"
import glxContext from './context/glxContext'
import { set } from 'mongoose'
import { CldUploadWidget } from 'next-cloudinary'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import Head from 'next/head'

const sell = () => {
  const [productData, setProductData] = useState({ title: "", desc: "", price: "", category: "", sellerName: "" })
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
  const { createItem, items } = context;

  const handleSubmit = (e) => {
    e.preventDefault()
    let { title, desc, price, category, sellerName } = productData;
    sellerName = userData[0].fullname
    let seller = localStorage.getItem("currentUserId")
    // Upload files to cloudinary

    let coverImg = coverFile;
    let images = files.slice(0, 4);
    images.push(coverImg)
    createItem({ title, desc, price, category, seller, sellerName, images, sellerPic: profilePic })
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
  return (
    <>
      <Head>
        <title>Sell - GLA-OLX.com</title>
      </Head>
      <header className={styles.header}>
        <h1>CREATE YOUR AD</h1>
      </header>
      <section className={styles.section}>
        <div style={{ padding: "2rem" }}>

          <h2 className={styles.h2}>ADD COVER PHOTO:</h2>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className={styles.add_image}>
              <span className={`hidden ${styles.removeImg}`} onClick={removeCover}>x</span>
              <input type="file" onChange={handleCoverFile} accept='image/*' ref={ref} style={{ display: "none" }} />
              <img src={coverSrc} onClick={() => { ref.current.click() }} width={80} style={{ height: height, width: width, cursor: "default" }} height={80} />
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
                    <img src={URL.createObjectURL(file)} style={{ width: "100%", height: "100%", cursor: "default", objectFit: "cover" }} />
                    <span className={styles.removeImg} onClick={removeImg}>x</span>
                  </div>
                )
              })
              )
            }
            {
              files.length < 4 && (
                <div>
                  <img src="/images/addImage.png" className='smallImg' onClick={handleMiniImageUpload} width={30} height={30} />
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
            {/* <div>
              <img src={smallImg} className='smallImg' order="2" onClick={handleMiniImageUpload} width={30} height={30} />
            </div>
            <div>
              <img src={smallImg} className='smallImg' order="3" onClick={handleMiniImageUpload} width={30} height={30} />
            </div>
            <div>
              <img src={smallImg} className='smallImg' order="4" onClick={handleMiniImageUpload} width={30} height={30} />
            </div> */}
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
            <input className={styles.input} style={{ marginTop: "0" }} name='category' value={productData.category} id="category" type="text" onChange={handleChange} required placeholder="Add Product Category.." />
            <span>*This Field is Mandatory</span>
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
              <div className={styles.left}><img src={profilePic} alt="" />
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
          <button onClick={handleSubmit} className={styles.post}>POST</button>
        </div>
      </section>
    </>
  )
}

export default sell