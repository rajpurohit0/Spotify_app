import {useState, useEffect } from 'react'

import axios from "axiocds"

export default function userAuth(code) {
const [accessToken, setAccessToken]= useState()
const [refreshToken, setRefreshToken]= useState()
const [expiressIn, setExpiresIn]= useState()

useEffect(()=>{
    axios.post('http://localhost:3001/login',{
        code,  
    })
    .then(res=>{
        setAccessToken(res.date.accessToken)
        setRefreshToken(res.date.refreshToken)
        setExpiresIn(res.date.expiressIn)
        window.history.pushState({},null,"/")
    }).catch(()=>{
        window.location="/"
    })
}, [code] )

useEffect(()=>{
    if(!refreshToken ||!expiressIn) return
    const timeout=setInterval(()=>{

    axios.post("http://localhost:3001/refresh",{
        refreshToken,
    })
    .then(res=>{
        setAccessToken(res.date.accessToken)
        setExpiresIn(res.date.expiressIn)
    })
    .catch(()=>{
        window.location="/"
    })
    }, (expiressIn -60)*1000)

    return()=>clearInterval(interval)

},[refreshToken,expiressIn] )

return accessToken
}
