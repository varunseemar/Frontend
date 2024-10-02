import React, { useState } from 'react'
import styles from './FilterBar.module.css'

const FilterBar = ({setFilterCategory,setShowDivByFilter}) => {
    const [selectedCategory,setSelectedCategory] = useState('All');

    const handleFilter = async(e)=>{
        const filterName = e.currentTarget.getAttribute('data-filter');
        setFilterCategory(filterName);
        setSelectedCategory(filterName);
        setShowDivByFilter(true);
    }

  return (
    <>
        <div className={styles.FilterBarMain}>
            <div className={`${styles.FilterBarAll} ${selectedCategory === 'All' ? styles.Selected : ''}`} data-filter='All' onClick={handleFilter}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>All</span>
                </div>
            </div>
            <div className={`${styles.FilterBarFood} ${selectedCategory === 'Food' ? styles.Selected : ''}`} data-filter='Food' onClick={handleFilter}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Food</span>
                </div>
            </div>
            <div className={`${styles.FilterBarHealthAndFitness} ${selectedCategory === 'Health And Fitness' ? styles.Selected : ''}`} data-filter='Health And Fitness' onClick={handleFilter}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Health<br></br>&nbsp;&nbsp;And<br></br>Fitness</span>
                </div>
            </div>
            <div className={`${styles.FilterBarTravel} ${selectedCategory === 'Travel' ? styles.Selected : ''}`} data-filter='Travel' onClick={handleFilter}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Travel</span>
                </div>
            </div>
            <div className={`${styles.FilterBarMovie} ${selectedCategory === 'Movie' ? styles.Selected : ''}`} data-filter='Movie' onClick={handleFilter}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Movie</span>
                </div>
            </div>
            <div className={`${styles.FilterBarEducation} ${selectedCategory === 'Education' ? styles.Selected : ''}`} data-filter='Education' onClick={handleFilter}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Education</span>
                </div>
            </div>
            <div className={`${styles.FilterBarWorld} ${selectedCategory === 'World' ? styles.Selected : ''}`} data-filter='World' onClick={handleFilter}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>World</span>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default FilterBar;