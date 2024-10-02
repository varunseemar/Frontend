import React , {useContext} from 'react'
import styles from './DisplayStory.module.css'
import {useEffect,useRef,useState} from 'react'
import { useNavigate } from 'react-router-dom'
import left from '../../Images/left.png'
import right from '../../Images/right.png'
import storycross from '../../Images/storycross.png'
import storysend from '../../Images/storysend.png'
import whiteheart from '../../Images/whiteheart.png'
import redheart from '../../Images/redheart.png'
import bluebookmark from '../../Images/bluebookmark.png'
import whitebookmark from '../../Images/whitebookmark.png'
import download from '../../Images/download.png'
import downloaddone from '../../Images/downloaddone.png'
import toast from 'react-hot-toast'
import { BACKEND_URL } from '../../utils/constants'
import axios from 'axios'
import {ScreenSize} from '../../ScreenSize.jsx'

const DisplayStory = ({setLikedSlides,likedSlides,storyModalContentId,setBookmarkedSlides,bookmarkedSlides,activeSlide,setActiveSlide,openSignInModal,setSavedActiveSlide,isLoggedIn,closeStoryModal,storyModalContent,displayStory}) => {
    const [refresh,setRefresh] = useState(0);
    const [toastVisible, setToastVisible] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const [slides, setSlides] = useState(storyModalContent.slides);
    const DisplayStoryModalContainerRef = useRef();
    const leftSlideContainerRef = useRef();
    const rightSlideContainerRef = useRef();
    console.log(storyModalContent);
    const navigate = useNavigate();
    const isMobile = useContext(ScreenSize);

    useEffect(() => {
        const currentUrl = `/story/${storyModalContentId}/${activeSlide}`;
        navigate(currentUrl, { replace: true });
    },[storyModalContentId,activeSlide]);

    function checkClickOutside(e){
        if(displayStory && DisplayStoryModalContainerRef.current && !DisplayStoryModalContainerRef.current.contains(e.target)
            && leftSlideContainerRef.current && !leftSlideContainerRef.current.contains(e.target)
            && rightSlideContainerRef.current && !rightSlideContainerRef.current.contains(e.target)){
            closeStoryModal();
            setSavedActiveSlide(null);
        }
    }
    const handleRefresh = ()=>{
        setRefresh(refresh + 1);
    }

    const handleActiveSlide = (index) => {
        setActiveSlide(index);
    };

    const handleNext = ()=>{
        if(activeSlide < slides.length -1){
            setActiveSlide(activeSlide+1);
        }
        else{
            return;
        }
    }

    const handlePrevious = ()=>{
        if(activeSlide === 0){
            return;
        }
        else{
            setActiveSlide(activeSlide-1);
        }
    }

    const handleCopyToClipboard = () => {
        const currentUrl = `${window.location.origin}/story/${storyModalContentId}/${activeSlide}`;
        navigator.clipboard.writeText(currentUrl)
            .then(() => {
                console.log('Story URL copied to clipboard:');
                showToast();
            })
            .catch(err => {
                console.error('Failed to copy: ');
            });
    };

    const showToast = () =>{
        setToastVisible(true);
        setTimeout(() => {
            setToastVisible(false);
        },3000);
    };

    const isBookmarked = (storyId, slide) => {
        if(bookmarkedSlides.length === 0){
            return false;
        }
        return bookmarkedSlides.some((bookmark) => {
           return bookmark.storyId.toString() === storyId.toString() && bookmark.slideId.toString() === slide.toString()
        });
    };

    const handleClickBookmark = async()=>{
        const storyId = storyModalContentId;
        const slideNumber = activeSlide;
        if(!isLoggedIn){
            setSavedActiveSlide(activeSlide);
            closeStoryModal();
            toast.error("Please Login First")
            openSignInModal();
        }
        const bookmarked = isBookmarked(storyId, slideNumber+1);
        const username = localStorage.getItem('username');
        try{
            if(bookmarked){
                const response = await axios.delete(`${BACKEND_URL}/auth/bookmark/remove/${username}`, {
                    params:{
                        storyId,
                        slide:slideNumber
                    }
                });

                if(response.status === 200){
                    setBookmarkedSlides(bookmarkedSlides.filter(
                        bookmark => !(bookmark.storyId.toString() === storyId.toString() && bookmark.slideId.toString() === (slideNumber+1).toString())
                    ));
                    toast.success('Bookmark removed');
                }
            } 
            else{
                const response = await axios.post(`${BACKEND_URL}/auth/bookmark/${username}`, {
                    storyId,
                    slide: slideNumber
                });
                if(response.status === 200){
                    const response = await axios.get(`${BACKEND_URL}/auth/bookmark/${username}`);
                    if(response.status === 200){
                        const newBookMarkesSlide = response.data.bookmarks;
                        setBookmarkedSlides(newBookMarkesSlide);
                        toast.success('Bookmark added');
                    }
                }
            }
        }
        catch(error){
            console.error('Failed to update bookmark:', error);
            toast.error('Failed to update bookmark');
        }
        finally{
            handleRefresh();
        }
    }

    const isLiked = (storyId, slide) => {
        if(likedSlides.length === 0){
            return false;
        }
        return likedSlides.some((like) => {
           return like.storyId.toString() === storyId.toString() && like.slideId.toString() === slide.toString()
        });
    };

    const handleClickLike = async()=>{
        const storyId = storyModalContentId;
        const slideNumber = activeSlide;
        if(!isLoggedIn){
            setSavedActiveSlide(activeSlide);
            closeStoryModal();
            toast.error("Please Login First")
            openSignInModal();
        }
        const liked = isLiked(storyId, slideNumber+1);
        const username = localStorage.getItem('username');
        try{
            if(liked){
                const response = await axios.delete(`${BACKEND_URL}/auth/like/remove/${username}`, {
                    params:{
                        storyId,
                        slide:slideNumber
                    }
                });
                if(response.status === 200){
                    setLikedSlides(likedSlides.filter(
                        like => !(like.storyId.toString() === storyId.toString() && like.slideId.toString() === (slideNumber+1).toString())
                    ));
                    const LikeDeleteResponse = await axios.put(`${BACKEND_URL}/story/unlike/${storyId}`,{
                        slideId:slideNumber,
                    });
                    if(LikeDeleteResponse.status === 200){
                        console.log("Like Increased");
                        const updatedSlides = [...slides];
                        updatedSlides[slideNumber].totalLikes = updatedSlides[slideNumber].totalLikes - 1;
                        setSlides(updatedSlides);
                        handleRefresh();
                    }
                    toast.success('Like Removed');
                }
            } 
            else{
                const response = await axios.post(`${BACKEND_URL}/auth/like/${username}`, {
                    storyId,
                    slide: slideNumber
                });
                if(response.status === 200){
                    const response = await axios.get(`${BACKEND_URL}/auth/like/${username}`);
                    if(response.status === 200){
                        const newLikesSlide = response.data.likes;
                        setLikedSlides(newLikesSlide);
                        const LikeRemoveResponse = await axios.put(`${BACKEND_URL}/story/like/${storyId}`,{
                            slideId:slideNumber,
                        });
                        if(LikeRemoveResponse.status === 200){
                            console.log("Like Decreased");
                            const updatedSlides = [...slides];
                            updatedSlides[slideNumber].totalLikes = updatedSlides[slideNumber].totalLikes + 1;
                            setSlides(updatedSlides);
                            handleRefresh();
                        }
                        toast.success('Like Added');
                    }
                }
            }
        }
        catch(error){
            console.error('Failed to update like:', error);
            toast.error('Failed to update like');
        }
        finally{
            handleRefresh();
        }
    }

    const handleClickDownload = () => {
        if(!isLoggedIn){
            setSavedActiveSlide(activeSlide);
            closeStoryModal();
            toast.error("Please Login First")
            openSignInModal();
        }
        else{
            handleDownload();
        }
    }
    
    const handleDownload = ()=>{
        const activeImageUrl = slides[activeSlide].imageUrl;
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        fetch(proxyUrl + activeImageUrl,{
            method: 'GET',
            headers: {
            'Origin': 'http://localhost:5173'
            }
        })
        .then(response => response.blob())
            .then(blob => {
            const link = document.createElement('a');
            const url = URL.createObjectURL(blob);
            link.href = url;
            link.download = `slide-${activeSlide + 1}.jpg`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            setDownloaded(true);
            setTimeout(() => {
                setDownloaded(false);
            }, 2000);
        })
        .catch(err => console.error('Failed to download image:', err));
    }

    useEffect(()=>{
        document.addEventListener('mousedown',checkClickOutside)
        return()=>{
            document.removeEventListener('mousedown',checkClickOutside)
        }
    },[displayStory,refresh])

    return (
        <>
        {isMobile ? "" 
        : 
        <div className={styles.leftSlide} ref={leftSlideContainerRef} onClick={handlePrevious}>
            <img src={left}></img>
        </div>}
        <div className={styles.DisplayStoryModalContainer} ref={DisplayStoryModalContainerRef} style={{backgroundImage : `url(${slides[activeSlide].imageUrl})`}}>
            <div className={styles.upperhalf}>
                <div className={styles.progressBar}>
                    {slides.map((slide, index) => (
                        <div
                        key={slide._id}
                        className={`${styles.tabBar} ${index <= activeSlide ? styles.activeTab : styles.inactiveTab}`}
                        onClick={() => handleActiveSlide(index)}
                        >
                        </div>
                    ))}
                </div>
                <div className={styles.crossAndSaveBar}>
                    <img src={storycross} className={styles.storycross} onClick={closeStoryModal}></img>
                    <img src={storysend} className={styles.storysend} onClick={handleCopyToClipboard}></img>
                </div>
            </div>
            <div className={styles.middlehalf}>
                <div className={styles.mobileprev} onClick={handlePrevious}>
                </div>
                <div className={styles.mobilenext} onClick={handleNext}>
                </div>
            </div>
            <div className={styles.lowerhalf}>
                {toastVisible && (
                    <div className={styles.toast}>
                        Link copied to clipboard
                    </div>
                )}
                <div className={styles.HeadingDescription}>
                    <p className={styles.heading}>{slides[activeSlide].heading}</p>
                    <p className={styles.description}>{slides[activeSlide].description}</p>
                </div>
                {downloaded ?
                <div className={styles.downloadSuccess}>
                    Downloaded Successfully
                </div>
                : ""}
                <div className={styles.HeartBookmark}>
                    <img src={isBookmarked(storyModalContentId, activeSlide+1) ? bluebookmark : whitebookmark} className={styles.whitebookmark} onClick={handleClickBookmark}></img>
                    <img src={downloaded ? downloaddone : download} className={styles.download} onClick={handleClickDownload}></img>
                    <img src={isLiked(storyModalContentId, activeSlide+1) ? redheart : whiteheart} className={styles.whiteheart} onClick={handleClickLike}></img>
                    <p className={styles.totalLikes}>{slides[activeSlide].totalLikes}</p>
                </div>
            </div>
        </div>
        {isMobile ? "" 
        : 
        <div className={styles.rightSlide} ref={rightSlideContainerRef} onClick={handleNext}>
            <img src={right}></img>
        </div>}
        </>
    )
}

export default DisplayStory;