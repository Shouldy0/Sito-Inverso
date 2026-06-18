import './Button.css';

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
  return (
    <button 
      type={type} 
      className={`btn btn-${variant} ${className}`} 
      onClick={onClick}
    >
      <span className="btn-content">{children}</span>
    </button>
  );
};

export default Button;
