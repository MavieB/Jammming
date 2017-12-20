import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import {SearchResults} from '../SearchResult/Searchresults.js';
import {Playlist} from '../Playlist/Playlist.js'; // why is this the path name with .. and not ./Components/Playlist...
import {SearchBar} from '../Searchbar/SearchBar.js';
import {Spotify} from '../../util/spotify.js';


class App extends Component {  //when does it say React.Component?
  constructor(props) {
	   super(props);
     this.state = {
       searchResults: [], //Inside of the App constructor, set this.state to an object with a property called searchResults set to an
    // array of objects, each containing name, artist, and album properties.
        playlistName: 'My awesome playlist',
        playlistTracks: [] //The playlistTracks value should be an array of objects, each containing name, artist, and album properties.
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistname = this.updatePlaylistname.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this)
    this.search = this.search.bind(this)
  }

  addTrack(track) {
    let updatedPlaylist = this.state.playlistTracks
    if (this.state.playlistTracks.indexOf(track) === -1)  {
      //If the id is new, add the song to the end of the playlist.
      updatedPlaylist.push(track);
      //Set the new state of the playlist
      this.setState({playlistTracks: updatedPlaylist});
    }
  }

  removeTrack(track) {
    let updatedPlayList = this.state.playlistTracks
    updatedPlayList.splice(track.id,1); // this I will have to change
    this.setState({playlistTracks: updatedPlayList})
  }
  // why do I define that method here, and not in track.js?

  updatePlaylistname(name) {
    this.setState({
      playlistname : name
    });
  }

  savePlaylist () { //point 62 of instructions
    const trackURIs = this.state.playlistTracks.map(track => track.uri); // not sure if I have to add a function
    Spotify.savePlaylist(this.state.playlistName, trackURIs);
    this.setState({
      playlistName: 'New Playlist',
      searchResult: []
    })
  }

  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({searchResults: searchResults}); // Update the state of searchResults with the value resolved from Spotify.search()'s promise.
    });
  }

  render() {
    return (
      <div>
          <h1>Ja<span className="highlight">mmm</span>ing</h1>
          <div className="App">
            <SearchBar onSearch={this.search} />
            <div className="App-playlist">

                {/*//Pass the state of the App components searchResults to the SearchResults component:*/}
                <SearchResults
                  searchResults={this.state.searchResults}
                  onAdd={this.addTrack}
                />
                {/* //Pass the playlist tracks from the App component to the Playlist component.*/}
                <Playlist
                  onNameChange={this.updatePlaylistname}
                  playlistTracks={this.state.playlistTracks}
                  playlistName={this.state.playlistName}
                  onRemove={this.removeTrack}
                  onSave = {this.savePlaylist}
                />
              </div>
          </div>
      </div>
    )
  }
}

export default App;
