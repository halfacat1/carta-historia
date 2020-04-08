import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './HelpOverlay.css';


class HelpOverlay extends React.Component {
  renderHelpTooltip(props) {
    return (
      <Tooltip {...props} >
        <h4>Carta Historia</h4>
        <p>Visualize battles throughout history across the world!</p>
        <h6>Instructions</h6>
        <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗺 + 🖱/👆🤏</span><br />Pan & Zoom<br /><br />
        <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">📈 + ↔</span><br />Resize & Move the Year Filter<br />
      </Tooltip>
    );
  }
  renderHouskeepingTooltip(props) {
    return (
      <Tooltip {...props} >
        Author: <a href="http://github.com/halfacat1/" target="_blank" rel="noopener noreferrer">Han Z.</a>
        <br />
        <br />
        Built with:&nbsp;
        <a href="https://www.echartsjs.com/" target="_blank" rel="noopener noreferrer">ECharts</a>,&nbsp;
        <a href="https://reactjs.org/" target="_blank" rel="noopener noreferrer">React</a>
        <br />
        Powered by: <a href="https://www.wikidata.org/" target="_blank" rel="noopener noreferrer">Wikidata</a>
      </Tooltip>
    );
  }
  render() {
    let self = this;
    return (
      <div className="HelpOverlay">
        <div className="container">
          <div className="row">
            <div className="col-xs HelpOverlayContainer">
              <FullscreenOverlay />
              <OverlayTrigger
                placement="left"
                overlay={self.renderHelpTooltip}
                trigger="click"
              >
                <Button variant="outline-light">
                  <span role="img" className="Glow" aria-labelledby="jsx-a11y/accessible-emoji">💡</span>
                </Button>
              </OverlayTrigger>
            </div>
            <div className="col-xs HelpOverlayContainer">
              <OverlayTrigger
                placement="bottom"
                overlay={self.renderHouskeepingTooltip}
                trigger="click"
              >
                <Button variant="outline-light">
                  <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">👋</span>
                </Button>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

class FullscreenOverlay extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      style: {
        height: '100%',
        opacity: 1
      }
    };
    this.openFullscreenOverlay = this.openFullscreenOverlay.bind(this);
    this.closeFullscreenOverlay = this.closeFullscreenOverlay.bind(this);
  }

  openFullscreenOverlay() {
    let style = {
      height: '100%',
      opacity: 1
    };
    this.setState({ style });
  }

  closeFullscreenOverlay() {
    let style = {
      height: 0,
      opacity: 0,
    };
    this.setState({ style });
  }

  render() {
    return (
      <div id="fullscreen-overlay">
        <span style={{ fontSize: 30, cursor: "pointer" }} onClick={this.openFullscreenOverlay}>&#9776; open</span>
        <div
          className="overlay"
          style={this.state.style}
        >
          <Button href="#" className="closebtn" onClick={this.closeFullscreenOverlay}>×</Button>
          <div className="sidenav-container">
            <div className="text-center">
              <h2>Carta Historia</h2>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
              <p>This is a sample input form</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpOverlay;
