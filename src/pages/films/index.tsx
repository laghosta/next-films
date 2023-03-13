import Head from 'next/head'
import Image from 'next/image'
import Link from "next/link";
import axios from "axios";
import {IFilm} from "@/types";
import {API_KEY} from "@/utils";
import {TextField, Button, Skeleton} from "@mui/material";
import {ChangeEvent, useEffect, useRef} from "react";
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {getFilms, setCurrentPage, setDefaultFilms, setSearchValue} from "@/redux/filmsSlice";
import styles from './styles.module.scss'
import Film from "@/components/film/film";
import NotFound from "@/components/NotFound/NotFound";
interface Props{
    data : IFilm[],
    title : string
}

export const getServerSideProps = async () => {
    const {data} = await axios.get(`https://www.omdbapi.com/?s=Star+Wars&&apikey=${API_KEY}`)
    if (!data){
        return {
            notFound :true,
        }
    }
    return {
        props:{
            data : data.Search,
            title : "Star Wars"
        }
    }
}
export default function Films({data, title}:Props) {
    const dispatch = useAppDispatch()
    useEffect(()=>{
        dispatch(setDefaultFilms(data))
    }, [])
    const searchValue = useAppSelector(state=>state.films.searchValue)
    const currentPage = useAppSelector(state=>state.films.currentPage)
    const films = useAppSelector(state=>state.films.data)
    const isLoading = useAppSelector(state=>state.films.isLoading)
    const searchRef = useRef(null)

    useEffect(()=>{
        dispatch(getFilms({searchValue, currentPage}))
    }, [currentPage])
    const onSearch = (event:ChangeEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if(searchValue.trim() === "") {
            alert("Search field is empty")
            return 0
        }
        else{
            dispatch(getFilms({searchValue, currentPage}))
        }
    }
    return (
    <>
    <Head>
        <title>Home Page</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
            href="https://fonts.googleapis.com/css2?family=Montserrat:wght@200;400&display=swap"
            rel="stylesheet"
        />
    </Head>
    <div className={styles.wrapper}>
        <form className={styles.search}>
            <TextField
                sx={{".css-1d3z3hw-MuiOutlinedInput-notchedOutline":{borderColor:"#1976d2", color:"#1976d2"}, ".css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input":{color:"#1976d2"}, ".css-14lo706>span":{color:"#1976d2"}, ".css-1jy569b-MuiFormLabel-root-MuiInputLabel-root":{color:"#1976d2"}, ".css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root":{color:"#1976d2"} }} className={styles.searchField} onChange={(event) => dispatch(setSearchValue(event.target.value))} value={searchValue} label="Search Film" variant="outlined" />
            <Button type="submit" sx={{height:"7ch", width:"10ch"}} disabled={searchValue.trim() === ""} onClick={(e)=>onSearch(e)} variant="outlined">Search</Button>
        </form>
        <div className={styles.films}>
            {
                isLoading === "loading" ?
                    [...Array(10)].map((el, id)=>
                        <Skeleton key={id} variant="rectangular" width={315} height={410} sx={{borderRadius:"10px", marginBottom : "20px"}} />
                    )
                    :
                    films ?
                    films.map((el, id) =>
                        <Link key={id} href={`/films/${el.Title}`}>
                            <Film film={el}/>
                        </Link>
                    )
                    :
                    <NotFound/>
            }
        </div>
        {
            films &&
            <div className={styles.pagesButtons}>
                <Button disabled={currentPage <= 1} onClick={()=>dispatch(setCurrentPage(currentPage-1))} variant="outlined">Back</Button>
                <Button disabled={!films || films.length < 10} onClick={()=>dispatch(setCurrentPage(currentPage+1))} variant="outlined">Forward</Button>
            </div>
        }

    </div>
    </>
  )
}
