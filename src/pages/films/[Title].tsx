import React from 'react';
import axios from "axios";
import {API_KEY} from "@/utils";
import {IFilm, SecRes} from "@/types";
import styles from './styles.module.scss'
import {Button} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";
interface Props{
    data : SecRes
}
export const getServerSideProps = async (context:any) => {
    const {data} = await axios.get(`https://www.omdbapi.com/?t=${context.params.Title}&apikey=${API_KEY}`)
    if (!data) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            data
        }
    }
}
const FilmPage = ({data}:Props) => {
    const router = useRouter()
    const finalSlashIndex = router.asPath.lastIndexOf('/')
    const previousPath = router.asPath.slice(0, finalSlashIndex)
    return (
        <div className={styles.filmPage}>
            <Link className={styles.back} href={previousPath}>Go back</Link>
            <img className={styles.filmImg} src={data.Poster !== "N/A" ? data.Poster : "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg" } alt=""/>
            <span className={styles.title}>{data.Title}</span>
            <span className={styles.year}>{data.Year}</span>
            <span className={styles.actors}><strong>Actors:</strong> {data.Actors}</span>
            <div className={styles.plot}>{data.Plot}</div>
        </div>
    );
};

export default FilmPage;