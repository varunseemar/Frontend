import React, {useState , useEffect , useContext} from 'react'
import styles from './Userstories.module.css'
import {ScreenSize} from '../../ScreenSize.jsx'
import axios from 'axios'
import { BACKEND_URL } from '../../utils/constants.js'
import editIcon from '../../Images/tabler_edit.png'

const Userstories = ({isLoggedIn,setStoryModalContentId,setStoryModalContent,openStoryModal,openAddStoryModal,setEditUserStory,setEditUserStoryId}) => {
const [userStories,setUserStories] = useState({})
const isMobile = useContext(ScreenSize);

useEffect(()=>{
    const storedUsername = localStorage.getItem('username');
    if(storedUsername){
        fetchUserStories();
    }
},[])

const handleEdit = (storyId,e)=>{
    e.stopPropagation();
    setEditUserStory(true);
    setEditUserStoryId(storyId);
    openAddStoryModal();
}

const handleOpenModal = async(storyId)=>{
    setStoryModalContentId(storyId);
    const response = await axios.get(`${BACKEND_URL}/story/${storyId}`)
    setStoryModalContent(response.data);
    openStoryModal();
}

const fetchUserStories = async () => {
    const username = localStorage.getItem('username');
    try{
        const response = await axios.get(`${BACKEND_URL}/story/user/${username}`);
        setUserStories(response.data);
    } 
    catch(err) {
        console.log(err.message);
    }
};

return (
    <>
      {isMobile && userStories.length > 0 && isLoggedIn &&(
        <div className={styles.Userstoriess}>
          <div className={styles.categorydiv}>
            <div className={styles.categoryText}>Your Stories</div>
            {userStories.map((story) => (
              <div key={story._id} className={styles.IndividualStorydiv} onClick={() => handleOpenModal(story._id)}>
                <img
                  src={story.slides[0].imageUrl}
                  alt={story.slides[0].heading}
                  className={styles.storyImage}
                />
                <div className={styles.StoryText}>
                  <div className={styles.Heading}>{story.slides[0].heading}</div>
                  <div className={styles.Description}>{story.slides[0].description}</div>
                </div>
                <div className={styles.EditButton} onClick={(e) => handleEdit(story._id, e)}>
                  <img src={editIcon} alt="Edit Icon" />
                  <p>Edit</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )}
  
export default Userstories;