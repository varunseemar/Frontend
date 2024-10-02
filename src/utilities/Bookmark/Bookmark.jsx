import React from 'react'
import styles from './Bookmark.module.css'

const Bookmark = ({bookmarkedSlides}) => {
  return (
    <>
    {bookmarkedSlides.length > 0 ? <div className={styles.Bookmarks}>
        <div className={styles.bookmarktext}>
          Your Bookmarks
        </div>
        {bookmarkedSlides.map((slide, index) => (
          <div 
            key={index} 
            className={styles.IndividualBookmark} >
            <img
                src={slide.imageUrl}
                alt={slide.heading}
                className={styles.bookmarkImage}
            />
            <div className={styles.bookmarkHeadingSecription}>
                <div className={styles.Heading}>{slide.heading}</div>
                <div className={styles.Description}>{slide.description}</div>
            </div>
          </div>
        ))}
    </div> : ""}
      
    </>
  )
}

export default Bookmark;