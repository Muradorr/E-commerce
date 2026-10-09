import PropTypes from 'prop-types';
import Icon from './Icon';

function QuantityStepper({ quantity, min = 1, max, onIncrease, onDecrease, label = 'item' }) {
  const buttonClass =
    'flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-zinc-900 transition hover:bg-zinc-200 active:scale-90 disabled:cursor-not-allowed disabled:text-zinc-300 disabled:hover:bg-transparent';

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-white p-1">
      <button
        type="button"
        onClick={onDecrease}
        disabled={quantity <= min}
        aria-label={'Decrease quantity of ' + label}
        className={buttonClass}
      >
        <Icon name="minus" className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-bold tabular-nums" aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        onClick={onIncrease}
        disabled={quantity >= max}
        aria-label={'Increase quantity of ' + label}
        className={buttonClass}
      >
        <Icon name="plus" className="h-4 w-4" />
      </button>
    </div>
  );
}

QuantityStepper.propTypes = {
  quantity: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  label: PropTypes.string,
};

export default QuantityStepper;
