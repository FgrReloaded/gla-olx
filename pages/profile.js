import React, { useState, useEffect } from 'react'
import styles from '@/styles/profile.module.css'
import Card from '@/components/Card'
import { AiOutlineCalendar, AiOutlineMail, AiOutlinePhone } from 'react-icons/ai'
import mongoose from 'mongoose'
import Item from '@/models/Item'
import Cookies from 'js-cookie'
import { doc, getDoc } from "firebase/firestore";
import { db } from '@/middleware/firebase'
import Link from 'next/link'
import Image from 'next/image'
import Head from 'next/head'
const MyProfile = ({ data }) => {
  const [user, setUser] = useState([])
  const [profilePic, setProfilePic] = useState("/images/user.png")
  const [setshowEdit, setShowEdit] = useState(true)
  const [itemData, setItemData] = useState([])
  useEffect(() => {
    if (data) {
      setItemData(data)
    }
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const userProfile = urlParams.get('userProfile')
    let profilePic = localStorage.getItem('profilePic')
    if (profilePic && !urlParams) {
      setProfilePic(profilePic)
    }
    if (!userProfile) {
      let getId = localStorage.getItem('currentUserId')
      if (!getId) {
        window.location.href = '/signup'
      }
      let userData = JSON.parse(Cookies.get(getId));
      setUser(userData);
      getItem(getId);
    }
    if (userProfile) {
      setShowEdit(false);
      getUserData(userProfile);
    }
  }, [])

  const getUserData = async (userProfile) => {
    const docRef = doc(db, "users", userProfile);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      let data = []
      data.push(docSnap.data())
      setProfilePic(docSnap.data().profilePic)
      setUser(data)
    } else {
      console.log("No Data Available");
    }
  }

  const getItem = async (getId) => {
    let res = await fetch(`/api/useritem`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id: getId })
    })
    let result = await res.json()
    setItemData(result.data)
  }


  return (
    <>
    <Head>
      <title>
        Profile
      </title>
    </Head>
      <div className={styles.section}>
        <div className={styles.profileSection}>
          <div>
            <Image width={100} height={100} src={profilePic} alt="" />
          </div>
          <p>{user[0]?.fullname}</p>
          <small><AiOutlineCalendar /> Member Since Jun 2023</small>
          <div>
            <span>User Verified with
              <span>
                <AiOutlineMail /> <AiOutlinePhone />
              </span>
            </span>
          </div>
          {
            setshowEdit &&
            <Link href={"/editprofile"}>Edit Profile</Link>
          }
        </div>
        <div div className={styles.userAds}>
          {
            itemData.length > 0 && itemData.map((item, index) => {
              return <Card key={index} item={item} />
            })
          }
        </div>
      </div >
    </>
  )
}

export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI)
  }
  let { userProfile } = context.query
  let data = await Item.find({ seller: userProfile })
  data = JSON.parse(JSON.stringify(data))
  return {
    props: {
      data
    }
  }
}


export default MyProfile