import PropTypes from 'prop-types';

const Parrafo = ({children, className = '', ...restProps}) => {
  return (
    <p className={className} {...restProps}>
      {children}
    </p>
  );
};

Parrafo.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Parrafo;
