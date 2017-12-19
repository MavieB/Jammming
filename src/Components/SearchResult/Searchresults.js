import React from 'react';
import {TrackList} from '../Tracklist/TrackList.js' // to be added later
import './Searchresults.css';


export class SearchResults extends React.Component {
  render () {
    return (
      <div className="SearchResults">
      <h2>Results</h2>
      <TrackList tracks={this.props.searchResults} onAdd={this.props.onAdd} isRemoval={true}/>
      </div>
    )
  }

}
