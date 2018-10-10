import React, { Component } from 'react';
import MediaPlayer from './mediaPlayer';
import Transcript from './transcript';
import transcript from './transcript.json';


class InteractiveTranscript extends Component {
    state = {
        currentWordIndex: 0,
        transcript: transcript.words,
        playPosition: 0,
        updatePlayer: false,
    }

    getNewWordIndex = newPosition => {

        for (let [index, wordObject] of Object.entries(this.state.transcript)) {

            let wordStart = parseFloat(wordObject.time)
            let wordEnd = wordStart + parseFloat(wordObject.duration)

            if (newPosition >= wordStart && newPosition <= wordEnd) {
                return parseInt(index)
            }

        }
    }

    timeUpdate = newPosition => {
        const newWordIndex = this.getNewWordIndex(newPosition)
        if (newWordIndex) {
            this.setState({ currentWordIndex: newWordIndex })
        }
    }

    onClickWord = timeString => {
        this.setState({ playPosition: parseFloat(timeString), updatePlayer: true })
    }

    render() {
        return <React.Fragment>
            <div>
                <MediaPlayer
                    src={this.props.mediaSource}
                    timeUpdate={this.timeUpdate}
                    updatePlayer={this.state.updatePlayer}
                    currentTime={this.state.playPosition} />
            </div>
            <div>
                <Transcript transcript={this.state.transcript}
                    currentWordIndex={this.state.currentWordIndex}
                    onClickWord={this.onClickWord} />
            </div>
        </React.Fragment>
    }
}

export default InteractiveTranscript;