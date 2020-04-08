import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './HelpOverlay.css';


class HelpOverlay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showFullscreen: true
    };

    this.toggleFullscreenOverlay = this.toggleFullscreenOverlay.bind(this);
  }
  toggleFullscreenOverlay() {
    this.setState({
      showFullscreen: true
    });
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
              <FullscreenOverlay show={self.state.showFullscreen} />
              <Button variant="outline-light" onClick={self.toggleFullscreenOverlay}>
                <span role="img" className="Glow" aria-labelledby="jsx-a11y/accessible-emoji">💡</span>
              </Button>
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
      show: props.show,
      style: {
        height: '100%',
        opacity: 1
      }
    };
    this.openFullscreenOverlay = this.openFullscreenOverlay.bind(this);
    this.closeFullscreenOverlay = this.closeFullscreenOverlay.bind(this);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.show && !prevState.show) {
      this.openFullscreenOverlay();
    }
  }
  openFullscreenOverlay() {
    this.setState({
      show: true,
      style: {
        height: '100%',
        opacity: 1
      }
    });
  }
  closeFullscreenOverlay() {
    this.setState({
      show: false,
      style: {
        height: 0,
        opacity: 0,
      }
    });
  }
  render() {
    return (
      <div
        className="overlay"
        style={this.state.style}
        onClick={this.closeFullscreenOverlay}
      >
        <div className="title">
          <h2>Carta Historia</h2>
          <p>Visualize battles throughout history across the world!</p>
          <h5>Instructions</h5>
          <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗺 + 🖱/👆🤏</span><br />Pan & Zoom<br /><br />
          <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">📈 + ↔</span><br />Resize & Move the Year Filter<br />
          <br />
          <p><span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗺 + 🖱/👆🤏</span><b>anywhere to begin</b></p>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs helpButtonHelp">
              Open this again
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HelpOverlay;
