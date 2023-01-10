import React from 'react';
import './TrackList.css'
import {Track} from '../Track/Track'

export class TrackList extends React.Component{
    buildTracks(tracks){
        //return <Track artist="niggas" album="album" name="song" key="refde"/>

        return tracks.map((track, index)=> (<Track track={track} key={this.props.keyModifier + track.name + track.id} modifier={this.props.keyModifier} addTrack={this.props.addTrack} removeTrack={this.props.removeTrack} />));
    }
    render(){
        return(
            <div className="TrackList">
                {this.buildTracks(this.props.trackList)}
            </div>
        )
    }
}
