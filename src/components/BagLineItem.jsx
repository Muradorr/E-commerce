import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from './Icon';
import ProductImage from './ProductImage';
import QuantityStepper from './QuantityStepper';
import { formatPrice } from '../utils/format';
import { getItemSubtotal } from '../utils/cart';
import { cartItemPropType } from '../utils/propTypes';

function BagLineItem({ item, onIncrease, onDecrease, onRemove }) {
  const renderInventoryNotice = () => {
    if (item.quantity >= item.stock) {
      return <p className="mt-1 text-xs font-semibold text-zinc-700">Maximum stock reached</p>;
    }
    return null;
  };

  return (
    <article className="flex flex-col gap-4 rounded-3xl border border-zinc-200 bg-white p-4 sm:flex-row sm:items-center">
      <Link
        to={'/product/' + item.id}
        className="block h-28 w-28 shrink-0 overflow-hidden rounded-2xl bg-zinc-100"
        aria-label={'View details of ' + item.name}
      >
        <ProductImage src={item.image} alt={item.name} fit={item.imageFit} className="h-full w-full" />
      </Link>

      <div className="min-w-0 flex-1">
        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{item.category}</span>
        <Link to={'/product/' + item.id} className="block truncate text-base font-bold text-zinc-950 hover:text-zinc-500">
          {item.name}
        </Link>
        <p className="mt-1 text-sm text-zinc-500">{formatPrice(item.price)} each</p>
        {renderInventoryNotice()}
      </div>

      <div className="flex items-center justify-between gap-4 sm:justify-end">
        <QuantityStepper
          quantity={item.quantity}
          max={item.stock}
          label={item.name}
          onIncrease={() => onIncrease(item.id)}
          onDecrease={() => onDecrease(item.id)}
        />
        <div className="w-24 text-right">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Subtotal</p>
          <p className="text-lg font-extrabold text-zinc-950">{formatPrice(getItemSubtotal(item))}</p>
        </div>
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          aria-label={'Remove ' + item.name + ' from cart'}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-50 hover:text-zinc-700 active:scale-90"
        >
          <Icon name="trash" className="h-5 w-5" />
        </button>
      </div>
    </article>
  );
}

BagLineItem.propTypes = {
  item: cartItemPropType.isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default BagLineItem;
