import Head from 'next/head'
import React, { useEffect, useState, useRef } from 'react'
import styles from "@/styles/Chat.module.css"
import { Alice, Noto_Sans } from "next/font/google"
const alice = Alice({ subsets: ["latin"], weight: "400" })
const noto = Noto_Sans({ subsets: ["latin"], weight: "800" })
import { IoSendSharp } from "react-icons/io5"
import { GrSearch } from "react-icons/gr"
import { AiOutlinePaperClip } from "react-icons/ai"
import ChattingWith from '@/models/ChattingWith'
import mongoose from 'mongoose'
import {
  doc, getDoc, addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/middleware/firebase"
import { useRouter } from 'next/navigation';


const chat = ({ data }) => {
  const ref = useRef(null)
  const router = useRouter()
  const [users, setUsers] = useState([])
  const [hidden, setHidden] = useState(true)
  const [receiverData, setReceiverData] = useState(null)
  const [allMessages, setAllMessages] = useState({})
  const [chatMessage, setChatMessage] = useState("");
  const myUser = auth.currentUser;
  const [currentDate, setCurrentDate] = useState([])

  useEffect(() => {
    if (data) {
      getAllUsersData(data.chattingWith)
    } else {
      getChattingWith()
    }
    if (receiverData) {
      const unsub = onSnapshot(
        query(
          collection(
            db,
            "users",
            myUser?.uid,
            "chatUsers",
            receiverData?.id,
            "messages"
          ),
          orderBy("timestamp")
        ),
        (snapshot) => {
          let d = {}
          snapshot.docs.map((doc) => {
            if (doc.data().item === receiverData?.item) {
              let date = doc.data().timestamp.toDate().toDateString().split(" ").slice(1).join(" ")
              let today = new Date().toDateString().split(" ").slice(1).join(" ")
              if (date === today) {
                date = "Today"
              }
              d[date] = [...d[date] || [], doc.data()]
            }
          })
          setAllMessages(d)
        }
      );
      return unsub;
    }
  }, [receiverData])

  const getChattingWith = async () => {
    let currentUser = localStorage.getItem("currentUserId");
    let res = await fetch(`/api/chattingwith?id=${currentUser}`)
    let data = await res.json()
    getAllUsersData(data.chattingWith.chattingWith)
  }

  const getAllUsersData = async (chattingWith) => {
    let data = []
    for (let i = 0; i < chattingWith.length; i++) {
      const docRef = doc(db, "users", chattingWith[i].userToken);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        data.push({ itemName: chattingWith[i].itemName, itemPrice: chattingWith[i].itemPrice, ...docSnap.data() })
      }
    }
    setUsers(data)
  }

  const sendMessage = async () => {
    try {
      if (myUser && receiverData && chatMessage) {
        await addDoc(
          collection(
            db,
            "users",
            myUser.uid,
            "chatUsers",
            receiverData?.id,
            "messages"
          ),
          {
            username: myUser.displayName,
            messageUserId: myUser.uid,
            message: chatMessage,
            item: receiverData?.item,
            timestamp: new Date(),
          }
        );

        await addDoc(
          collection(
            db,
            "users",
            receiverData?.id,
            "chatUsers",
            myUser.uid,
            "messages"
          ),
          {
            username: myUser.displayName,
            messageUserId: myUser.uid,
            message: chatMessage,
            item: receiverData?.item,
            timestamp: new Date(),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setChatMessage("");
  };
  const handleReceiver = (id, item, price) => {
    setReceiverData({ id, item, price })
  }
  const showDeleteBtn = (e) => {
    if (e.target.children.length > 0) {
      e.target.children[0].classList.toggle("hidden")
    }
  }
  const deleteMsg = async () => {
    try {
      if (myUser && receiverData) {
        const docRef = doc(db, "users", myUser?.uid, "chatUsers", receiverData?.id);
        deleteDoc(docRef)
          .then(() => {
            console.log("Entire Document has been deleted successfully.")
          })
          .catch(error => {
            console.log(error);
          }) 
        // await deleteDoc(docRef)
      }
    } catch (error) {
      console.log(error.message);
    }
  }



  return (
    <>
      <Head>
        <title>Chat</title>
      </Head>
      <section className={styles.container}>
        <div className={styles.box}>
          <div className={styles.userListBox}>
            <div className={styles.chatHeader} style={noto.style}>
              <h3>Inbox</h3>
              <div>
                <GrSearch color='#728D90' size={25} /> <span color='#728D90'>&#8942;</span>
              </div>
            </div>
            <div className={styles.quickFilter}>
              <p>Quick filters</p>
              <div>
                <span className={styles.active}>All</span>
                <span>Meeting</span>
                <span>Unread</span>
                <span>Important</span>
              </div>
            </div>
            <ul>
              {users.length > 0 &&
                users.map((user, index) => {
                  return (
                    <li onClick={() => { handleReceiver(user.userId, user.itemName, user.itemPrice) }} key={index}>
                      <img src={user.profilePic} style={{ objectFit: "cover" }} />
                      <a>{user.fullname}</a>
                      <p>{user.itemName}</p>
                      <p>pehli fursat me nikal</p>
                      <span onClick={showDeleteBtn} color='#728D90'>&#8942; <div onClick={deleteMsg} className='hidden'>Delete</div></span>
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className={styles.chatBox}>
            <div className={styles.chatContent}>
              <div className={styles.chatDetails}>
                <div className={styles.chatUser}>
                  <img src={receiverData && users.filter(user => user.userId === receiverData?.id)[0].profilePic} style={{ objectFit: "cover" }} />
                  <h3 style={noto.style}>{
                    receiverData && users.filter(user => user.userId === receiverData?.id)[0].fullname
                  }</h3>
                </div>
                <div className={styles.userProduct}>
                  <span>Product: {receiverData && receiverData?.item}</span><span>Price: Rs {receiverData && receiverData?.price}</span>
                </div>
              </div>
              <div className={styles.chatItem}>
                {
                  Object.keys(allMessages).length > 0 &&
                  Object.keys(allMessages).map((date) => {
                    return (
                      <div key={date}>
                        <h6>
                          {date}
                        </h6>
                        {
                          allMessages[date].map((messages, id) => {
                            return (
                              <p key={id} className={`${myUser.uid === messages.messageUserId ? styles.me : styles.you}`}>
                                {messages.message}
                                <span>
                                  {
                                    new Date(messages.timestamp?.seconds * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                  }
                                </span>
                              </p>
                            )
                          })
                        }
                      </div>
                    )
                  })
                }
              </div>
            </div>
            <div className={styles.chatInput}>
              <div>
                <input type="text" placeholder='Enter a message' value={chatMessage} onKeyDown={(e) => { e.key === "Enter" ? ref.current.click() : null }} onChange={(e) => setChatMessage(e.target.value)} />
                <span><AiOutlinePaperClip /></span>
              </div>
              <button ref={ref} onClick={sendMessage}>
                <IoSendSharp color="var(--secondary)" size={40} />
              </button>
            </div>
          </div>
        </div>
      </section >
    </>
  )
}


export async function getServerSideProps(context) {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGODB_URI)
  }
  let userToken = context.query.userTempToken;
  let currentUser = context.query.currentUser;
  let itemName = context.query.item;
  let itemPrice = context.query.itemPrice;
  if (!userToken || !currentUser || !itemName || !itemPrice) {
    return { props: { success: false, data: null } }
  }
  if (userToken === currentUser) {
    return { props: { success: false, data: null } }
  }
  let findSender = await ChattingWith.findOne({ userId: currentUser });
  let findReceiver = await ChattingWith.findOne({ userId: userToken });

  if (!findReceiver) {
    let chattingWith = [];
    chattingWith.push({ userToken: currentUser, itemName, itemPrice });
    let addReceiverUser = await ChattingWith.create({ userId: userToken, chattingWith });
  }

  if (findReceiver) {
    let unique = true;
    let chattingWith = findReceiver.chattingWith;
    for (let i = 0; i < chattingWith.length; i++) {
      if (chattingWith[i].userToken === currentUser && chattingWith[i].itemName === itemName) {
        unique = false;
        break;
      }
    }
    if (unique) {
      chattingWith.push({ userToken: currentUser, itemName, itemPrice });
      let addReceiverUser = await ChattingWith.findOneAndUpdate({ userId: userToken }, { chattingWith });
    }
  }

  if (!findSender) {
    let chattingWith = [];
    chattingWith.push({ userToken, itemName, itemPrice });
    let addUser = await ChattingWith.create({ userId: currentUser, chattingWith });
    return { props: { success: true, data: JSON.parse(JSON.stringify(addUser)) } }
  }

  let unique = true;
  let chattingWith = findSender.chattingWith;
  for (let i = 0; i < chattingWith.length; i++) {
    if (chattingWith[i].userToken === userToken && chattingWith[i].itemName === itemName) {
      unique = false;
      break;
    }
  }
  if (unique) {
    chattingWith.push({ userToken, itemName, itemPrice });
    let addUser = await ChattingWith.findOneAndUpdate({ userId: currentUser }, { chattingWith });
    return { props: { success: true, data: JSON.parse(JSON.stringify(addUser)) } }
  }
  return { props: { success: false, data: JSON.parse(JSON.stringify(findSender)) } }

}

export default chat