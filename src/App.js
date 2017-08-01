import React, { Component } from 'react';
import './styles/App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      fileData: []
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('data.json')
    .then((res) => res.json())
    .then((data) => {
      this.setState({
        fileData: data.children
      })
    })
  }

  checkChildType(folder) {
    if (folder.children) {
      return (
        <div className={folder.type + ' ' + (folder.private ? 'private' : '')}>
          {folder.name}
          <div>
            {folder.children.map(child => this.checkChildType(child))}
          </div>
        </div>
      )
    }
    return (<div className={folder.type}>{folder.name}</div>);
  }

  render() {
    return (
      <div className="App">
        <h1 id="title">Title<span className="close">x</span></h1>
        <div className="label">Label</div>
        <div>{this.state.fileData.map(folder =>
          this.checkChildType(folder)
        )}</div>
      </div>
    );
  }
}

export default App;
