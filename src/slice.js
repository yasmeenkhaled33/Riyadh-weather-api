import { createSlice } from '@reduxjs/toolkit'
import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
import moment from 'moment';

export const feachweather=createAsyncThunk("thuncfunction",async()=>{
    const response= await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=24.77&lon=46.73&appid=d2883a9f7207acf2119257595c0a9e25');
    const restemp=Math.round(response.data.main.temp-272.15);
    const resmin=Math.round(response.data.main.temp_min-272.15);
    const resdes=(response.data.weather[0].description);
    const resicon=(response.data.weather[0].icon);
    const dateandtime= moment().format("MMM Do YY");
    const resmax=Math.round(response.data.main.temp_max-272.15);
    // settemp({num:restemp,desc:resdes,min:resmin,max:resmax,icon:`https://openweathermap.org/img/wn/${resicon}@2x.png`})
    // setdate(dateandtime)
    return {num:restemp,min:resmin,max:resmax,desc:resdes,icon:`https://openweathermap.org/img/wn/${resicon}@2x.png`,dateandtime}
})


export const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        value: "empty",
        weather:{},
        loading:false
    },
    reducers: {
        changevalue:(state,action)=>{
            state.value="changed"
        }
    },
    extraReducers(builder){
        builder.addCase(feachweather.pending,(state,action)=>{
            state.loading=true
        }).addCase(feachweather.fulfilled,(state,action)=>{
            state.loading=false
            state.weather=action.payload
        })
    }
})


export const { changevalue } = weatherSlice.actions
export default weatherSlice.reducer
