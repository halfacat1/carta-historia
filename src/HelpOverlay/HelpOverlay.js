import React from 'react';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import './HelpOverlay.css';

function renderTooltip(props) {
  return (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );
}

const HelpOverlay = () => (
  <div className="HelpOverlay">
    <div class="container">
      <div class="row">
        <div class="col-xs HelpOverlayContainer">
          <div className="HelpOverlayButton">
            <OverlayTrigger
              placement="left"
              delay={{ show: 250, hide: 400 }}
              overlay={renderTooltip}
              trigger="click"
            >
              <Button variant="outline-light">💡</Button>
            </OverlayTrigger>
          </div>
        </div>
        <div class="col-xs HelpOverlayContainer">
          <Button variant="outline-light" href="https://github.com/halfacat1/carta-historia/" target="_blank" rel="noopener noreferrer">👋</Button>
        </div>
      </div>
    </div>

  </div>
);

export default HelpOverlay;
