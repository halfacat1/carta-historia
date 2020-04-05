import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './HelpOverlay.css';

function renderTooltip(props) {
  return (
    <Tooltip {...props} >
      <div>
        <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗺 + 🖱</span>: Pan & Zoom<br />
        <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">🗺 + 🖱</span>: Pan & Zoom<br />
        <b>Mouse/Wheel + Map: </b>Pan & Zoom<br />
        <b>Mouse + Map: </b>Pan & Zoom<br />
      </div>
    </Tooltip>
  );
}

const HelpOverlay = () => (
  <div className="HelpOverlay">
    <div className="container">
      <div className="row">
        <div className="col-xs HelpOverlayContainer">
          <div className="HelpOverlayButton">
            <OverlayTrigger
              placement="left"
              overlay={renderTooltip}
              trigger="click"
            >
              <Button variant="outline-light">
                <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">💡</span>
              </Button>
            </OverlayTrigger>
          </div>
        </div>
        <div className="col-xs HelpOverlayContainer">
          <Button variant="outline-light" href="https://github.com/halfacat1/carta-historia/" target="_blank" rel="noopener noreferrer">
            <span role="img" aria-labelledby="jsx-a11y/accessible-emoji">👋</span>
          </Button>
        </div>
      </div>
    </div>

  </div>
);

export default HelpOverlay;
