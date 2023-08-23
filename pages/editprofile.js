import React, { useEffect, useRef, useState } from 'react'
import styles from "@/styles/editprofile.module.css"
import Cookies from 'js-cookie'
import Link from 'next/link'
import { db } from "@/middleware/firebase"
import { doc, updateDoc } from "firebase/firestore";
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'

const profile = () => {
  const ref = useRef();
  const [profilePic, setProfilePic] = useState(false)
  const [user, setUser] = useState([])
  const [profile, setProfile] = useState("/images/user.png")
  const [updatedUser, setUpdatedUser] = useState({ fullname: "", phone: "", desc: "" })
  useEffect(() => {
    let currentUser = localStorage.getItem('currentUserId');
    let profilePic = localStorage.getItem('profilePic');
    if (profilePic) {
      setProfile(profilePic)
    }
    if (!currentUser) {
      window.location.href = "/signup"
    }
    let userData = Cookies.get(currentUser);
    setUser(JSON.parse(userData))
  }, [])

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value })
  }

  const updateUser = () => {
    const { fullname, phone, desc } = updatedUser;
    if (fullname === "" && phone === "" && desc === "") {
      return;
    }
    let currentUser = localStorage.getItem('currentUserId');
    let existingData = JSON.parse(Cookies.get(currentUser));
    if (fullname !== "") {
      existingData[0].fullname = fullname;
    }
    if (phone !== "") {
      existingData[0].phone = phone;
    }
    if (desc !== "") {
      existingData[0].desc = desc;
    }
    Cookies.set(currentUser, JSON.stringify(existingData))

    updateDoc(doc(db, "users", currentUser), {
      fullname: fullname === "" ? existingData[0].fullname : fullname,
      phone: phone === "" ? existingData[0].phone : phone,
      desc: desc === "" ? existingData[0].desc : desc
    })
      .then(() => {
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }
  const deleteProfile = () => {
    localStorage.setItem("profilePic", "/images/user.png")
    setProfile("/images/user.png")
    let currentUser = localStorage.getItem('currentUserId');
    updateDoc(doc(db, "users", currentUser), {
      profilePic: "/images/user.png"
    })
      .then(() => {
        let existingData = JSON.parse(Cookies.get(currentUser));
        existingData[0].profilePic = "/images/user.png";
        Cookies.set(currentUser, JSON.stringify(existingData))
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
      });
  }


  function handleOnUpload(result) {
    if (result.event === "success") {
      let profilePic = result.info.secure_url
      localStorage.setItem("profilePic", profilePic)
      setProfile(profilePic)
      updateDoc(doc(db, "users", localStorage.getItem('currentUserId')), {
        profilePic
      })
        .then(() => {
          let existingData = JSON.parse(Cookies.get(localStorage.getItem('currentUserId')));
          existingData[0].profilePic = profilePic;
          Cookies.set(localStorage.getItem('currentUserId'), JSON.stringify(existingData))
          window.location.reload();
        })
        .catch((error) => {
          console.error("Error writing document: ", error);
        });

    }
  }



  return (
    <>
      <div className={styles.section}>
        <div className={styles.sideBar}>
          <div>
            <span onClick={() => { setProfilePic(false) }} style={{ fontWeight: `${!profilePic ? "700" : "normal"}` }}>Edit Profile</span>
            <span onClick={() => { setProfilePic(true) }} style={{ fontWeight: `${profilePic ? "600" : "normal"}` }}>Profile Picture</span>
          </div>
          <button>
            <Link href={"/profile"}>
            View Profile
            </Link>
            </button>
        </div>
        {!profilePic &&
          <div className={styles.editProfile} >
            <div className={styles.header}>
              <h3>Edit Profile</h3>
            </div>
            <div className={styles.details}>
              <h5>Basic Information</h5>
              <input type="text" onChange={handleChange} value={updatedUser.fullname} name='fullname' placeholder={user[0]?.fullname} />
              <textarea name='desc' onChange={handleChange} placeholder={`${user[0]?.desc ? user[0].desc : "Description (Optional)"}`} rows="5"></textarea>
              <hr />
              <h5>Contact Information</h5>
              <input type="number" name='phone' value={updatedUser.phone} onChange={handleChange} placeholder={user[0]?.phone} />
              <input type="email" placeholder={user[0]?.email} readOnly />
              <hr />
              <div>
                <span>
                  <Link href={"/"}>
                    Discard
                  </Link>
                </span>
                <button onClick={updateUser}>Save Changes</button>
              </div>
            </div>
          </div>
        }
        {
          profilePic &&
          <div className={styles.profilePic}>
            <div className={styles.header}>
              <h3>Profile Picture</h3>
            </div>
            <div className={styles.profilePicture}>
              <div className={styles.deletePic}>
                <Image width={100} height={100} onClick={deleteProfile} src="/images/delete.png" alt="delete" />
              </div>
              <div className={styles.profilePicHolder}>
                <Image width={100} height={100} src={profile} alt="delete" />
              </div>
              <div className={styles.picContent}>
                <p>Clear photos are an important way for buyers and sellers to learn about each other. Be sure doesn’t include any personal or sensitive info you’d rather not have others see.</p>
                <CldUploadWidget options={{ maxFiles: 1 }} onUpload={handleOnUpload} uploadPreset="j5di0uph">
                  {({ open }) => {
                    function handleOnClick(e) {
                      e.preventDefault();
                      open();
                    }
                    return (
                      <button onClick={handleOnClick}>Upload</button>
                    );
                  }}
                </CldUploadWidget>
              </div>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default profile