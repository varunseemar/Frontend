import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../../utils/constants';
import styles from './StoryDivs.module.css'; 
import editIcon from '../../Images/tabler_edit.png'

const StoryDivs = ({setStoryModalContentId,setStoryModalContent,openStoryModal,isLoggedIn,openAddStoryModal,setEditUserStory,setEditUserStoryId,refreshState,filterCategory,showDivByFilter}) => {
const [stories,setStories] = useState({});
const [seeMore,setSeeMore] = useState(null);
const [userStories,setUserStories] = useState({})
const [currentUsername,setCurrentUsername] = useState(null);

useEffect(() => {
  const storedUsername = localStorage.getItem('username');
  if (storedUsername) {
    setCurrentUsername(storedUsername);
    fetchUserStories(storedUsername);
  }
  fetchStories();
  setSeeMore(null);
},[refreshState,isLoggedIn,filterCategory]);

const handleOpenModal = async(storyId)=>{
  setStoryModalContentId(storyId);
  const response = await axios.get(`${BACKEND_URL}/story/${storyId}`)
  setStoryModalContent(response.data);
  openStoryModal();
}

const fetchStories = async () => {
    try {
      if(filterCategory && showDivByFilter){
        const response = await axios.get(`${BACKEND_URL}/story/filter/${filterCategory}`);
        const groupedStories = groupStoriesByCategory(response.data);
        setStories(groupedStories);
      }
      else{
        const response = await axios.get(`${BACKEND_URL}/story/`);
        const groupedStories = groupStoriesByCategory(response.data);
        setStories(groupedStories);
      }
    } 
    catch (err) {
      console.log(err.message);
    }
};

const fetchUserStories = async (username) => {
  try{
    const response = await axios.get(`${BACKEND_URL}/story/user/${username}`);
    setUserStories(response.data);
  } 
  catch(err) {
    console.log(err.message);
  }
};

const handleSeeMore = (category) => {
  if(category !== "Your Stories"){
    setUserStories({});
  }
  setSeeMore(category);
};

const handleEdit = (storyId,e)=>{
  e.stopPropagation();
  setEditUserStory(true);
  setEditUserStoryId(storyId);
  openAddStoryModal();
}

const groupStoriesByCategory = (stories) => {
  return stories.reduce((singleSlide, story) => {
    const category = story.slides[0].category;
    if (!singleSlide[category]) {
      singleSlide[category] = [];
    }
    singleSlide[category].push(story);
    return singleSlide;
  }, {});
};

return (
  <div>
      {isLoggedIn && userStories.length > 0 && (
      <div className={styles.categorydiv}>
        <div className={styles.categoryText}>Your Stories</div>
        {userStories.slice(0, seeMore === "Your Stories" ? userStories.length : 4).map((story) => (
          <>
          <div key={story._id} className={styles.IndividualStorydiv} onClick={()=> handleOpenModal(story._id)}>
            <img
              src={story.slides[0].imageUrl}
              alt={story.slides[0].heading}
              className={styles.storyImage}
            />
            <div className={styles.StoryText}>
                <div className={styles.Heading}>{story.slides[0].heading}</div>
                <div className={styles.Description}>{story.slides[0].description}</div>
            </div>
            <div className={styles.EditButton} onClick={(e) => handleEdit(story._id,e)}>
              <img src={editIcon}></img>
              <p>Edit</p>
            </div>
          </div>
          </>
        ))}
        {userStories.length > 4 && seeMore !== "Your Stories" && (
          <div className={styles.seeMoreButton}>
            <button className={styles.button} onClick={() => handleSeeMore("Your Stories")}>
              See More
            </button>
          </div>
        )}
      </div>
    )}
    {Object.keys(stories).map((category) => {
      if(seeMore && seeMore !== category){
        return null;
      }
      return(
        <div key={category} className={styles.categorydiv}>
          <div className={styles.categoryText}>Top Stories About {category}</div>
          {stories[category].slice(0, seeMore === category ? stories[category].length : 4).map((story) => (
            <div key={story._id} className={styles.IndividualStorydiv} onClick={()=> handleOpenModal(story._id)}>
              <img
                src={story.slides[0].imageUrl}
                alt={story.slides[0].heading}
                className={styles.storyImage}
              />
              <div className={styles.StoryText}>
                <div className={styles.Heading}>{story.slides[0].heading}</div>
                <div className={styles.Description}>{story.slides[0].description}</div>
              </div>
            </div>
          ))}
          {stories[category].length > 4 && seeMore !== category && (
            <div className={styles.seeMoreButton}>
              <button className={styles.button} onClick={() => handleSeeMore(category)}>
                See More
              </button>
            </div>
          )}
        </div>
      );
    })}
  </div>
  );
};

export default StoryDivs;
