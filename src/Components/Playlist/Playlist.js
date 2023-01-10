import React from 'react'
import './Playlist.css'
import {TrackList} from '../TrackList/TrackList'

export class Playlist extends React.Component{
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.props.updatePlaylistName(e.target.value)
    }

    render(){
        return(
            <div className="Playlist">
                <input value={this.props.playlistName} maxLength={20}  onChange={this.handleChange}/>
                <TrackList trackList={this.props.playlistTracks} keyModifier ="p" removeTrack={this.props.removeTrack} />
                <button onClick={this.props.onSave} className="Playlist-save">SAVE TO SPOTIFY</button>
            </div>
        )
    }
}