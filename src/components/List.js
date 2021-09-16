import React from "react";
import { ListGroup } from "react-bootstrap";

function List(props) {
  const { items, selectedItem } = props;
  return (
    <>
      {items.map((item, idx) => (
        <ListGroup.Item
          key={idx}
          id={item.name}
          active={selectedItem === item.name ? true : false}
        >
          {item.name}
        </ListGroup.Item>
      ))}
    </>
  );
}

export default List;
