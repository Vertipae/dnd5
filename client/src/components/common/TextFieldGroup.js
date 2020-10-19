import React from "react"

export default function TextFieldGroup({
  value,
  onChange,
  className,
  type,
  name,
  label,
  error,
}) {
  return (
    <div className="input-field">
      <input
        value={value}
        onChange={onChange}
        className={error ? className + " invalid" : className}
        type={type}
        name={name}
      />
      <label>{label}</label>
      {error && <div>{error}</div>}
    </div>
  )
}
