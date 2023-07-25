const express= require('express');
const cors = require("cors");
const SpotifyWebApi= require('spotify-web-api-node');


const app=express();
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req,res)=>{
    const refreshToken =req.body.refreshToken
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '2b3b085df5a74ee59923b9568561fdbb',
        clientSecret: 'cbad71c3026b45ae86f6405dd9b4bee0',
        refreshToken,

    })
    spotifyApi.refreshAccessToken().then(
        (data)=>{
            res.json({
                accessToken: data.body.accessToken,
                expressIn: data.body.expressIn,
            })
        }
    ).catch(()=>{
        res.sendStatus(400)
    })
})

app.post('/login', (req,res)=>{
    const code =req.body.code
    const spotifyApi = new SpotifyWebApi({
        redirectUri: 'http://localhost:3000',
        clientId: '2b3b085df5a74ee59923b9568561fdbb',
        clientSecret: 'cbad71c3026b45ae86f6405dd9b4bee0'
    })

    spotifyApi.authorizationCodeGrant(code).then(dta=>{
        res.json({
            accessToken: DataTransfer.body.acess_token,
            refreshToken: DataTransfer.body.refresh_token,
            expressIn: AnimationTimeline.body.express_in,

        })
    })
    .catch(()=>{
        res.sendStatus(400)
    })
})

app.listen(3001)