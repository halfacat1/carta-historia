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
          <p><span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗺 + 🖱/👆🤏</span><br />Click/Scroll/Tap/Pinch to interact with the map</p>
          <p><span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗺🔴🟠🟢 + 🖱/👆</span><br />Each dot on the map is a battle, colored by its date<br />Hover/Click to see info </p>
          <p><span role="img" aria-labelledby="jsx-a11y/accessible-emoji">⬇📈 + ↔</span><br /><strong>Timeline</strong> (bottom) <br /> Drag to resize & move the timeline on the bottom, to change the range of battles to highlight</p>
          <br />
          <br />
          <p>
            (<span class="Glow" role="img" aria-labelledby="jsx-a11y/accessible-emoji">💡</span> to reopen this)
            <br />
            <h2><span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🖱/👆</span>anywhere to begin!</h2>
          </p>
        </div>
      </div>
    );
  }
}

export default HelpOverlay;
