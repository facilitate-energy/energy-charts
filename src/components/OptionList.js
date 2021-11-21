import React from "react";

function OptionList(props) {
  const { noneItem } = props;

  const items = noneItem ? ["none"].concat(props.items) : props.items;

  return (
    <>
      {items.map((item, idx) => (
        <option key={idx} value={item}>
          {item}
        </option>
      ))}
    </>
  );
}

export default OptionList;
