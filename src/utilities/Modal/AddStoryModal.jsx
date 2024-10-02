import React, {useContext} from 'react'
import CrossSign from '../../Images/Cross.jpg'
import {useEffect,useRef,useState} from 'react'
import styles from './AddStoryModal.module.css'
import {postStory} from '../../services/storyServices'
import { updateStory } from '../../services/storyServices'
import toast from 'react-hot-toast'
import axios from 'axios'
import { BACKEND_URL } from '../../utils/constants'
import {ScreenSize} from '../../ScreenSize.jsx'

const AddStoryModal = ({editUserStory,closeAddStoryModal,displayAddStoryModal,editUserStoryId,setRefreshState,refreshState}) => {
    const AddStoryModalContainerRef = useRef();
    const [loading,setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [errors, setErrors] = useState({});
    const [formState, setFormState] = useState([
        { heading: '', description: '', imageUrl:'', category:'', slideId:1 }, 
        { heading: '', description: '', imageUrl:'', category:'', slideId:2 }, 
        { heading: '', description: '', imageUrl:'', category:'', slideId:3 }, 
    ]);

    const isMobile = useContext(ScreenSize);

    useEffect(()=>{
        if (editUserStory && editUserStoryId) {
            fetchStoryData(editUserStoryId);
        }
    },[editUserStory, editUserStoryId]);

    const fetchStoryData = async (id) => {
        try {
            setLoading(true);
            const response = await axios.get(`${BACKEND_URL}/story/edit/${id}`);
            const storyData = response.data;

            if (storyData) {
                const updatedFormState = storyData.slides.map((slide, index) => ({
                    heading: slide.heading || '',
                    description: slide.description || '',
                    imageUrl: slide.imageUrl || '',
                    category: slide.category || '',
                    slideId: index + 1,
                }));
                setFormState(updatedFormState);
            }
        } catch (error) {
            console.error("Error fetching story data:", error);
            toast.error("Failed to load story data.");
        } finally {
            setLoading(false);
        }
    };

    function checkClickOutside(e){
        if(displayAddStoryModal && AddStoryModalContainerRef.current && !AddStoryModalContainerRef.current.contains(e.target)){
            closeAddStoryModal();
        }
    }
    useEffect(()=>{
        document.addEventListener('mousedown',checkClickOutside)
        return()=>{
            document.removeEventListener('mousedown',checkClickOutside)
        }
    },[displayAddStoryModal])
    
    const checkErrors = () => {
        let formErrors = {};
        formState.forEach((slide, index) => {
            let slideErrors = {};
            if (!slide.heading || slide.heading.trim() === "") {
                slideErrors.heading = "Heading is required";
            }
            if (!slide.description || slide.description.trim() === "") {
                slideErrors.description = "Description is required";
            }
            if (!slide.imageUrl || slide.imageUrl.trim() === "") {
                slideErrors.imageUrl = "Image URL is required";
            }
            if (!slide.category || slide.category.trim() === "") {
                slideErrors.category = "Category is required";
            }
            if (Object.keys(slideErrors).length > 0) {
                formErrors[index] = slideErrors;
            }
        });
        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async(e)=>{
        e.preventDefault();
        setLoading(true);
        if (!checkErrors()) {
            toast.error("Please fill out all required fields.");
            setLoading(false);
            return;
        }
        try {
            const username = localStorage.getItem('username')
            const token = localStorage.getItem('token')
            if (editUserStory && editUserStoryId) {
                const response = await updateStory({formState,username,token,editUserStoryId})
                console.log(response)
                if (response.status === 200) {
                    const {data} = response;
                    console.log(data);
                    toast.success('Story Updated Successfully');
                    setRefreshState(refreshState + 1);
                    closeAddStoryModal();
                }
            }
            else{
                const response = await postStory({formState,username,token})
                console.log(response)
                if(response.status === 200){
                    const {data} = response;
                    console.log(data);
                    toast.success('Story Successfully Posted');
                    setRefreshState(refreshState + 1);
                    closeAddStoryModal();
                }
            }
        } 
        catch (error) {
            console.log(error.message)
        }
        finally {
            setLoading(false);
        }
    }
    
    const addTab = () => {
        if (formState.length < 6) {
            setFormState([
                ...formState,
                { heading: '', description: '', imageUrl: '', category: '', slideId: formState.length + 1 }
            ]);
            setActiveTab(formState.length);
        }
    };

    const deleteTab = (index) => {
        if (formState.length > 3) {
            const newFormState = formState.filter((_, i) => i !== index);
            setFormState(newFormState);

            if (activeTab >= newFormState.length) {
                setActiveTab(newFormState.length - 1);
            }
        }
    };

    const handleInputChange = (index, event) => { 
        const { name, value } = event.target;
        console.log(name);
        console.log(value);
        if(name === 'category'){
            const newFormState = [...formState];
            const updatedFormState = newFormState.map(array=>({
                ...array,
                category:value
            }));
            setFormState(updatedFormState);
        }
        else{
            const newFormState = [...formState];
            newFormState[index][name] = value;
            setFormState(newFormState);
        }

    };

    const renderForm = (index) => {
        if (formState.length === 0) return null;
    
        return (
            <form className={styles.form}>
                <div>
                    <label>Heading:</label>
                    <input
                        type="text"
                        name="heading"
                        className={styles.formHeading}
                        placeholder='Your Heading'
                        value={formState[index]?.heading || ''}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    {errors[index]?.heading && <span className={styles.error}>{errors[index]?.heading}</span>}
                </div>
                <div className={styles.descriptiondiv}>
                    <label>Description:</label>
                    <textarea
                        name="description"
                        placeholder='Story Description'
                        className={styles.formDescription}
                        value={formState[index]?.description || ''}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    {errors[index]?.description && <span className={styles.error}>{errors[index]?.description}</span>}
                </div>
                <div>
                    <label>Image:</label>
                    <input
                        type="text"
                        name="imageUrl"
                        placeholder='Add Image url'
                        className={styles.formImageUrl}
                        value={formState[index]?.imageUrl || ''}
                        onChange={(e) => handleInputChange(index, e)}
                    />
                    {errors[index]?.imageUrl && <span className={styles.error}>{errors[index]?.imageUrl}</span>}
                </div>
                <div className={styles.categorydiv}>
                    <label>Category:</label>
                    <select 
                        name='category' 
                        value={formState[index]?.category || ''} 
                        className={styles.formCategory} 
                        onChange={(e) => handleInputChange(index, e)}
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Health And Fitness">Health and Fitness</option>
                        <option value="Travel">Travel</option>
                        <option value="Movie">Movie</option>
                        <option value="Education">Education</option>
                        <option value="World">World</option>
                    </select>
                    {errors[index]?.category && <span className={styles.error}>{errors[index]?.category}</span>}
                    {!isMobile && <p className={styles.slideText}>This field will be <br></br>common for all slides</p>}
                </div>
            </form>
        );
    };

    const handleNext = ()=>{
        if(activeTab < formState.length -1){
            setActiveTab(activeTab+1);
        }
        else{
            return;
        }
    }

    const handlePrevious = ()=>{
        if(activeTab === 0){
            return;
        }
        else{
            setActiveTab(activeTab-1);
        }
    }
    
    return (
        <div className={styles.AddStoryModalContainer} ref={AddStoryModalContainerRef}>
            <div className={styles.crossIcon}>
                <img className={styles.crossIconimg} src={CrossSign} onClick={closeAddStoryModal}></img>
            </div>
            {!isMobile && <p className={styles.AddSixSlideText}>Add upto 6 slides</p>}
            {isMobile && <p>Add story to feed</p>}
                <div className={styles.TabBar}>
                    {formState.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={styles.Tabs}
                            data-active={activeTab === index ? 'true' : 'false'}
                        >
                            {!isMobile && <>Slide {index + 1}</>}
                            {isMobile && <><p>Slide</p><br></br>
                            <p>{index + 1}</p></>}
                            {index > 2 ?<img className={styles.crossIconInside} src={CrossSign} onClick={() => deleteTab(index)}></img> : ""}
                        </div>
                    ))}
                    {formState.length === 6 ? "" :
                        <div onClick={addTab} disabled={formState.length >= 6} className={styles.Tabs}>
                            Add+
                        </div>
                    }
                </div>
                <div className={styles.formdiv}>
                    {renderForm(activeTab >= formState.length ? formState.length - 1 : activeTab)}
                </div>
                <div className={styles.buttons}>
                    {!isMobile && <div disabled={loading} className={styles.Previousdiv} onClick={handlePrevious}><p>Previous</p></div>}
                    {!isMobile && <div disabled={loading} className={styles.Nextdiv} onClick={handleNext}><p>Next</p></div>}  
                    <button disabled={loading} className={styles.PostButton} onClick={handleSubmit} type='submit'><p>Post</p></button>
                </div>
        </div>
    )
}

export default AddStoryModal;