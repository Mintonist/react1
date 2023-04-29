import React, { useState } from 'react';

interface TFProps {
  children: any;
  value: boolean;
  name: string;
  error?: string;
  onChange: any;
}

const CheckBoxField = ({ children, value, name, error = null, onChange }: TFProps) => {
  const handleChange = () => {
    onChange({ name: name, value: !value });
  };

  return (
    <div className="mb-3">
      <div className={'form-check ' + (error ? 'is-invalid' : '')}>
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id={name}
          checked={value}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor={name}>
          {children}
        </label>
      </div>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

export default CheckBoxField;
