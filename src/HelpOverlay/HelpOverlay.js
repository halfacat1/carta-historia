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
    <OverlayTrigger
      placement="left"
      delay={{ show: 250, hide: 400 }}
      overlay={renderTooltip}
    >
      <Button className="TriggerButton" variant="success">Hover me to see</Button>
    </OverlayTrigger>
  </div>
);

export default HelpOverlay;
