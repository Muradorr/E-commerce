import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import BagLineItem from '../components/BagLineItem';
import OrderSummary from '../components/OrderSummary';
import { getCartCount } from '../utils/cart';
import { cartItemPropType } from '../utils/propTypes';

function Cart({ cart, onIncrease, onDecrease, onRemove, onClear }) {
  const itemCount = getCartCount(cart);

  if (cart.length === 0) {
    return (
      <PageContainer>
        <PageHeader eyebrow="Shopping Cart" title="Your cart" />
        <div className="mt-8">
          <EmptyState
            icon="cart"
            title="Your cart is empty"
            message="Looks like you have not added anything yet. Browse the shop and find something you like."
            actionLabel="Start shopping"
            actionTo="/"
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Shopping Cart"
        title="Your cart"
        subtitle={itemCount + (itemCount === 1 ? ' item' : ' items') + ' ready for checkout'}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <ul className="space-y-4">
          {cart.map((item) => (
            <li key={item.id}>
              <BagLineItem item={item} onIncrease={onIncrease} onDecrease={onDecrease} onRemove={onRemove} />
            </li>
          ))}
        </ul>

        <OrderSummary items={cart} sticky>
          <Link
            to="/checkout"
            className="rounded-full bg-zinc-950 py-4 text-center text-sm font-bold text-white transition hover:bg-zinc-700 active:scale-95"
          >
            Proceed to Checkout
          </Link>
          <Link
            to="/"
            className="rounded-full border border-zinc-300 py-4 text-center text-sm font-bold text-zinc-950 transition hover:bg-zinc-200 active:scale-95"
          >
            Continue Shopping
          </Link>
          <button
            type="button"
            onClick={onClear}
            className="cursor-pointer text-xs font-bold text-zinc-500 underline underline-offset-4 transition hover:text-zinc-700"
          >
            Clear cart
          </button>
        </OrderSummary>
      </div>
    </PageContainer>
  );
}

Cart.propTypes = {
  cart: PropTypes.arrayOf(cartItemPropType).isRequired,
  onIncrease: PropTypes.func.isRequired,
  onDecrease: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
};

export default Cart;
