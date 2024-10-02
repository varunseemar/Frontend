import React from 'react'
import styles from './Logout.module.css'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
const Logout = ({setLikedSlides,setDisplayStory,setStoryModalContentId,setIsModalOpen,setBookmarkedSlides,setActiveSlide,setSavedActiveSlide,setStoryModalContent,setIsLoggedIn,setDisplayLogout,displayLogout}) => {
  const navigate = useNavigate();
  const username = localStorage.getItem('username');
  const handleLogout = ()=>{
    setIsLoggedIn(false);
    setDisplayLogout(!displayLogout);
    toast.success("Successfully Logged Out")
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    setIsModalOpen();
    setLikedSlides([]);
    setBookmarkedSlides([]);
    setActiveSlide(0);
    setSavedActiveSlide(null);
    setStoryModalContent({});
    setStoryModalContentId(null);
    setDisplayStory(false);
    navigate('/',{replace : true})
  }
  return (
    <div className={styles.LogoutMain}>
      <p className={styles.Username}>{username}</p>
      <button className={styles.LogoutButton} onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Logout