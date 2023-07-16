import React, { useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { BsSliders as Sliders } from "react-icons/bs";

function OffcanvasMenu(props) {
  const { showDifference, setShowDifference } = props;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="offcanvas-menu-button" onClick={handleShow}>
        <Sliders className="mb-1" />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={props.placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form.Switch
            checked={showDifference}
            label="Show difference"
            id="offcanvas-difference-switch"
            onChange={(e) => setShowDifference(e.target.checked)}
          />
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasMenu;
