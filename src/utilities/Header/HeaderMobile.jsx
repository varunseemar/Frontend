import React from 'react'
import styles from './HeaderMobile.module.css'
import crossblack from '../../Images/crossblack.png'

const HeaderMobile = ({setOpenMobileHeader,openRegisterModal , openSignInModal}) => {
  
  const handleClickCross = () => {
    setOpenMobileHeader(false);
  }

  return (
    <>
      <div className={styles.Header}>
          <div className={styles.cross}>
            <img src={crossblack} alt='cross' onClick={handleClickCross}></img>
          </div>
          <div className={styles.Login} onClick={openSignInModal}>
              <p>Login</p>
          </div>
          <div className={styles.Register} onClick={openRegisterModal}>
              <p>Register</p>
          </div>
      </div>
    </>
  )
}

export default HeaderMobile