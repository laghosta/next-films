import React from 'react';
import styles from './styles.module.scss'
const NotFound = () => {
    return (
        <div className={styles.notFound}>
           <span className={styles.text}>There are not films with this title</span>
        </div>
    );
};

export default NotFound;