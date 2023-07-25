import {useState, useEffect} from 'react'
import userAuth from './userAuth'
import { Container, From } from 'react-bootstrap'
import SpotifyebApi from 'spotify-web-api-node'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi= new SpotifyWebApi({
  clientId:"2b3b085df5a74ee59923b9568561fdbb",

})

export default function Dashboard({code }) {
  const accessToken =useAuth(code)
  const [search, setSearch]=useState("")
  const [searchResults, setSearchResults]=useState([])

  useEffect(()=>{
    if(!accessToken) return
    spotifyApi.setAccessToken(accessToken)
  }, [accessToken])

  useEffect(()=>{
    if(!search) return setSearchResults([])
    if(!accessToken) return 

    let cancel = false

    spotifyApi.searchTracks(search).then(res=>{
      if(cancel) return
      setSearchResults(res.body.tracks.items.map(track=>{
        const smallestAlbumImage=track.album.images.reduce((smallest, 
          image) => {
          if(image.height < smallest.height) return image
          return smallest
        }, 
        track.album.image[0]
        )

        return{
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url
        }
      }))
    })
    return ()=> cancel= true
  }, [search, accessToken])


  return (
      <Container className='d-flex flex-column py-2' style={{
        height: "100vh"
      }}>
        <Form.control 
          type="search" 
          placeholder="Search song/ Artists" 
          value={search} 
          onchange ={e => setSearch(e.target.value)}
          />
          <div className='flex-grow-1 my-2' style={{overflow: "auto"}}>
            {searchResults.map(track => (
              <TrackSearchResult track={track} key={track.url} />
            ))}
          </div>
          <div> Bottom</div>
      </Container>
  )
}
