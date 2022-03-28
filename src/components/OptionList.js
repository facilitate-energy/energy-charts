import React from "react";

function OptionList(props) {
  const { noneItem, itemTitles } = props;

  const items = noneItem ? ["none"].concat(props.items) : props.items;

  return (
    <>
      {items.map((item, idx) => (
        <option key={idx} value={item}>
          {itemTitles[item] || item}
        </option>
      ))}
    </>
  );
}

export default OptionList;
