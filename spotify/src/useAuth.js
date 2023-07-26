import {useState, useEffect } from 'react'

import axios from "axios"

export default function useAuth(code) {
const [accessToken, setAccessToken]= useState()
const [refreshToken, setRefreshToken]= useState()
const [expiresIn, setExpiresIn]= useState()

useEffect(()=>{
    axios.post('http://localhost:3001/login',{
        code,  
    })
    .then(res=>{
        setAccessToken(res.date.accessToken)
        setRefreshToken(res.date.refreshToken)
        setExpiresIn(res.date.expiresIn)
        window.history.pushState({},null,"/")
    }).catch(()=>{
        window.location="/"
    })
}, [code] )

useEffect(()=>{
    if(!refreshToken ||!expiresIn) return
    const interval=setInterval(()=>{

    axios.post("http://localhost:3001/refresh",{
        refreshToken,
    })
    .then(res=>{
        setAccessToken(res.date.accessToken)
        setExpiresIn(res.date.expiresIn)
    })
    .catch(()=>{
        window.location="/"
    })
    }, (expiresIn - 60)*1000)

    return()=>clearInterval(interval)

},[refreshToken,expiresIn] )

console.log(setInterval);
return accessToken
}
