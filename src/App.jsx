import React , {useContext} from 'react'
import styles from './styles/App.module.css'
import {useLocation} from 'react-router-dom';
import FilterBar from './utilities/FilterBar/FilterBar.jsx'
import Header from './utilities/Header/Header.jsx'
import LoggedInHeader from './utilities/Header/LoggedInHeader.jsx'
import { useEffect, useState } from 'react'
import RegisterModal from './utilities/Modal/RegisterModal.jsx'
import SignInModal from './utilities/Modal/SignInModal.jsx'
import AddStoryModal from './utilities/Modal/AddStoryModal.jsx'
import { useNavigate , useParams} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Logout from './utilities/Logout/Logout.jsx'
import StoryDivs from './utilities/Story/StoryDivs.jsx'
import DisplayStory from './utilities/Modal/DisplayStory.jsx'
import Bookmark from './utilities/Bookmark/Bookmark.jsx'
import axios from 'axios';
import { BACKEND_URL } from './utils/constants.js';
import {ScreenSize} from './ScreenSize.jsx'
import HeaderMobile from './utilities/Header/HeaderMobile.jsx'
import LoggedInHeaderMobile from './utilities/Header/LoggedInHeaderMobile.jsx'
import MobileHeader from './utilities/Header/MobileHeader.jsx'
import Userstories from './utilities/Userstories/Userstories.jsx'

