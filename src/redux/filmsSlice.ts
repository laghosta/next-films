import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {IData, MainReqProps, MainRes} from "@/types";
import axios from "axios";
import {API_KEY} from "@/utils";
export const getFilms = createAsyncThunk("films/getfilms", async ({searchValue, currentPage}:MainReqProps):Promise<MainRes> => {
    const {data} = await axios.get(`https://www.omdbapi.com/?s=${searchValue}&page=${currentPage}&apikey=${API_KEY}`)
    return data
})
const initialState:IData = {
    data:null,
    currentPage : 1,
    searchValue : "Star Wars",
    isLoading: "loading"
}
const filmsSlice = createSlice({
    name:"films",
    initialState,
    reducers:{
        setCurrentPage : (state, action) => {
            state.currentPage = action.payload
        },
        setSearchValue : (state, action) => {
            state.searchValue = action.payload
        },
        setDefaultFilms:(state, action) => {
            state.data = action.payload
        }
    },
    extraReducers:
    builder => {
        builder.addCase(getFilms.pending, (state)=>{
            state.data = null
            state.isLoading = "loading"
        })
        builder.addCase(getFilms.fulfilled, (state, action)=>{
            state.data = action.payload.Search
            state.isLoading = "loaded"
        })
        builder.addCase(getFilms.rejected, (state)=>{
            state.data = null
            state.isLoading = "loaded"
        })
    }
})
export const {setCurrentPage, setSearchValue,setDefaultFilms} = filmsSlice.actions
export default filmsSlice.reducer