import React from 'react'
import './AudioPlayer.css'
import playButton from './NicePng_play-icon-png_118375.png'
import pauseButton from './SeekPng.com_pause-symbol-png_2944357.png'
export class AudioPlayer extends React.Component{
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this)
    }
    handleClick(e){
        switch(e.target.className){
            case "play":
                const audioObject1 = document.getElementById(this.props.track.id)
                console.log(audioObject1)
                this.playSound(audioObject1)
                break;
            case "pause":
                const audioObject2 = document.getElementById(this.props.track.id)
                console.log(audioObject2)
                this.pauseSound(audioObject2)
                break;
            default:
                console.log("default");
        }
    }

    playSound(audioObject){
        const allAudioObjects = [...document.getElementsByClassName("audioObject")];
        allAudioObjects.forEach(player=> player.pause())
        audioObject.play();
    }

    pauseSound(audioObject){
        audioObject.pause();
    }
    render(){
        return(
            <React.Fragment>
            <audio className={"audioObject"} id={this.props.track.id} src={this.props.track.previewURL}>
                <a href={this.props.track.previewURL}>Download Preview</a>
            </audio>
                <div>
                    <img className={"play"} src={playButton} alt={"play"} height={"33px"} width={"33px"} onClick={this.handleClick}/>
                    <img className={"pause"} src={pauseButton} alt={"play"} height={"33px"} width={"33px"} onClick={this.handleClick}/>
                    {/*<button onClick={document.getElementById('player').play}>Play</button>*/}
                    {/*<button onClick={document.getElementById('player').play()}">Pause</button>*/}
                    {/*<button onClick="document.getElementById('player').volume += 0.1">Vol +</button>*/}
                    {/*<button onClick="document.getElementById('player').volume -= 0.1">Vol -</button>*/}
                </div>
            </React.Fragment>
        )
    }
}