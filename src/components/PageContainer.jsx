import PropTypes from 'prop-types';

function PageContainer({ children, className = '' }) {
  return <div className={'mx-auto max-w-6xl px-4 pb-20 pt-28 sm:px-6 ' + className}>{children}</div>;
}

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default PageContainer;
