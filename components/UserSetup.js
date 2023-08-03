import React, { useRef, useState } from 'react'
import styles from "@/styles/userSetup.module.css"
import { Raleway, Jost } from 'next/font/google'
const raleway = Raleway({ subsets: ['latin'], weight: "400" })
import { BsTelephonePlus } from "react-icons/bs"
import { PiStudent } from "react-icons/pi"
import { MdOutlineHouseSiding, MdCastForEducation } from "react-icons/md"
import { AiOutlineBranches, AiOutlineCalendar } from "react-icons/ai"
import { auth, db } from "@/middleware/firebase"
import { doc, setDoc } from "firebase/firestore";
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/navigation'
import { BiSolidCameraPlus } from "react-icons/bi"
import { CldUploadWidget } from 'next-cloudinary';
const jost = Jost({ subsets: ['latin'] })


const UserSetup = () => {
    const [userImg, setUserImg] = useState('/images/user.png')
    let router = useRouter()
    let ref = useRef(null)
    const [loader, setLoader] = useState(false)
    const [stdType, setStdType] = useState(null)
    const [credentials, setCredentials] = useState({ number: "", stdType: "", hostel: "", location: "", course: "", branch: "", year: "" })

    const handleSetupChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    const warnFunc = (message) => {
        toast.warn(message, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const inputVerification = () => {
        if (credentials.number.length < 10 || credentials.number.length > 10) {
            warnFunc("Number must be of 10 digit")
            return false;
        }
        if (String(credentials.year).length < 1 || String(credentials.year).length > 2 || credentials.year > 6 || credentials.year < 1) {
            warnFunc("Enter Correct Year Details")
            return false;
        }
        for (const item in credentials) {
            if (credentials.stdType === "Hosteller" && (item === "hostel")) {
                if (credentials[item] === "" && item === "hostel") {
                    warnFunc("Fill out all the details")
                    return false;
                }
            } else if (credentials.stdType === "Day Scholar" && (item === "location")) {
                if (credentials[item] === "" && item === "location") {
                    warnFunc("Fill out all the details")
                    return false;
                }
            } else {
                if (credentials[item] === "") {
                    if (item !== "hostel" && item !== "location") {
                        console.log(item)
                        warnFunc("Fill out all the details")
                        return false;
                    }
                }
            }
        }
        return true;
    }

    function handleOnUpload(result) {
        if (result.event === "success") {
            let profilePic = result.info.secure_url
            localStorage.setItem("profilePic", profilePic)
            setUserImg(profilePic)
        }
    }


    const handleSetup = (e) => {
        e.preventDefault()
        setLoader(true)
        let check = inputVerification()
        if (!check) {
            return
        }
        const { number, stdType, hostel, location, course, branch, year } = credentials;
        let currentUser = auth.currentUser;
        localStorage.setItem("currentUserId", currentUser.uid)
        setDoc(doc(db, "users", currentUser.uid), {
            fullname: currentUser.displayName,
            email: currentUser.email,
            phone: number,
            profilePic: localStorage.getItem("profilePic"),
            stdType,
            hostel,
            location,
            course,
            branch,
            year,
            userId: currentUser.uid,
            timestamp: new Date(),
        })
            .then(() => {
                setLoader(false)
                window.location.href = "/"
            })
            .catch((error) => {
                console.error("Error writing document: ", error);
            });
    }

    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <form className={styles.form} style={raleway.style}>
                        <h3 className={styles.h3}>Setting Up Your Account</h3>
                        <div className={`${styles.imageHolder} ${styles.formHolder}`}>
                            <img src={userImg} />
                            <CldUploadWidget options={{ maxFiles: 1 }} onUpload={handleOnUpload} uploadPreset="j5di0uph">
                                {({ open }) => {
                                    function handleOnClick(e) {
                                        e.preventDefault();
                                        open();
                                    }
                                    return (
                                        <BiSolidCameraPlus onClick={handleOnClick} className={styles.cameraPlus} color='#fff' />

                                    );
                                }}
                            </CldUploadWidget>
                        </div>
                        <div className={styles.formHolder}>
                            <span> <BsTelephonePlus /> </span>
                            <input type="number" name='number' required className={styles.formControl} placeholder="Phone Number" onChange={handleSetupChange} />
                        </div>
                        <div className={styles.formHolder}>
                            <span> <PiStudent /> </span>
                            <select onChange={(e) => { handleSetupChange(e); setStdType(e.target.value) }} required className={styles.formControl} name="stdType" id="stdType">
                                <option value="">Student Type</option>
                                <option value="Hosteller">Hosteller</option>
                                <option value="Day Scholar">Day Scholar</option>
                            </select>

                        </div>
                        {
                            stdType === "Hosteller" ?
                                <div className={styles.formHolder}>
                                    <span>
                                        <MdOutlineHouseSiding />
                                    </span>
                                    <select onChange={handleSetupChange} className={styles.formControl} name="hostel" id="hostel">
                                        <option value="">Select Hostel</option>
                                        <option value="wing1">Wing 1</option>
                                        <option value="wing2">Wing 2</option>
                                        <option value="wing3">Wing 3</option>
                                        <option value="wing4">Wing 4</option>
                                        <option value="wing5">Wing 5</option>
                                        <option value="ABlock">A Block</option>
                                        <option value="BBlock">B Block</option>
                                        <option value="CBlock">C Block</option>
                                        <option value="DBlock">D Block</option>
                                        <option value="EBlock">E Block</option>
                                        <option value="FBlock">F Block</option>
                                        <option value="GBlock">G Block</option>
                                        <option value="HBlock">H Block</option>
                                        <option value="IBlock">I Block</option>
                                        <option value="JBlock">J Block</option>
                                    </select>
                                </div> : null
                        }
                        {stdType === "Day Scholar" ?
                            <div className={styles.formHolder}>
                                <span>
                                    <MdOutlineHouseSiding />
                                </span>
                                <input name='location' onChange={handleSetupChange} type="text" className={styles.formControl} placeholder="Address (PG, Hostel, Location)" />
                            </div> : null
                        }
                        <div className={styles.formDivider}>
                            <div>
                                <span>
                                    <MdCastForEducation />
                                </span>
                                <input name='course' onChange={handleSetupChange} type="text" className={styles.formControl} placeholder="Course" required />
                            </div>
                            <div>
                                <span>
                                    <AiOutlineBranches />
                                </span>
                                <input name='branch' onChange={handleSetupChange} type="text" className={styles.formControl} placeholder="Branch" required />
                            </div>
                        </div>
                        <div className={styles.formHolder}>
                            <span>
                                <AiOutlineCalendar />
                            </span>
                            <input name='year' onChange={handleSetupChange} type="number" min={1} max={5} className={styles.formControl} placeholder="Year (Current Year)" required />
                        </div>
                        <button onClick={handleSetup} className={styles.button}>
                            <span style={jost.style}>
                                {
                                    loader ? <span className={styles.loader}></span> : " Register"
                                }
                            </span>
                        </button>
                    </form>
                </div >

            </div >
        </>
    )
}
export default UserSetup