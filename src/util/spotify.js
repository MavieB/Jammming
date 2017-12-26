//
 const clientId = 'a37a2cd27e4f411f9d567613da29f4ae';
// const redirectUri = "http://localhost:3000/"  ;

// const clientId = '71a352963bab43f5bb9e671f25a65a38'; // Insert client ID here.
const redirectUri = 'http://localhost:3000/';
let accessToken = '';

export const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken; //return the value saved to accessToken
    }
      // I copied this from https://github.com/jarellbennett/Jammming/blob/master/src/util/Spotify.js because I couldnt figure it out mysefl

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);// what does the ([^&]*)/ stand for? per Elise, ^ means matches beginning of input, * means matches preceding expression 0 or more times, and so in this case, "any number of characters until a & is found"; i.e. if you have https://example.com/callback#access_token=NwAExz...BV3O2Tk&token_type=Bearer&expires_in=3600&state=123, then it is everything between access_token= and the first &
    const expire = window.location.href.match(/expires_in=([^&]*)/);
    if(accessTokenMatch&&expire){
     accessToken = accessTokenMatch[1];
     const expiresIn = Number(expire[1]);
     window.setTimeout(() => accessToken = '', expiresIn * 1000);
     window.history.pushState('Access Token', null, '/');
     return accessToken;
   } else {
      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
   }
},

  search (searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(response =>
           response.json()).then(jsonResponse => {
      if (jsonResponse.tracks) {
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }));
      } else {
        return [];
      }
    });
  },

  savePlaylist(playlistName, trackURIs) {
    //GET current user's ID
    //POST a new playlist with the input name to the current user's Spotify account. Receive the playlist ID back from the request.
    //POST the track URIs to the newly-created playlist, referencing the current user's account (ID) and the new playlist (ID)
    if (!playlistName || !trackURIs) {
      return;
    }
    accessToken = Spotify.getAccessToken();
    let userId;
    return fetch('https://api.spotify.com/v1/me',{ headers: {Authorization: `Bearer ${accessToken}`}})
    .then(response => response.json())
    .then(jsonResponse => {
      userId = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          headers: {Authorization: `Bearer ${accessToken}`},
          method:'POST',
          body:JSON.stringify({name: playlistName})
        }).then(response => {
          if(response.ok){
            return response.json();
          } throw new Error ('Request Failed');},
        networkError=> console.log(networkError.message))
        .then(jsonResponse => {
          let playlistId = jsonResponse.id;
          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
          {
            headers: {Authorization: `Bearer ${accessToken}`},
            method:'POST',
            body:JSON.stringify({uris: trackURIs})
          }).then(response => {
            if(response.ok){
              return response.json();
            } throw new Error ('Request Failed');},
          networkError=> console.log(networkError.message))
          .then(jsonResponse=>{
            playlistId = jsonResponse.id;
          })
        })
    })
  }
}
    // const accessToken = Spotify.getAccessToken();
    // const headers = {
    //   Authorization: 'Bearer ${accessToken}',
    // };
    // let userId = '';
    // fetch('https://api.spotify.com/v1/me', {headers: headers})
    //   .then(response => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error('Request failed!');
    //   })
    //   .then(jsonResponse => {
    //     const userId = jsonResponse.id;
    //     fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
    //       headers: headers,
    //       method: 'POST',
    //       body: JSON.stringify({name: playlistName})
    //     })
    //     .then(response => {
    //       if (response.ok) {
    //         return response.json();
    //       }
    //       throw new Error('Request failed!');
    //     })
    //     .then(newJsonResponse => {
    //       const playlistId = newJsonResponse.id;
    //       fetch(`https://api.spotify.com/v1/users/{userId}/playlists/{playlistId}/tracks`, {
    //         headers: headers,
    //         method: 'POST',
    //         body:   JSON.stringify({"uris": trackURIs}) //Set the URIs parameter to an array of track URIs passed into the method.
    //       })
    //       .then(response => {
    //         if (response.ok) {
    //           return response.json();
    //         }
    //         throw new Error('Request failed!');
    //       }).then(Response => {
    //         console.log(Response)
    //       })
    //     }
    //     )
    //     })
    //   }}
