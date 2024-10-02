import React from 'react'
import Bookmark from "../../Images/Bookmark.jpg"
import Profile from '../../Images/Profile.jpg'
import Menu from '../../Images/Menu.png'
import styles from './LoggedInHeader.module.css'
const LoggedInHeader = ({openBookmarks,setDisplayLogout,displayLogout,openAddStoryModal,setEditUserStory}) => {

  const handleLogoutToggle = ()=>{
    setDisplayLogout(!displayLogout);
  }
  
  const handleModal = ()=>{
    setEditUserStory(false);
    openAddStoryModal();
  }

  return (
    <>
        <div className={styles.LoggedInHeader}>
            <div className={styles.BookmarksLoggedInHeader} onClick={openBookmarks}>
                <span><img className={styles.BookmarkImageLoggedInHeader} src={Bookmark}></img>
                Bookmarks</span>
            </div>
            <div className={styles.AddStoryLoggedInHeader} onClick={handleModal}>
                <p>Add Story</p>
            </div>
            <div className={styles.UserProfileLoggedInHeader}>
                <img src={Profile}></img>
            </div>
            <div className={styles.MenuLoggedInHeader}>
                <img src={Menu} onClick={handleLogoutToggle}></img>
            </div>
        </div>
    </>
  )
}

export default LoggedInHeader;