import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
  required,
}) => (
  <div className="input-container">
    <label>{label}:</label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      required={required}
    />
  </div>
);

export default InputField;
