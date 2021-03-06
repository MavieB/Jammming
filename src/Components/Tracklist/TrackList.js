import React from 'react';
import {Track} from '../Track/Track.js'; // add from where
import './TrackList.css';

export class TrackList extends React.Component {
  render () {
    return (
      <div className="TrackList">
      {this.props.tracks.map((songObject) => {
        return <Track key={songObject.id} track={songObject} onAdd={this.props.onAdd} onRemove={this.props.onRemove}/>
      })}
      </div>
    )
  }
}
