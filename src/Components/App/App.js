import React from "react";
import './App.css';

import {SearchBar} from '../SearchBar/SearchBar';
import {SearchResults} from '../SearchResults/SearchResults'
import {Playlist} from '../Playlist/Playlist'
import {Track} from '../Track/Track'
import {TrackList} from "../TrackList/TrackList";
import {Spotify} from "../../util/Spotify";


class App extends React.Component{
    constructor(props) {

        super(props);
        this.state = {
            searchResults:[],
            playlistTracks:[],
            playlistName: "New Playlist"
        }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);

        this.init();
    }

    async init(){
        await Spotify.getAccessToken();
        //this.search("auto");
    }

    async search(term){
        this.setState({
            searchResults: await Spotify.search(term)
        } );

        console.log(this.state.searchResults)
    }

    addTrack(track){
        if (this.state.playlistTracks.some(t=>t.id === track.id)) return;

        const audioObject = new Audio(track.previewURL);
        console.log(audioObject.src)
        audioObject.play();

        const newPlaylist = [...this.state.playlistTracks, track];
        const newSearchResults = [...this.state.searchResults].filter(t=>t.id !== track.id)


        this.setState({
            playlistTracks: newPlaylist,
            searchResults: newSearchResults
        } );
    }
    removeTrack(track){
        if (this.state.searchResults.some(t=>t.id === track.id)) return;

        const newPlaylist = [...this.state.playlistTracks].filter(t=>t.id !== track.id);
        const newSearchResults = [...this.state.searchResults, track]

        this.setState({
            playlistTracks: newPlaylist,
            searchResults: newSearchResults
        } );
    }

    updatePlaylistName(newPlaylistName){
        this.setState({playlistName :newPlaylistName})
    }

    savePlaylist(){
        const trackURIs = this.state.playlistTracks.map(track=> track.uri)
        Spotify.savePlaylist(this.state.playlistName, trackURIs)
        this.setState({playlistTracks: [], playlistName: "New Playlist"})
    }
    render(){
        console.log(this.state.playlistName)
        return (
            <div>
                <h1>Ala<span className="highlight">Tunes</span></h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults searchResults={this.state.searchResults} addTrack={this.addTrack}/>
                        <Playlist onSave={this.savePlaylist} removeTrack={this.removeTrack}  playlistName = {this.state.playlistName} playlistTracks = {this.state.playlistTracks} updatePlaylistName={this.updatePlaylistName} />
                    </div>
                </div>
            </div>
        );
    }
}
export default App;
