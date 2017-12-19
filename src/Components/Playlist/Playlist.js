import React from 'react';
import {TrackList} from '../Tracklist/TrackList.js'  // add tracklist link
import './Playlist.css';


export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this)
  }

handleNameChange(input) {
  const name = input.target.value;
  this.props.onNameChange(name);
}

  render() {
      return (
        <div className="Playlist">
        <input defaultValue={'New Playlist'} onChange={this.handleNameChange} />
        {/*Pass the playlist tracks from the Playlist component to the TrackList component.*/}
        <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove}/>
        <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
</div>
      )
  }

}
