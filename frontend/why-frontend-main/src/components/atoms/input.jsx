const Input = ({ label, type, placeholder, name, value, onChange, required, disabled, pattern, title }) => {
  return (
    <div className='column'>
      <label>{label}</label>
      <input style={{ width: '100%' }}
        className='invalid'
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        pattern={pattern}
        title={title}
      />
    </div>
  )
}

export default Input