import React from 'react'

import { Container } from 'react-bootstrap'

const AUTH_URL=   "https://accounts.spotify.com/authorize?client_id=2b3b085df5a74ee59923b9568561fdbb&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {
  return (
    <Container
    ClassNanem='flex justify-content-center align-items-centre'
    style={{minHeight:"100vh" }}
    >
        <a className="btn btn-sucess btn-lg" href={AUTH_URL}>
            Login With spotifY
        </a>
    </Container>
  )
}
