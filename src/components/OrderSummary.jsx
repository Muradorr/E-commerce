import PropTypes from 'prop-types';
import { formatPrice } from '../utils/format';
import { getCartCount, getCartTotal, getItemSubtotal } from '../utils/cart';
import { cartItemPropType } from '../utils/propTypes';

function OrderSummary({ items, title = 'Order Summary', showItems = false, sticky = false, children = null }) {
  const itemCount = getCartCount(items);
  const total = getCartTotal(items);

  const renderItems = () => {
    if (showItems === false) {
      return null;
    }
    return (
      <ul className="mt-5 space-y-3 border-b border-zinc-200 pb-5">
        {items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
            <span className="text-zinc-600">
              <span className="font-bold text-zinc-950">{item.quantity} x</span> {item.name}
            </span>
            <span className="shrink-0 font-semibold text-zinc-950">{formatPrice(getItemSubtotal(item))}</span>
          </li>
        ))}
      </ul>
    );
  };

  const renderActions = () => {
    if (children === null) {
      return null;
    }
    return <div className="mt-6 flex flex-col gap-3">{children}</div>;
  };

  return (
    <aside
      aria-label={title}
      className={'h-fit rounded-3xl bg-zinc-100 p-6 ' + (sticky === true ? 'lg:sticky lg:top-28' : '')}
    >
      <h2 className="text-xl font-extrabold text-zinc-950">{title}</h2>
      {renderItems()}
      <dl className="mt-5 space-y-3 text-sm">
        <div className="flex justify-between">
          <dt className="text-zinc-500">Items</dt>
          <dd className="font-semibold text-zinc-950">{itemCount}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500">Subtotal</dt>
          <dd className="font-semibold text-zinc-950">{formatPrice(total)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-zinc-500">Delivery</dt>
          <dd className="font-semibold text-zinc-700">Free</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-zinc-300 pt-4">
          <dt className="text-base font-bold text-zinc-950">Total</dt>
          <dd className="text-2xl font-extrabold text-zinc-950">{formatPrice(total)}</dd>
        </div>
      </dl>
      {renderActions()}
    </aside>
  );
}

OrderSummary.propTypes = {
  items: PropTypes.arrayOf(cartItemPropType).isRequired,
  title: PropTypes.string,
  showItems: PropTypes.bool,
  sticky: PropTypes.bool,
  children: PropTypes.node,
};

export default OrderSummary;
