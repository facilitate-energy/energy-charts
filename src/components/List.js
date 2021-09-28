import React from "react";
import { ListGroup } from "react-bootstrap";

function List(props) {
  const { items, selectedItem, onSelection } = props;

  return (
    <>
      {items.map((item, idx) => (
        <ListGroup.Item
          key={idx}
          id={item}
          active={selectedItem === item ? true : false}
          onClick={() => {
            onSelection(item);
          }}
        >
          {item}
        </ListGroup.Item>
      ))}
    </>
  );
}

export default List;
