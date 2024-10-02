import React from 'react'
import styles from './MobileHeader.module.css'
import Menu from '../../Images/Menu.png'

const MobileHeader = ({setOpenMobileLoggedInHeader,setOpenMobileHeader,isLoggedIn}) => {
    const handleClickMenu = () => {
        if(isLoggedIn){
            setOpenMobileLoggedInHeader(true);
            setOpenMobileHeader(false);
        }
        else{
            setOpenMobileLoggedInHeader(false);
            setOpenMobileHeader(true);
        }
    }
    return (
    <div className={styles.Header} onClick={handleClickMenu}>
        <img src={Menu} alt='Menu'></img>
    </div>
    )
}

export default MobileHeader;