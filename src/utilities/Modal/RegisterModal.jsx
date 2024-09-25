import React from 'react'
import CrossSign from '../../Images/Cross.jpg'
import EyeIcon from '../../Images/mdi_eye-outline.svg'
import {useEffect,useRef,useState} from 'react'
import styles from './RegisterModal.module.css'
import {register} from '../../services/auth'
import toast from 'react-hot-toast'
const RegisterModal = ({closeRegisterModal,displayRegisterModal,openSignInModal}) => {
    const RegisterModalContainerRef = useRef();
    const [displayRegisterPassword,setDisplayRegisterPassword] = useState(false);
    const [refresh,setRefresh] = useState(0);
    const [loading,setLoading] = useState(false);
    const [userData,setUserData] = useState({
        username: "",
        password: "",
    })
    const [Errors,setErrors] = useState({
        username:"",
        password:"",
        userExist:"",
    });
    function toggleRegisterPassword(){
        setDisplayRegisterPassword(!displayRegisterPassword);
    }
    function checkClickOutside(e){
        if(displayRegisterModal && RegisterModalContainerRef.current && !RegisterModalContainerRef.current.contains(e.target)){
            closeRegisterModal();
        }
    }
    useEffect(()=>{
        document.addEventListener('mousedown',checkClickOutside)
        return()=>{
            document.removeEventListener('mousedown',checkClickOutside)
        }
    },[displayRegisterModal])
    
    const handleChange = (e)=>{
        setUserData({
            ...userData,
            [e.target.name] : e.target.value
        })
    }

    const handleRefresh = ()=>{
        setRefresh(refresh + 1);
    }

    const handleSubmit = async (e)=>{
        e.preventDefault();
        setLoading(true);
        let errors = {};
        if(!userData.username || userData.username.trim() === ""){
            errors.username = "Username is Required"
        }
        if(!userData.password || userData.password.trim() === ""){
            errors.password = "Password is Required"
        }
        setErrors(errors);
        if(Object.keys(errors).length > 0){
            return;
        }
        if(userData.username === "" || userData.password === ""){
            return;
        }
        try {
            const {username,password} = userData;
            const response = await register({username,password})
            console.log(response)
            if(response.status === 200){
                toast.success('Successfully Registered');
                closeRegisterModal();
                openSignInModal();
            }
        } catch (error) {
            if(error.message === "User already Registered"){
                errors.userExist = "Username Already Exist";
                setErrors(errors);
            }
            handleRefresh();
            if(Object.keys(errors).length > 0){
                return;
            }
            console.log(error.message)
        }
        finally{
            setLoading(false);
        }
    }

    return (
        <div className={styles.RegisterModalContainer} ref={RegisterModalContainerRef}>
            <div className={styles.crossIcon}>
                <img src={CrossSign} onClick={closeRegisterModal}></img>
            </div>
            <p className={styles.RegisterText}>Register</p>
            <form className={styles.RegisterForm} onSubmit={handleSubmit}>
                <label className={styles.UsernameRegister}>Username
                    <input type='text' placeholder='Enter username' value={userData.username} name='username' onChange={handleChange}></input>
                </label>
                <p className={styles.UsernameError}>{Errors.username}</p>
                <label className={styles.PasswordRegister}>Password
                    <input type={displayRegisterPassword ? 'text' : 'password'} placeholder='Enter password' name='password' value={userData.password} onChange={handleChange}></input>
                    <img src={EyeIcon} onClick={toggleRegisterPassword}></img>
                </label>
                <p className={styles.PasswordError}>{Errors.password}</p>
                <p className={styles.UsernameExist}>{Errors.userExist}</p>
                <button disabled={loading} className={styles.RegisterButton} type='submit'>Register</button>
            </form>
        </div>
    )
}

export default RegisterModal;