import React from 'react';
import './SearchBar.Css';

export class SearchBar extends React.Component {
  constructor(props) {
     super(props);
     this.search = this.search.bind(this)
     this.handleTermChange = this.handleTermChange.bind(this)
     this.state = {
       term : ''
     }
  }

  search (state) {
    this.props.onSearch(state)  //passes the state of the term to this.props.onSearch.
  }

  handleTermChange (event){
    const searchterm = event.target.value;
    this.setState ({term: searchterm}); //	Sets the state of the search bar's term to the event target's value
  }

  render() {
    return (

      <div className="SearchBar">
        <input placeholder="Enter A Song, Album, or Artist" onChange={this.handleTermChange}/>
        <a>SEARCH</a>
      </div>
    )}
}
