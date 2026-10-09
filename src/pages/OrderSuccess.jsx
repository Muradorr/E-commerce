import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from '../components/Icon';
import PageContainer from '../components/PageContainer';
import EmptyState from '../components/EmptyState';
import OrderSummary from '../components/OrderSummary';
import { formatDate } from '../utils/format';
import { orderPropType } from '../utils/propTypes';

function OrderSuccess({ orders }) {
  const { orderId } = useParams();
  const order = orders.find((entry) => entry.id === orderId);

  if (order === undefined) {
    return (
      <PageContainer>
        <EmptyState
          icon="box"
          title="Order not found"
          message="We could not find that order. Please check the order number or continue shopping."
          actionLabel="Back to shop"
          actionTo="/"
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="flex flex-col items-center text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-zinc-700">
          <Icon name="checkCircle" className="h-10 w-10" />
        </span>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-zinc-950 md:text-5xl">Order placed!</h1>
        <p className="mt-3 max-w-md text-sm leading-relaxed text-zinc-500">
          Thank you, {order.customer.fullName}. Your order is being prepared and will be delivered to the address
          below. Please have the exact amount ready for the courier.
        </p>
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <section aria-label="Order details" className="rounded-3xl border border-zinc-200 p-6 sm:p-8">
          <dl className="grid gap-6 text-sm sm:grid-cols-2">
            <div>
              <dt className="font-semibold text-zinc-400">Order number</dt>
              <dd className="mt-1 text-lg font-extrabold text-zinc-950">{order.id}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-400">Date placed</dt>
              <dd className="mt-1 font-bold text-zinc-950">{formatDate(order.placedAt)}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-400">Customer</dt>
              <dd className="mt-1 font-bold text-zinc-950">{order.customer.fullName}</dd>
              <dd className="text-zinc-500">{order.customer.email}</dd>
              <dd className="text-zinc-500">{order.customer.phone}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-400">Delivery address</dt>
              <dd className="mt-1 text-zinc-700">{order.customer.address}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-400">Payment method</dt>
              <dd className="mt-1 font-bold text-zinc-950">{order.paymentMethod}</dd>
            </div>
            <div>
              <dt className="font-semibold text-zinc-400">Status</dt>
              <dd className="mt-1">
                <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">
                  {order.status}
                </span>
              </dd>
            </div>
          </dl>
        </section>

        <OrderSummary items={order.items} title="Items Ordered" showItems />
      </div>

      <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="rounded-full bg-zinc-950 px-8 py-4 text-center text-sm font-bold text-white transition hover:bg-zinc-700 active:scale-95"
        >
          Continue Shopping
        </Link>
        <Link
          to="/orders"
          className="rounded-full border border-zinc-300 px-8 py-4 text-center text-sm font-bold text-zinc-950 transition hover:bg-zinc-100 active:scale-95"
        >
          View All Orders
        </Link>
      </div>
    </PageContainer>
  );
}

OrderSuccess.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
};

export default OrderSuccess;
