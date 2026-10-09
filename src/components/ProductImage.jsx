import { useState } from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

function ProductImage({ src, alt, fit = 'contain', className = '' }) {
  const [failedSrc, setFailedSrc] = useState('');

  const getFitClass = () => {
    if (fit === 'cover') {
      return 'object-cover object-top ';
    }
    return 'object-contain p-[12%] mix-blend-multiply ';
  };

  if (failedSrc === src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={'flex items-center justify-center bg-zinc-200 text-zinc-400 ' + className}
      >
        <Icon name="image" className="h-1/4 w-1/4" />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      draggable={false}
      onError={() => setFailedSrc(src)}
      className={getFitClass() + className}
    />
  );
}

ProductImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fit: PropTypes.oneOf(['contain', 'cover']),
  className: PropTypes.string,
};

export default ProductImage;
