import React, { useState } from "react";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";

function ToggleButtons() {
  const [value, setValue] = useState(["M1"]);

  const handleChange = (val) => setValue(val);

  console.log(value);

  return (
    <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
      <ToggleButton id="tbg-btn-1" variant="outline-danger" value={"T2"}>
        Times 2
      </ToggleButton>{" "}
      <ToggleButton id="tbg-btn-2" variant="outline-danger" value={"M1"}>
        Minus 1
      </ToggleButton>
      <ToggleButton id="tbg-btn-3" variant="outline-danger" value={"M2"}>
        Minus 1
      </ToggleButton>
      <ToggleButton id="tbg-btn-4" variant="outline-danger" value={"M3"}>
        Minus 1
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

export default ToggleButtons;
