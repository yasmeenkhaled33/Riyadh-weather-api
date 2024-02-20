import * as React from 'react';
import { createTheme,ThemeProvider } from '@mui/material'; 
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import './App.css'; 
import { useEffect } from 'react';
import { useState } from 'react';
import "moment/min/locales"
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux'
import { changevalue } from './slice';
import { feachweather } from './slice';
import moment from 'moment';


const theme=createTheme({
  typography:{
    fontFamiy:["IBM"]
  }
})

export default function App() {
  const weat = useSelector((state) => state.weather.value)
  const temp = useSelector((state) => state.weather.weather)
  const dispatch=useDispatch()
  const { t, i18n } = useTranslation();
  const [date,setdate]=useState("tt") 
  const [lang,setlang]=useState("ar")
  const [name,setname]=useState("العربية")
  function handelland () {
    if(lang==="ar") {
      setlang("en")
      setname("الانجليزية")
      moment.locale("ar")
    }else {
      setlang("ar")
      setname("arabic")
      moment.locale("en")
    }
    i18n.changeLanguage(lang)
  }
useEffect(()=>{
  setdate(moment().format("MMM Do YY"))
  dispatch(feachweather())
},[])
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container maxWidth="sm" dir={lang==="ar"?"ltr":"rtl"}>
          {/* card */}
          <div style={{height:"100vh",width:"100%",display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column"}}>
            <div className='card'style={{background:"rgb(28 52 91/36%",width:"100%",color:"white",padding:"10px",borderRadius:"15px"}} >
            <div className='content'>
              <div style={{display:"flex", alignItems:"end"}}>
                <Typography variant="h2" gutterBottom style={{marginRight:"20px"}}>
                  {t("Riyadh")}
                </Typography>
                <Typography variant="h5" gutterBottom style={{marginRight:"20px"}}>
                  {date}
                </Typography>
              </div>
              <hr/>
              <div style={{display:"flex",justifyContent:"space-around"}}>
                <div className='temp' >
                  <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                  <Typography variant="h1" gutterBottom style={{marginRight:"20px",textAlign:"right",marginBottom:"0px"}}>
                    {temp.num}
                  </Typography>
                  <img src={temp.icon}/>
                  </div>
                  <Typography variant="h6" gutterBottom style={{marginRight:"20px",textAlign:"right"}}>
                    {t(temp.desc)}
                  </Typography>
                  <div style={{display:"flex",justifyContent:"space-between",marginRight:"20px"}}>
                    <h5> {t("min")} : {temp.min}</h5>
                    <h5>|</h5>
                    <h5> {t("max")} :  {temp.max} </h5>
                  </div>
                </div>
                <CloudIcon style={{color:"white",fontSize:"200px",marginRight:"20px"}}></CloudIcon>
              </div>
            </div>
            </div>
            <div style={{display:"flex",justifyContent:"end",width:"100%"}}>
            <Button onClick={handelland} variant="text" style={{textAlign:"left",color:"white"}}>{name}</Button>
            </div>
          </div>
          {/*// card //*/}
        </Container>
      </ThemeProvider>
    </div>
  )
}