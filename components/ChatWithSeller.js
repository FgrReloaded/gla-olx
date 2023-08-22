import React from 'react'
import styles from '@/styles/ChatSeller.module.css'
import { CiWarning } from 'react-icons/ci'
import { useRouter } from 'next/navigation'

const ChatWithSeller = ({ chatData }) => {
  const router = useRouter()
  const startChat = () => {
    const { currentUser, seller, item, itemPrice} = chatData
    router.push(`/chat?currentUser=${currentUser}&userTempToken=${seller}&item=${item}&itemPrice=${itemPrice}`)
  }
  return (
    <>
      <div className={styles.box}>
        <div className={styles.top}>
          <CiWarning size={50} />
        </div>
        <div className={styles.content}>
          <p></p>
          <p></p>
          <p></p>
        </div>
        <button onClick={startChat}>Chat With Seller</button>
      </div>
    </>
  )
}

export default ChatWithSeller