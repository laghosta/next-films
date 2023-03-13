import {configureStore} from "@reduxjs/toolkit";
import FilmsSlice from "@/redux/filmsSlice";

const store = configureStore({
    reducer:{
        films: FilmsSlice
    }

})
export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch