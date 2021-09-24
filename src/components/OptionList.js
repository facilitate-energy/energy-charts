import React from "react";

function OptionList(props) {
  const { items } = props;

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
