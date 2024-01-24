const Button = ({ onClick, label, size, disabled }) => {
  return <button style={{ width: size }} disabled={disabled} className='btn btn-primary' onClick={onClick}>{label}</button>
}
export default Button