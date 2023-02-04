import React from 'react';

interface InputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputProps> = ({
  label,
  type,
  value,
  onChange,
}) => (
  <div>
    <label>{label}:</label>
    <input type={type} value={value} onChange={onChange} />
  </div>
);

export default InputField;