function App() {
  const [displayRegisterModal,setDisplayRegisterModal] = useState(false);
  const [displaySignInModal,setDisplaySignInModal] = useState(false);
  const [displayAddStoryModal,setDisplayAddStoryModal] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const [displayLogout,setDisplayLogout] = useState(false);
  const [editUserStory,setEditUserStory] = useState(false);
  const [editUserStoryId,setEditUserStoryId] = useState(null);
  const [refreshState,setRefreshState] = useState(0);
  const [filterCategory,setFilterCategory] = useState(null);
  const [showDivByFilter,setShowDivByFilter] = useState(false);
  const [displayStory,setDisplayStory] = useState(false);
  const [storyModalContent,setStoryModalContent] = useState({})
  const [storyModalContentId,setStoryModalContentId] = useState(null);
  const [savedActiveSlide, setSavedActiveSlide] = useState(null);
  const [activeSlide,setActiveSlide] = useState(0);
  const [bookmarkedSlides,setBookmarkedSlides] = useState([]);
  const [likedSlides,setLikedSlides] = useState([]);
  const [openMobileHeader,setOpenMobileHeader] = useState(false);
  const [openMobileLoggedInHeader,setOpenMobileLoggedInHeader] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const {storyId,slideId} = useParams();
  const isMobile = useContext(ScreenSize);

  useEffect(() => {
      if(storyId && slideId){
        handleOpenModal(storyId,Number(slideId));
      }
  },[storyId,slideId]);

  const fetchStoryById = async(storyId,slideId) => {
    try{
      const response = await axios.get(`${BACKEND_URL}/story/${storyId}`)
      if(response.status === 200){
      const story = response.data;
      const slide = story.slides.find(slide => slide.slideId.toString() === slideId.toString());
        if(slide){
          return true;
        }
        else{
          return false;
        }
      }
      else{
        return false;
      }
    }
    catch(error){
      console.error(error);
      return false;
    }
  };

  const handleOpenModal = async(storyId,slideId) => {
    const storyExists = await fetchStoryById(storyId,slideId + 1);
      if(!storyExists){
        navigate('/notfound');
      } 
      else{
        setStoryModalContentId(storyId);
        setActiveSlide(slideId);
        const response = await axios.get(`${BACKEND_URL}/story/${storyId}`)
        setStoryModalContent(response.data);
        openStoryModal();
        console.log(`Opening modal for story ID: ${storyId}`);
        setIsModalOpen('Story');
        setDisplayStory(true);
      }
  };

  useEffect(()=>{
    const loggedInUser = localStorage.getItem('username')
    if(loggedInUser){
      setIsLoggedIn(true);
      fetchBookmarkedSlides();
      fetchLikedSlides();
    }
  },[isLoggedIn])

  const fetchLikedSlides = async () => {
    try{
        const loggedInUser = localStorage.getItem('username')
        const response = await axios.get(`${BACKEND_URL}/auth/like/${loggedInUser}`);
        setLikedSlides(response.data.likes);
    } 
    catch(error){
        console.error('Failed to fetch likes:', error);
    }
  };

  const fetchBookmarkedSlides = async () => {
    try{
        const loggedInUser = localStorage.getItem('username')
        const response = await axios.get(`${BACKEND_URL}/auth/bookmark/${loggedInUser}`);
        setBookmarkedSlides(response.data.bookmarks);
    } 
    catch(error){
        console.error('Failed to fetch bookmarks:', error);
    }
  };

  function openBookmarks() {
    navigate('/bookmarks');
  }
  
  function openUserstories() {
    navigate('/userstories');
  }

  function openRegisterModal(){
    setDisplayRegisterModal(true);
    setIsModalOpen('Register');
    navigate('/',{replace : false});
  }
  function closeRegisterModal(){
    setDisplayRegisterModal(false);
    setIsModalOpen();
    navigate('/',{replace : false});
  }
  function openSignInModal(){
    setDisplaySignInModal(true);
    setIsModalOpen('SignIn');
    navigate('/',{replace : false});
  }
  function closeSignInModal(){
    setDisplaySignInModal(false);
    setIsModalOpen();
    if(savedActiveSlide !== null) {
      openStoryModal(); 
      setTimeout(() => {
        setActiveSlide(savedActiveSlide);
      }, 100);
      setSavedActiveSlide(null);
    } 
    else{
      navigate('/', { replace: false });
    }
  }
  function openAddStoryModal(){
    setDisplayAddStoryModal(true);
    setIsModalOpen('AddStory');
    navigate('/',{replace : false});
  }
  function closeAddStoryModal(){
    setDisplayAddStoryModal(false);
    setIsModalOpen();
    navigate('/',{replace : false});
  }
  function openStoryModal(){
    setDisplayStory(true);
    setIsModalOpen('Story');
  }
  function closeStoryModal(){
    setDisplayStory(false);
    setIsModalOpen();
    setActiveSlide(0);
    navigate('/',{replace : false});
  }
  return (
    <>
      <Toaster />
      {isModalOpen === 'Register' && displayRegisterModal
      ? <div className={styles.RegisterModal}> <RegisterModal closeRegisterModal={closeRegisterModal} displayRegisterModal={displayRegisterModal} openSignInModal={openSignInModal}/> </div> 
      : ""}
      {isModalOpen === 'SignIn' && displaySignInModal
      ? <div className={styles.SignInModal}> <SignInModal openStoryModal={openStoryModal} storyModalContent={storyModalContent} savedActiveSlide={savedActiveSlide} closeSignInModal={closeSignInModal} displaySignInModal={displaySignInModal} setIsLoggedIn={setIsLoggedIn}/> </div>
      : ""}
      {isModalOpen === 'AddStory' && displayAddStoryModal
      ? <div className={styles.AddStoryModal}> <AddStoryModal editUserStory={editUserStory} closeAddStoryModal={closeAddStoryModal} displayAddStoryModal={displayAddStoryModal} editUserStoryId={editUserStoryId} setRefreshState={setRefreshState} refreshState={refreshState}/> </div>
      : ""}
      {isModalOpen === 'Story' && displayStory
      ? <div className={styles.StoryModal}> <DisplayStory setLikedSlides={setLikedSlides} likedSlides={likedSlides} storyModalContentId={storyModalContentId} setBookmarkedSlides={setBookmarkedSlides} bookmarkedSlides={bookmarkedSlides} activeSlide={activeSlide} setActiveSlide={setActiveSlide} openSignInModal={openSignInModal} setSavedActiveSlide={setSavedActiveSlide} isLoggedIn={isLoggedIn} closeStoryModal={closeStoryModal} storyModalContent={storyModalContent} displayStory={displayStory}/> </div>
      : ""}

      {!isMobile && (isLoggedIn
      ? (<LoggedInHeader openBookmarks={openBookmarks} setDisplayLogout={setDisplayLogout} displayLogout={displayLogout} openAddStoryModal={openAddStoryModal} setEditUserStory={setEditUserStory} />)
      : (<Header openRegisterModal={openRegisterModal} openSignInModal={openSignInModal} />))}

      {isMobile && (<div className={styles.MobileHeader}><MobileHeader setOpenMobileLoggedInHeader={setOpenMobileLoggedInHeader} setOpenMobileHeader={setOpenMobileHeader} isLoggedIn={isLoggedIn}/></div>)}

      {isMobile && !isLoggedIn && openMobileHeader && (<div className={styles.HeaderMobile}><HeaderMobile setOpenMobileHeader={setOpenMobileHeader} openRegisterModal={openRegisterModal} openSignInModal={openSignInModal} /></div>)}  

      {isMobile && isLoggedIn && openMobileLoggedInHeader && (<div className={styles.LoggedInHeaderMobile}><LoggedInHeaderMobile openUserstories={openUserstories} setIsLoggedIn={setIsLoggedIn} setLikedSlides={setLikedSlides} setDisplayStory={setDisplayStory} setStoryModalContentId={setStoryModalContentId} setIsModalOpen={setIsModalOpen} setBookmarkedSlides={setBookmarkedSlides} setActiveSlide={setActiveSlide} setSavedActiveSlide={setSavedActiveSlide} setStoryModalContent={setStoryModalContent} setOpenMobileLoggedInHeader={setOpenMobileLoggedInHeader} openBookmarks={openBookmarks} openAddStoryModal={openAddStoryModal} setEditUserStory={setEditUserStory} /></div>)}  

      {displayLogout && !isMobile
      ? <div className={styles.LogoutMain}><Logout setLikedSlides={setLikedSlides} setDisplayStory={setDisplayStory} setStoryModalContentId={setStoryModalContentId} setIsModalOpen={setIsModalOpen} setBookmarkedSlides={setBookmarkedSlides} setActiveSlide={setActiveSlide} setSavedActiveSlide={setSavedActiveSlide} setStoryModalContent={setStoryModalContent} setIsLoggedIn={setIsLoggedIn} setDisplayLogout={setDisplayLogout} displayLogout={displayLogout}/></div>
      : ""}
      {location.pathname !== '/bookmarks' && location.pathname !== '/userstories' && (
        <>
        <FilterBar setFilterCategory={setFilterCategory} setShowDivByFilter={setShowDivByFilter}/>
        <StoryDivs setStoryModalContentId={setStoryModalContentId} setStoryModalContent={setStoryModalContent} openStoryModal={openStoryModal} isLoggedIn={isLoggedIn} openAddStoryModal={openAddStoryModal} setEditUserStory={setEditUserStory} setEditUserStoryId={setEditUserStoryId} refreshState={refreshState} filterCategory={filterCategory} showDivByFilter={showDivByFilter}/>
        </>
      )}
      {location.pathname === '/bookmarks' && (
        <Bookmark bookmarkedSlides={bookmarkedSlides}/>
      )}
      {location.pathname === '/userstories' && isMobile && (
        <Userstories isLoggedIn={isLoggedIn} setStoryModalContentId={setStoryModalContentId} setStoryModalContent={setStoryModalContent} openStoryModal={openStoryModal} openAddStoryModal={openAddStoryModal} setEditUserStory={setEditUserStory} setEditUserStoryId={setEditUserStoryId}/>
      )}
    </>
  )
}

export default App;
