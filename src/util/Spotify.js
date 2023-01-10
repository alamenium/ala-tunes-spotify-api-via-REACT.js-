import React from 'react'

let accessToken = '';
let expirationTime = 0;

let client_id = '07cef032f3854c61acda8179ab2d8cb5';
let redirect_uri = 'https://alatunes.netlify.app/';

let scope = 'playlist-modify-private playlist-modify-public';

let url = 'https://accounts.spotify.com/authorize';
url += '?response_type=token';
url += '&client_id=' + encodeURIComponent(client_id);
url += '&scope=' + encodeURIComponent(scope);
url += '&redirect_uri=' + encodeURIComponent(redirect_uri);


function generateRandomString(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
let activated= false;

export class Spotify{

    static async search(term){
        const fetchUrl = `https://api.spotify.com/v1/search?type=track&q=${term}`;
        const params = {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`}
        }

        const response =  await fetch(fetchUrl, params );

        const jsonResponse = await response.json();
        console.log(jsonResponse)
        const parsedTracks =  jsonResponse.tracks.items.map(track=> this.parseTrack(track));
        console.log(parsedTracks)
        return parsedTracks;
    }
    static async savePlaylist(playlistName, trackURIs){
        if(!(playlistName && trackURIs)) return;

        let defAccessToken = accessToken;
        let userID;

        const getUsernameURL = "https://api.spotify.com/v1/me"
        const responseUSR = await fetch(getUsernameURL, {
            method: 'GET',
            headers: {'Authorization': `Bearer ${accessToken}`}
        });

        if(responseUSR.ok) console.log('tmam')
        const jsonResponseUSR = await responseUSR.json();
        const userName = jsonResponseUSR.display_name;
        userID = jsonResponseUSR.id;

        // const headers;
        //
        // const data;

        const createPlaylistUrl = `https://api.spotify.com/v1/users/${userID}/playlists`

        const responseCRT = await fetch(createPlaylistUrl, {
            method : 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: playlistName,
                description: "A playlist created through AlaTunes",
                public: true
            })
        })

        const jsonResponseCRT = await responseCRT.json();

        const playlistID = jsonResponseCRT.id;

        const addTracksURL = `https://api.spotify.com/v1/playlists/${playlistID}/tracks`;

        const responseADD = await fetch (addTracksURL,{
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                position: 0,
                uris: trackURIs
            })
        })



    }


    static parseTrack(trackRAW){
        return {
            id: trackRAW.id,
            name: trackRAW.name,
            artist: (trackRAW.artists.map (artist => artist.name)).join(" & "),
            album: trackRAW.album.name,
            uri: trackRAW.uri,
            previewURL: trackRAW.preview_url
        }
    }

    static getAccessToken() {
        if(accessToken) return accessToken;
        let location = window.location.href ;
        location = location.replace(/#/g, "?padding=nothing&")

        const param = new URLSearchParams(location)
        const accessTokenInURL = param.get("access_token");
        const expirationTimeInURL = param.get("expires_in");

        //const accessTokenInURL =window.location.href.match(/access_token=([^&]*)/);

        if(accessTokenInURL!==null && expirationTimeInURL!==null){
            accessToken = accessTokenInURL;
            expirationTime = parseFloat(expirationTimeInURL);
            setInterval(()=>{window.location.hash = ''}, expirationTime)
            //window.history.pushState('Access Token', null, '/');
            activated = true;

        }
        else{
            window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
        }
        return accessToken
    }
}


//     function generateRandomString(length) {
//         var text = '';
//         var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//
//         for (var i = 0; i < length; i++) {
//             text += possible.charAt(Math.floor(Math.random() * possible.length));
//         }
//         return text;
//     };
//
//     var userProfileSource = document.getElementById('user-profile-template').innerHTML,
//         userProfileTemplate = Handlebars.compile(userProfileSource),
//         userProfilePlaceholder = document.getElementById('user-profile');
//
//     oauthSource = document.getElementById('oauth-template').innerHTML,
//         oauthTemplate = Handlebars.compile(oauthSource),
//         oauthPlaceholder = document.getElementById('oauth');
//
//     var params = getHashParams();
//
//     var access_token = params.access_token,
//         state = params.state,
//         storedState = localStorage.getItem(stateKey);
//
//     if (access_token && (state == null || state !== storedState)) {
//         alert('There was an error during the authentication');
//     } else {
//         localStorage.removeItem(stateKey);
//         if (access_token) {
//             $.ajax({
//                 url: 'https://api.spotify.com/v1/me',
//                 headers: {
//                     'Authorization': 'Bearer ' + access_token
//                 },
//                 success: function(response) {
//                     userProfilePlaceholder.innerHTML = userProfileTemplate(response);
//
//                     $('#login').hide();
//                     $('#loggedin').show();
//                 }
//             });
//         } else {
//             $('#login').show();
//             $('#loggedin').hide();
//         }
//
//         document.getElementById('login-button').addEventListener('click', function() {
//
//             var client_id = 'CLIENT_ID'; // Your client id
//             var redirect_uri = 'REDIRECT_URI'; // Your redirect uri
//
//             var state = generateRandomString(16);
//
//             localStorage.setItem(stateKey, state);
//             var scope = 'user-read-private user-read-email';
//
//             var url = 'https://accounts.spotify.com/authorize';
//             url += '?response_type=token';
//             url += '&client_id=' + encodeURIComponent(client_id);
//             url += '&scope=' + encodeURIComponent(scope);
//             url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
//             url += '&state=' + encodeURIComponent(state);
//
//             window.location = url;
//         }, false);
//     }
// })();