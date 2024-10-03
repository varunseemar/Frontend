import React from 'react'
import crossblack from '../../Images/crossblack.png'
import Bookmark from "../../Images/Bookmark.jpg"
import Profile from '../../Images/Profile.jpg'
import styles from './LoggedInHeaderMobile.module.css'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const LoggedInHeaderMobile = ({setIsLoggedIn,setLikedSlides,setDisplayStory,setStoryModalContentId,setIsModalOpen,setBookmarkedSlides,setActiveSlide,setSavedActiveSlide,setStoryModalContent,setOpenMobileLoggedInHeader,openBookmarks,openAddStoryModal,setEditUserStory}) => {
  const username = localStorage.getItem('username');
  const navigate = useNavigate();

  const handleClickCross = () => {
    setOpenMobileLoggedInHeader(false);
  }

  const handleModal = ()=>{
    setEditUserStory(false);
    openAddStoryModal();
  }

  const handleLogout = ()=>{
    setIsLoggedIn(false);
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
    setOpenMobileLoggedInHeader(false);
  }

  return (
    <div className={styles.LoggedInHeader}>
      <div className={styles.firstLine}>
        <div className={styles.UserProfileLoggedInHeader}>
            <img src={Profile}></img>
        </div>
        <div className={styles.Username}>
            {username}
        </div>
        <div className={styles.cross}>
            <img src={crossblack} alt='cross' onClick={handleClickCross}></img>
        </div>
      </div>
      <div className={styles.lowerDivs}>
        <div className={styles.YourStoryLoggedInHeader}>
            <p>Your Story</p>
        </div>
        <div className={styles.AddStoryLoggedInHeader} onClick={handleModal}>
            <p>Add Story</p>
        </div>
        <div className={styles.BookmarksLoggedInHeader} >
            <span><img className={styles.BookmarkImageLoggedInHeader} src={Bookmark} onClick={openBookmarks}></img>
            Bookmarks</span>
        </div>
        <div className={styles.AddStoryLoggedInHeader} onClick={handleLogout}>
            <p>Logout</p>
        </div>
      </div>
    </div>
  )
}

export default LoggedInHeaderMobile;