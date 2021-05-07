import React, { Component } from 'react';
import './App.css';

const ipfsClient = require('ipfs-http-client')
const ifps = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'})

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      memeHash: ''
    }
  }
  captureFile = (event) => {
    event.preventDefault()
    
    const file = event.target.files;
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file[0])
    reader.onloadend = () => {
      this.setState({buffer: Buffer(reader.result)})
    }
    console.log()
  }

  onSubmit = (event) => {
    event.preventDefault()
    ipfs.add(this.state.buffer, (error, result) => {
      console.log('Ipfs result', result)
      const memeHash = result[0].hash
      this.setState({memeHash})
      if(error) {
        console.error(error)
      }
    })
  }
  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Ethereum Dapp With IPFS
          </a>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  href="http://www.dappuniversity.com/bootcamp"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={`https://ipfs.infura.io/ipfs/${this.state.memeHash}`} className="App-logo" alt="logo" />
                </a>
                <h2>Ethereum Dapp With IPFS</h2>
                <form onSubmit = {this.onSubmit}>
                  <input type="file" onChange={this.captureFile} />
                  <input type="submit" />
                </form>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
