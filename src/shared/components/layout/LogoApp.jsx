import PropTypes from 'prop-types';

function LogoApp({ width = '100px', className = '', ...restProps }) {
  return (
    <img
      src="/public/icons/logo.png"
      alt="Logo"
      width={width}
      className={className}
      {...restProps}
    />
  );
}

LogoApp.propTypes = {
  width: PropTypes.string,
  className: PropTypes.string,
};

export default LogoApp;
