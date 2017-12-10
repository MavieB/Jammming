import React, { Component } from 'react';
import logo from './logo.svg';
import '.Components/App/App.css';
import {SearchResults} from './Components/SearchResult/Searchresults.js';
import {Playlist} from './Components/Playlist/PlayList.js';
import {SearchBar} from '.Components/Searchbar/Searchbar.js';


class App extends Component {
  constructor(props) {
	super(props);
  this.state = {
    searchResults: [], //Inside of the App constructor, set this.state to an object with a property called searchResults set to an
    // array of objects, each containing name, artist, and album properties.
    playlistName: 'My first playlist',
    playlistTracks: [] //The playlistTracks value should be an array of objects, each containing name, artist, and album properties.
  };
  }

  addTrack(track) {
    if (track.id!===this.state.playlistTracks) {
      //If the id is new, add the song to the end of the playlist.
      playlistTracks.push(track);
      //Set the new state of the playlist
      this.setState({playlistTracks: playlistTracks});
    }

  }

  render() {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
              <div className="App">
              <SearchBar/>
                  <div className="App-playlist">

                  <!-- //Pass the state of the App components searchResults to the SearchResults component:-->
                  <SearchResults searchResults={this.state.searchResults} />
                  <!-- //Pass the playlist tracks from the App component to the Playlist component.-->
                  <Playlist playlistTracks=this.state.playlistTracks playlistName=this.state.playlistName/>
                  </div>
              </div>
      </div>
    );
  }
}

export default App;
