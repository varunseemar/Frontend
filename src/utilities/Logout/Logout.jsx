import React from 'react'
import styles from './Logout.module.css'
import toast from 'react-hot-toast'
const Logout = ({setIsLoggedIn,setDisplayLogout,displayLogout}) => {
    const username = localStorage.getItem('username');
    const handleLogout = ()=>{
        setIsLoggedIn(false);
        setDisplayLogout(!displayLogout);
        toast.success("Successfully Logged Out")
        localStorage.removeItem('username');
        localStorage.removeItem('token');
    }
  return (
    <div className={styles.LogoutMain}>
        <p className={styles.Username}>{username}</p>
        <button className={styles.LogoutButton} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout