import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import { formatDate, formatPrice } from '../utils/format';
import { getCartCount } from '../utils/cart';
import { orderPropType } from '../utils/propTypes';

function Orders({ orders }) {
  if (orders.length === 0) {
    return (
      <PageContainer>
        <PageHeader eyebrow="Order History" title="Your orders" />
        <div className="mt-8">
          <EmptyState
            icon="box"
            title="No orders yet"
            message="Orders you place will show up here so you can follow their status."
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
        eyebrow="Order History"
        title="Your orders"
        subtitle={'You have ' + orders.length + (orders.length === 1 ? ' order' : ' orders') + ' so far'}
      />

      <div className="mt-8 overflow-x-auto rounded-3xl border border-zinc-200">
        <table className="w-full min-w-176 text-left text-sm">
          <caption className="sr-only">Your orders</caption>
          <thead className="bg-zinc-100 text-xs uppercase tracking-wider text-zinc-500">
            <tr>
              <th scope="col" className="px-5 py-4 font-bold">Order</th>
              <th scope="col" className="px-5 py-4 font-bold">Date</th>
              <th scope="col" className="px-5 py-4 font-bold">Customer</th>
              <th scope="col" className="px-5 py-4 font-bold">Items</th>
              <th scope="col" className="px-5 py-4 font-bold">Payment</th>
              <th scope="col" className="px-5 py-4 text-right font-bold">Total</th>
              <th scope="col" className="px-5 py-4 font-bold">Status</th>
              <th scope="col" className="px-5 py-4 font-bold">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {orders.map((order) => (
              <tr key={order.id} className="transition hover:bg-zinc-50">
                <th scope="row" className="px-5 py-4 font-extrabold text-zinc-950">{order.id}</th>
                <td className="px-5 py-4 text-zinc-600">{formatDate(order.placedAt)}</td>
                <td className="px-5 py-4">
                  <span className="block font-semibold text-zinc-950">{order.customer.fullName}</span>
                  <span className="block text-xs text-zinc-500">{order.customer.email}</span>
                </td>
                <td className="px-5 py-4 text-zinc-600">{getCartCount(order.items)}</td>
                <td className="px-5 py-4 text-zinc-600">{order.paymentMethod}</td>
                <td className="px-5 py-4 text-right font-extrabold text-zinc-950">{formatPrice(order.total)}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-bold text-zinc-700">
                    {order.status}
                  </span>
                </td>
                <td className="px-5 py-4 text-right">
                  <Link
                    to={'/order-success/' + order.id}
                    className="rounded-full border border-zinc-300 px-4 py-2 text-xs font-bold text-zinc-950 transition hover:bg-zinc-950 hover:text-white"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}

Orders.propTypes = {
  orders: PropTypes.arrayOf(orderPropType).isRequired,
};

export default Orders;
