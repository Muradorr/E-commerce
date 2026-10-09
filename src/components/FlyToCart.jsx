import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ProductImage from './ProductImage';

const FLIGHT_MS = 900;

function Flyer({ flyer, onDone }) {
  const [launched, setLaunched] = useState(false);

  useEffect(() => {
    const launchTimer = setTimeout(() => setLaunched(true), 30);
    const doneTimer = setTimeout(() => onDone(flyer.id), FLIGHT_MS + 60);
    return () => {
      clearTimeout(launchTimer);
      clearTimeout(doneTimer);
    };
  }, [flyer.id, onDone]);

  const horizontalStyle = {
    position: 'fixed',
    left: flyer.left,
    top: flyer.top,
    width: flyer.width,
    height: flyer.height,
    zIndex: 100,
    pointerEvents: 'none',
    transform: launched === true ? 'translateX(' + flyer.deltaX + 'px)' : 'translateX(0px)',
    transition: 'transform ' + FLIGHT_MS + 'ms cubic-bezier(0.55, 0.085, 0.68, 0.53)',
  };

  const verticalStyle = {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    background: '#f4f4f5',
    boxShadow: '0 18px 40px rgba(0, 0, 0, 0.25)',
    borderRadius: launched === true ? '9999px' : '1.5rem',
    opacity: launched === true ? 0.6 : 1,
    transform:
      launched === true
        ? 'translateY(' + flyer.deltaY + 'px) scale(' + flyer.scale + ')'
        : 'translateY(0px) scale(1)',
    transition:
      'transform ' + FLIGHT_MS + 'ms cubic-bezier(0.25, 0.46, 0.45, 0.94), ' +
      'border-radius ' + FLIGHT_MS + 'ms ease-in, ' +
      'opacity ' + FLIGHT_MS + 'ms ease-in',
  };

  return (
    <div style={horizontalStyle}>
      <div style={verticalStyle}>
        <ProductImage src={flyer.image} alt="" fit={flyer.fit} className="h-full w-full" />
      </div>
    </div>
  );
}

Flyer.propTypes = {
  flyer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    fit: PropTypes.oneOf(['contain', 'cover']).isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    deltaX: PropTypes.number.isRequired,
    deltaY: PropTypes.number.isRequired,
    scale: PropTypes.number.isRequired,
  }).isRequired,
  onDone: PropTypes.func.isRequired,
};

function FlyToCart({ flyers, onDone }) {
  return (
    <div aria-hidden="true">
      {flyers.map((flyer) => (
        <Flyer key={flyer.id} flyer={flyer} onDone={onDone} />
      ))}
    </div>
  );
}

FlyToCart.propTypes = {
  flyers: PropTypes.arrayOf(PropTypes.object).isRequired,
  onDone: PropTypes.func.isRequired,
};

export default FlyToCart;
