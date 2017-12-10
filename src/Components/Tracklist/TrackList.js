import React from '.react';
import {Track} from // add from where

export class TrackList extends React.Component {
  render () {
    return (
      <div className="TrackList">
      {this.props.tracks.map(function(songObject) {
        return <Track key={songObject.id} track={songObject} />
      })
      
      </div>
    )
  }
}
