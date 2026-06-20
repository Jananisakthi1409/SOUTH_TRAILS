// src/components/Button.jsx
const Button = ({ children, ...props }) => {
  return <button {...props}>{children}</button>;
};

export default Button;
