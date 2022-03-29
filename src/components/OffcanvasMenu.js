import React, { useState } from "react";
import { Button, ListGroup, Offcanvas } from "react-bootstrap";
import { List } from "../components";

function OffcanvasMenu(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSelection = (value) => {
    handleClose();
    if (value !== "none") {
      props.onSelection(value);
    } else {
      props.onSelection(null);
    }
  };

  const buttonName = props.name || "+";

  return (
    <>
      <Button className="offcanvas-menu-button" onClick={handleShow}>
        {props.itemTitles[buttonName] || buttonName}
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement={props.placement}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{props.title}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup
            as="ul"
            variant="flush"
            className="offcanvas-scenario-list"
          >
            <List
              items={props.items}
              itemTitles={props.itemTitles}
              selectedItem={props.selectedItem}
              noneItem={props.noneItem}
              onSelection={handleSelection}
            />
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default OffcanvasMenu;
