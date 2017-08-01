import React, { Component } from 'react';
import './styles/App.css';
import './styles/sprite.css';

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

  checkChildType(folder, paddingSize) {
    const divStyle = {
      'padding-left': '10px;'
    }
    if (folder.children) {
      return (
        <div style={divStyle}>
          <div className="folder-toggle expand"></div>
          <div className={folder.type + ' folder-icon ' + (folder.private ? 'hidden-folder' : '')} ></div>
          <div className="folder-text">{folder.name}</div>
          {folder.children.map(child => this.checkChildType(child))}
        </div>
      )
    }
    return (
      <div className="tree-item">
        <div className={folder.type + ' folder-icon'} />
        <div className="folder-text">{folder.name}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <h1 id="title">Title<div className="close close-window" /></h1>
        <div className="label">Label</div>
        <div className="tree-container">{this.state.fileData.map(folder =>
          this.checkChildType(folder)
        )}</div>
      </div>
    );
  }
}

export default App;
