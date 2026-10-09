import PropTypes from 'prop-types';
import Icon from './Icon';
import { formatReviews } from '../utils/format';

function Rating({ rating, reviews, className = '' }) {
  return (
    <div className={'flex items-center gap-1 text-xs text-zinc-500 ' + className}>
      <Icon name="star" filled className="h-3.5 w-3.5 text-zinc-800" />
      <span className="font-bold text-zinc-800">{rating.toFixed(1)}</span>
      <span>({formatReviews(reviews)} Reviews)</span>
    </div>
  );
}

Rating.propTypes = {
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  className: PropTypes.string,
};

export default Rating;
