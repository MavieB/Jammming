import React from 'react';
import {Tracklist} from '.'  // add tracklist link
import './playlist.css';


export class Playlist extends React.Component {
  render() {
      return (
        <div className="Playlist">
        <input defaultValue={'New Playlist'}/>
        <!-- //Pass the playlist tracks from the Playlist component to the TrackList component.-->
        <Tracklist tracks=this.props.playlistTracks/>
        <a className="Playlist-save">SAVE TO SPOTIFY</a>
</div>
      )
  }

}
