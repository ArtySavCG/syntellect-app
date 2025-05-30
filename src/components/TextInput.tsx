import React from "react";
import { observer } from "mobx-react-lite";

interface TextInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onBlur?: () => void;
}

const TextInput: React.FC<TextInputProps> = observer(({ value, onChange, placeholder, onBlur }) => {
  return (
    <input
      type="text"
      className="text-input"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      onBlur={onBlur}
    />
  );
});

export default TextInput;