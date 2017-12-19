import React from 'react';

export class Track extends React.Component {
  constructor(props) {
     super(props);
     this.addTrack = this.addTrack.bind(this);
     this.renderAction = this.renderAction.bind(this);
     this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.onRemove){
      return <a className="Track-action" onClick={this.removeTrack}>-</a>;
    }
    else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>;
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track) //Use it to add this.props.track to the playlist.
  }

  removeTrack() {
    this.props.onRemove(this.props.track)
  }

  render() {
    return (
      <div className="Track">
      <div className="Track-information">
      <h3>{this.props.track.name}</h3>
      <p>{this.props.track.artist} | {this.props.track.album}</p>
      </div>
      <a class="Track-action"> {this.renderAction()} </a> {/*see if i need to do commas in front of plus */}
      </div>
    )
  }
}
