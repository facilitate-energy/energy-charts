import React from "react";
import { ListGroup } from "react-bootstrap";

function List(props) {
  const { noneItem, onSelection, itemTitles } = props;

  const items = noneItem ? ["none"].concat(props.items) : props.items;
  const selectedItem =
    noneItem && !props.selectedItem ? "none" : props.selectedItem;

  return (
    <>
      {items.map((item, idx) => (
        <ListGroup.Item
          key={idx}
          id={item}
          as="li"
          active={selectedItem === item}
          onClick={() => {
            onSelection(item);
          }}
        >
          {(itemTitles && itemTitles[item]) || item}
        </ListGroup.Item>
      ))}
    </>
  );
}

export default List;
