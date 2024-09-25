import React from 'react'
import {useEffect,useRef,useState} from 'react'
import styles from './SignInModal.module.css'
import CrossSign from '../../Images/Cross.jpg'
import EyeIcon from '../../Images/mdi_eye-outline.svg'
import {login} from '../../services/auth'
import toast from 'react-hot-toast'
const SignInModal = ({closeSignInModal,displaySignInModal,setIsLoggedIn}) => {
    const SignInModalContainerRef = useRef();
    const [displaySignInPassword,setDisplaySignInPassword] = useState(false);
    const [refresh,setRefresh] = useState(0);
    const [loading,setLoading] = useState(false);
    const [userData,setUserData] = useState({
        username: "",
        password: "",
        wrongLogin : "",
    })
    const [Errors,setErrors] = useState({
        username:"",
        password:"",
    });
    function toggleSignInPassword(){
        setDisplaySignInPassword(!displaySignInPassword);
    }
    function checkClickOutside(e){
        if(displaySignInModal && SignInModalContainerRef.current && !SignInModalContainerRef.current.contains(e.target)){
            closeSignInModal();
        }
    }
    useEffect(()=>{
        document.addEventListener('mousedown',checkClickOutside)
        return()=>{
            document.removeEventListener('mousedown',checkClickOutside)
        }
    },[displaySignInModal])

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
            const response = await login({username,password})
            console.log(response)
            if(response.status === 200){
                const {data} = response;
                localStorage.setItem('username', username)
                localStorage.setItem('token', data.token)
                toast.success('Successfully Logged In');
                setIsLoggedIn(true);
                closeSignInModal();
            }
        } catch (error) {
            if(error.message === "Wrong Username or Password"){
                errors.wrongLogin = "Wrong Username or Password";
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
        <div className={styles.SignInModalContainer} ref={SignInModalContainerRef}>
            <div className={styles.crossIcon}>
                <img src={CrossSign} onClick={closeSignInModal}></img>
            </div>
            <p className={styles.SignInText}>Login</p>
            <form className={styles.SignInForm} onSubmit={handleSubmit}>
                <label className={styles.UsernameSignIn}>Username
                    <input type='text' placeholder='Enter username' value={userData.username} name='username' onChange={handleChange}></input>
                </label>
                <p className={styles.UsernameError}>{Errors.username}</p>
                <label className={styles.PasswordSignIn}>Password
                    <input type= {displaySignInPassword ? 'text' : 'password'} placeholder='Enter password' name='password' value={userData.password} onChange={handleChange}></input>
                    <img src={EyeIcon} onClick={toggleSignInPassword}></img>
                </label>
                <p className={styles.PasswordError}>{Errors.password}</p>
                <p className={styles.WrongLogInError}>{Errors.wrongLogin}</p>
                <button disabled={loading} className={styles.SignInButton} type='submit'>Login</button>
            </form>
        </div>
    )
}

export default SignInModal;