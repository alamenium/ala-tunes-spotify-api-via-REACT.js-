import React from 'react'
import './Track.css'
import {AudioPlayer} from "../AudioPlayer/AudioPlayer";

export class Track extends React.Component{
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e){
        const newTrack = this.props.track;

        if(this.props.modifier === 'r')
            this.props.addTrack(newTrack)
        else
            this.props.removeTrack(newTrack);
    }

    handleRemove(e){

    }

    render(){
        return(
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p>{this.props.track.artist} {this.props.track.album}</p>
                    <AudioPlayer track ={this.props.track}/>
                </div>
                    <button className="Track-action" onClick={this.handleClick}>{this.props.modifier === 'r'? '+' : '-'}</button>
            </div>
        )
    }
}