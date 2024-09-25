import styles from "./Header.module.css"
import React from 'react'

const Header = ({openRegisterModal , openSignInModal}) => {
  return (
    <>
      <div className={styles.Header}>
          <div className={styles.Register} onClick={openRegisterModal}>
              <p>Register Now</p>
          </div>
          <div className={styles.Login} onClick={openSignInModal}>
              <p>Sign In</p>
          </div>
      </div>
    </>
  )
}

export default Header;