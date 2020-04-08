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


export default HelpOverlay;
