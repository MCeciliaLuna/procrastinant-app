import PropTypes from 'prop-types';

const Title = ({level = 1, children, className = '', ...restProps}) => {
  const validLevel = Math.min(Math.max(parseInt(level) || 1, 1), 6);

  const Tag = `h${validLevel}`;

  return (
    <Tag className={className} {...restProps}>
      {children}
    </Tag>
  );
};

Title.propTypes = {
  level: PropTypes.oneOf([1, 2, 3, 4, 5, 6]),
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Title;
