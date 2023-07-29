import Head from 'next/head'
import React, { useEffect, useState } from 'react'
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
} from "firebase/firestore";
import { auth, db } from "@/middleware/firebase"
import { useRouter } from 'next/navigation';


const chat = ({ data }) => {
  const [users, setUsers] = useState([])
  const [receiverData, setReceiverData] = useState(null)
  const [allMessages, setAllMessages] = useState([])
  const [chatMessage, setChatMessage] = useState("");
  const myUser = auth.currentUser;

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
            receiverData,
            "messages"
          ),
          orderBy("timestamp")
        ),
        (snapshot) => {
          setAllMessages(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              messages: doc.data(),
            }))
          );
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
            receiverData,
            "messages"
          ),
          {
            username: myUser.displayName,
            messageUserId: myUser.uid,
            message: chatMessage,
            timestamp: new Date(),
          }
        );

        await addDoc(
          collection(
            db,
            "users",
            receiverData,
            "chatUsers",
            myUser.uid,
            "messages"
          ),
          {
            username: myUser.displayName,
            messageUserId: myUser.uid,
            message: chatMessage,
            timestamp: new Date(),
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
    setChatMessage("");
  };



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
                    <li onClick={() => { setReceiverData(user.userId) }} key={index}>
                      <img src={user.profilePic} style={{ objectFit: "cover" }} />
                      <a>{user.fullname}</a>
                      <p>{user.itemName}</p>
                      <p>pehli fursat me nikal</p>
                      <span color='#728D90'>&#8942;</span>
                    </li>
                  )
                })}
            </ul>
          </div>
          <div className={styles.chatBox}>
            <div className={styles.chatContent}>
              <div className={styles.chatDetails}>
                <div className={styles.chatUser}>
                  <img src={receiverData && users.filter(user => user.userId === receiverData)[0].profilePic} style={{ objectFit: "cover" }} />
                  <h3 style={noto.style}>{
                    receiverData && users.filter(user => user.userId === receiverData)[0].fullname
                  }</h3>
                </div>
                <div className={styles.userProduct}>
                  <span>Product: {receiverData && users.filter(user => user.userId === receiverData)[0].itemName}</span><span>Price: Rs {receiverData && users.filter(user => user.userId === receiverData)[0].itemPrice}</span>
                </div>
              </div>
              <div className={styles.chatItem}>
                {
                  allMessages.length > 0 &&
                  allMessages.map(({id, messages}) => {
                    return (
                      <p key={id} className={`${myUser.uid === messages.messageUserId ? styles.me : styles.you}`}>
                        {messages.message}
                      </p>
                    )
                  })
                }
              </div>
            </div>
            <div className={styles.chatInput}>
              <div>
                <input type="text" placeholder='Enter a message' value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
                <span><AiOutlinePaperClip /></span>
              </div>
              <button onClick={sendMessage}>
                <IoSendSharp color="var(--secondary)" size={40} />
              </button>
            </div>
          </div>
        </div>
      </section>
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