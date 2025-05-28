import React from "react";
import { observer } from "mobx-react-lite";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextInput: React.FC<TextInputProps> = observer(({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="text-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
    />
  );
});

export default TextInput;