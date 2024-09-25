import React from 'react'
import CrossSign from '../../Images/Cross.jpg'
import {useEffect,useRef,useState} from 'react'
import styles from './AddStoryModal.module.css'
//import {AddStory} from '../../services/auth'
import toast from 'react-hot-toast'
const AddStoryModal = ({closeAddStoryModal,displayAddStoryModal}) => {
    const AddStoryModalContainerRef = useRef();
    // const [refresh,setRefresh] = useState(0);
    const [loading,setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState(0);
    const [formState, setFormState] = useState([
        { heading: '', description: '', imageUrl:'', category:'' }, 
        { heading: '', description: '', imageUrl:'', category:'' }, 
        { heading: '', description: '', imageUrl:'', category:'' }, 
      ]);

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
    
    // const handleChange = (e)=>{
    //     setUserData({
    //         ...userData,
    //         [e.target.name] : e.target.value
    //     })
    // }

    // const handleRefresh = ()=>{
    //     setRefresh(refresh + 1);
    // }

    // const handleSubmit = async (e)=>{
    //     e.preventDefault();
    //     setLoading(true);

    //     if(userData.username === "" || userData.password === ""){
    //         return;
    //     }
    //     try {
            
    //     } catch (error) {
            
    //     }
    //     finally{
    //         setLoading(false);
    //     }
    // }

    const addTab = () => {
        if (formState.length < 6) {
          setFormState([...formState, { heading: '', description: '', imageUrl:'', category:'' }]); 
          setActiveTab(formState.length);
        }
    };

    const deleteTab = (index) => {

        if (formState.length > 3) {
          const newFormState = formState.filter((_, i) => i !== index);
          setFormState(newFormState);
          setActiveTab((prevActive) => {
            if (index === prevActive && index === formState.length - 1) {
              return prevActive - 1;
            }
            return prevActive;
          });
        }
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const newFormState = [...formState];
        newFormState[index][name] = value;
        setFormState(newFormState);
    };

    const renderForm = (index)=>{
        <form>
            <div>
                <label>Heading:</label>
                <input
                type="text"
                name="heading"
                placeholder='Your Heading'
                value={formState[index].heading}
                onChange={(e) => handleInputChange(index, e)}
                />
            </div>
            <div>
                <label>Description:</label>
                <textarea
                name="description"
                placeholder='Story Description'
                value={formState[index].description}
                onChange={(e) => handleInputChange(index, e)}
                />
            </div>
            <div>
                <label>Image:</label>
                <input
                type="text"
                name="imageUrl"
                placeholder='Add Image url'
                value={formState[index].imageUrl}
                onChange={(e) => handleInputChange(index, e)}
                />
            </div>
            <div>
                <label>Category:</label>
                <select name='category' value={formState[index].category} defaultValue={""}>
                    <option value="">Select Category</option>
                    <option value="1">Food</option>
                    <option value="2">Health and Fitness</option>
                    <option value="3">Travel</option>
                    <option value="4">Movie</option>
                    <option value="5">Education</option>
                    <option value="6">World</option>
                </select>
            </div>
        </form>
    }

    return (
        <div className={styles.AddStoryModalContainer} ref={AddStoryModalContainerRef}>
            <div className={styles.crossIcon}>
                <img className={styles.crossIconimg} src={CrossSign} onClick={closeAddStoryModal}></img>
            </div>
            <p className={styles.AddSixSlideText}>Add upto 6 slides</p>
                <div className={styles.TabBar}>
                    {formState.map((_, index) => (
                        <div
                            key={index}
                            onClick={() => setActiveTab(index)}
                            className={styles.Tabs}
                            data-active={activeTab === index ? 'true' : 'false'}
                        >
                            Slide {index + 1}
                            {index > 2 ?<img className={styles.crossIconInside} src={CrossSign} onClick={()=>deleteTab(activeTab)}></img> : ""}
                        </div>
                    ))}
                    {formState.length === 6 ? "" :
                        <div onClick={addTab} disabled={formState.length >= 6} className={styles.Tabs}>
                            Add+
                        </div>
                    }
                </div>
                <div className="tab-content">
                    {renderForm(activeTab)}
                </div>
                <div disabled={loading} className={styles.Previousdiv} >Previous</div>
                <div disabled={loading} className={styles.Nextdiv} >Next</div>  
                <button disabled={loading} className={styles.AddStoryButton} type='submit'>AddStory</button>
        </div>
    )
}

export default AddStoryModal;