import React, { Component } from 'react';


class MediaPlayer extends Component {

    state = {
        currentTime: 0,
        player: null,
        mediaType: ['.mp3', '.wav', '.m4a']
            .some(fileExtension => this.props.src.endsWith(fileExtension))
            ? 'audio'
            : 'video'
    }


    componentDidMount() {
        this.setState({ player: document.getElementsByTagName(this.state.mediaType)[0] })
    }

    timeUpdate = e => {
        if (this.state.player) {
            const currentTime = this.state.player.currentTime
            this.props.timeUpdate(currentTime)
        } else {
            console.log('no player')
        }
    }
    render() {
        if (this.state.mediaType === 'audio') {
            return <audio src={this.props.src} onPause={this.timeUpdate} onPlay={this.timeUpdate} onSeeked={this.timeUpdate} onTimeUpdate={this.timeUpdate} controls></audio>
        }
        return <video src={this.props.src} onTimeUpdate={this.timeUpdate} controls></video>
    }
}

export default MediaPlayer;