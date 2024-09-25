import styles from './styles/App.module.css'
import { Router,Route } from 'react-router-dom'
import FilterBar from './utilities/FilterBar/FilterBar.jsx'
import Header from './utilities/Header/Header.jsx'
import LoggedInHeader from './utilities/Header/LoggedInHeader.jsx'
import { useEffect, useState } from 'react'
import RegisterModal from './utilities/Modal/RegisterModal.jsx'
import SignInModal from './utilities/Modal/SignInModal.jsx'
import AddStoryModal from './utilities/Modal/AddStoryModal.jsx'
import { useNavigate } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Logout from './utilities/Logout/Logout.jsx'

function App() {
  const [displayRegisterModal,setDisplayRegisterModal] = useState(false);
  const [displaySignInModal,setDisplaySignInModal] = useState(false);
  const [displayAddStoryModal,setDisplayAddStoryModal] = useState(false);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [isLoggedIn,setIsLoggedIn] = useState(true);
  const [displayLogout,setDisplayLogout] = useState(false);
  const navigate = useNavigate();

  function openRegisterModal(){
    setDisplayRegisterModal(true);
    setIsModalOpen(true);
    navigate('/Register',{replace : true});
  }
  function closeRegisterModal(){
    setDisplayRegisterModal(false);
    setIsModalOpen(false);
    navigate('/',{replace : true});
  }
  function openSignInModal(){
    setDisplaySignInModal(true);
    setIsModalOpen(true);
    navigate('/Login',{replace : true});
  }
  function closeSignInModal(){
    setDisplaySignInModal(false);
    setIsModalOpen(false);
    navigate('/',{replace : true});
  }
  function openAddStoryModal(){
    setDisplayAddStoryModal(true);
    setIsModalOpen(true);
    navigate('/AddStory',{replace : true});
  }
  function closeAddStoryModal(){
    setDisplayAddStoryModal(false);
    setIsModalOpen(false);
    navigate('/',{replace : true});
  }
  return (
    <>
      <Toaster />
      {isModalOpen && displayRegisterModal
      ? <div className={styles.RegisterModal}> <RegisterModal closeRegisterModal={closeRegisterModal} displayRegisterModal={displayRegisterModal} openSignInModal={openSignInModal}/> </div> 
      : ""}
      {isModalOpen && displaySignInModal
      ? <div className={styles.SignInModal}> <SignInModal closeSignInModal={closeSignInModal} displaySignInModal={displaySignInModal} setIsLoggedIn={setIsLoggedIn}/> </div>
      : ""}
      {isModalOpen && displayAddStoryModal
      ? <div className={styles.AddStoryModal}> <AddStoryModal closeAddStoryModal={closeAddStoryModal} displayAddStoryModal={displayAddStoryModal} /> </div>
      : ""}

      {isLoggedIn
      ? <LoggedInHeader setDisplayLogout={setDisplayLogout} displayLogout={displayLogout} openAddStoryModal={openAddStoryModal}/>
      : <Header openRegisterModal={openRegisterModal} openSignInModal={openSignInModal} />}

      {displayLogout 
      ? <Logout setIsLoggedIn={setIsLoggedIn} setDisplayLogout={setDisplayLogout} displayLogout={displayLogout}/>
      : ""}

      <FilterBar />
      
    </>
  )
}

export default App;
