import { configureStore } from '@reduxjs/toolkit'
import  weatherSlice  from './slice'


export default configureStore({
    reducer: {weather:weatherSlice},
})    