import React from 'react';
import styles from './film.module.scss'
import {IFilm} from "@/types";
interface Props{
    film : IFilm
}
const Film = ({film}:Props) => {
    return (
        <div className={styles.film}>
            <img src={film.Poster !== "N/A" ? film.Poster : `https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg` } alt="film poster"/>
            <span className={styles.title}><strong>{film.Title}</strong></span>
            <span className={styles.year}>{film.Year}</span>
        </div>
    );
};

export default Film;