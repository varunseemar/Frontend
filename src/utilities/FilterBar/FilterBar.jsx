import React from 'react'
import styles from './FilterBar.module.css'

const FilterBar = () => {
  return (
    <>
        <div className={styles.FilterBarMain}>
            <div className={styles.FilterBarAll}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>All</span>
                </div>
            </div>
            <div className={styles.FilterBarFood}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Food</span>
                </div>
            </div>
            <div className={styles.FilterBarHealthAndFitness}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Health<br></br>&nbsp;&nbsp;And<br></br>Fitness</span>
                </div>
            </div>
            <div className={styles.FilterBarTravel}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Travel</span>
                </div>
            </div>
            <div className={styles.FilterBarMovie}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Movie</span>
                </div>
            </div>
            <div className={styles.FilterBarEducation}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>Education</span>
                </div>
            </div>
            <div className={styles.FilterBarWorld}>
                <div className={styles.Overlay}>
                    <span className={styles.OverlayText}>World</span>
                </div>
            </div>
        </div>
    </>
    
  )
}

export default FilterBar;