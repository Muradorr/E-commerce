import PropTypes from 'prop-types';

export const productPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  oldPrice: PropTypes.number,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  imageFit: PropTypes.oneOf(['contain', 'cover']).isRequired,
  description: PropTypes.string.isRequired,
  details: PropTypes.string.isRequired,
  highlights: PropTypes.arrayOf(PropTypes.string).isRequired,
  isNew: PropTypes.bool.isRequired,
  isBestSeller: PropTypes.bool.isRequired,
});

export const cartItemPropType = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  stock: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  imageFit: PropTypes.oneOf(['contain', 'cover']).isRequired,
  quantity: PropTypes.number.isRequired,
});

export const orderPropType = PropTypes.shape({
  id: PropTypes.string.isRequired,
  customer: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf(cartItemPropType).isRequired,
  total: PropTypes.number.isRequired,
  paymentMethod: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  placedAt: PropTypes.string.isRequired,
});

export const filtersPropType = PropTypes.shape({
  search: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  collections: PropTypes.arrayOf(PropTypes.string).isRequired,
  page: PropTypes.number.isRequired,
});
