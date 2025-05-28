import React from "react";
import { observer } from "mobx-react-lite";
import TextInput from "./TextInput";
import { ControlStore } from "../stores/ControlStore";

interface ButtonConfig {
  text: string;
  callback: () => void;
}

interface ButtonControlProps {
  store: ControlStore;
  buttonsLeft?: ButtonConfig[];
  buttonsRight?: ButtonConfig[];
}

const ButtonControl: React.FC<ButtonControlProps> = observer(({ store, buttonsLeft = [], buttonsRight = [] }) => {
  return (
    <div className="button-control">
      {buttonsLeft.map((btn, index) => (
        <button key={`left-${index}`} onClick={btn.callback}>
          {btn.text}
        </button>
      ))}
      <TextInput value={store.text} onChange={(value) => store.setText(value)} />
      {buttonsRight.map((btn, index) => (
        <button key={`right-${index}`} onClick={btn.callback}>
          {btn.text}
        </button>
      ))}
    </div>
  );
});

export default ButtonControl;