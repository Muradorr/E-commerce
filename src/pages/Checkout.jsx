import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import FormField from '../components/FormField';
import OrderSummary from '../components/OrderSummary';
import { formatPrice } from '../utils/format';
import { getCartTotal } from '../utils/cart';
import { cartItemPropType } from '../utils/propTypes';
import { validateCheckoutField, validateCheckoutForm } from '../utils/validators';

const emptyForm = {
  fullName: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: 'Cash on Delivery',
};

function Checkout({ cart, onPlaceOrder }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [formMessage, setFormMessage] = useState('');

  const getError = (name) => {
    if (errors[name] === undefined) {
      return '';
    }
    return errors[name];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (getError(name) !== '') {
      setErrors({ ...errors, [name]: validateCheckoutField(name, value) });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setErrors({ ...errors, [name]: validateCheckoutField(name, value) });
  };

  const handleInvalid = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let message = validateCheckoutField(name, value);

    if (message === '') {
      message = e.target.validationMessage;
    }

    setErrors((current) => ({ ...current, [name]: message }));
    setFormMessage('Please fix the highlighted fields before placing your order.');

    if (e.target.form.querySelector(':invalid') === e.target) {
      e.target.focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateCheckoutForm(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setFormMessage('Please fix the highlighted fields before placing your order.');
      return;
    }

    setFormMessage('');

    const customer = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      address: formData.address.trim(),
    };

    const orderId = onPlaceOrder(customer, formData.paymentMethod);
    navigate('/order-success/' + orderId, { flushSync: true });
  };

  const renderFormMessage = () => {
    const hasErrors = Object.values(errors).some((message) => message !== '');

    if (formMessage === '' || hasErrors === false) {
      return null;
    }
    return (
      <p role="alert" className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
        {formMessage}
      </p>
    );
  };

  const renderPaymentError = () => {
    if (getError('paymentMethod') === '') {
      return null;
    }
    return (
      <p role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
        {getError('paymentMethod')}
      </p>
    );
  };

  if (cart.length === 0) {
    return (
      <PageContainer>
        <PageHeader eyebrow="Checkout" title="Checkout" />
        <div className="mt-8">
          <EmptyState
            icon="cart"
            title="Nothing to check out yet"
            message="Your cart is empty. Add a few products first, then come back to place your order."
            actionLabel="Browse products"
            actionTo="/"
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader eyebrow="Checkout" title="Delivery details" subtitle="Fields marked with * are required." />

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_22rem]">
        <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-6" aria-label="Checkout form">
          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              name="fullName"
              label="Full Name"
              value={formData.fullName}
              error={getError('fullName')}
              onChange={handleChange}
              onBlur={handleBlur}
              onInvalid={handleInvalid}
              placeholder="Juan Dela Cruz"
              autoComplete="name"
              required
              minLength={3}
              maxLength={60}
            />
            <FormField
              name="email"
              label="Email Address"
              type="email"
              value={formData.email}
              error={getError('email')}
              onChange={handleChange}
              onBlur={handleBlur}
              onInvalid={handleInvalid}
              placeholder="you@example.com"
              autoComplete="email"
              inputMode="email"
              required
              maxLength={80}
            />
          </div>

          <FormField
            name="phone"
            label="Phone Number"
            type="tel"
            value={formData.phone}
            error={getError('phone')}
            hint="10 to 13 digits. You may start with +, for example +63 912 345 6789."
            onChange={handleChange}
            onBlur={handleBlur}
            onInvalid={handleInvalid}
            placeholder="0912 345 6789"
            autoComplete="tel"
            inputMode="tel"
            required
            minLength={10}
            maxLength={16}
          />

          <FormField
            name="address"
            label="Delivery Address"
            as="textarea"
            value={formData.address}
            error={getError('address')}
            hint="House or unit number, street, barangay, city, and province."
            onChange={handleChange}
            onBlur={handleBlur}
            onInvalid={handleInvalid}
            placeholder="123 Rizal Street, Barangay San Antonio, Pasig City"
            autoComplete="street-address"
            required
            minLength={10}
            maxLength={200}
            rows={3}
          />

          <fieldset>
            <legend className="mb-2 text-sm font-bold text-zinc-950">
              Payment Method<span className="ml-0.5 text-red-500">*</span>
            </legend>
            <label className="flex cursor-pointer items-start gap-4 rounded-2xl border-2 border-zinc-950 bg-white p-4">
              <input
                type="radio"
                name="paymentMethod"
                value="Cash on Delivery"
                checked={formData.paymentMethod === 'Cash on Delivery'}
                onChange={handleChange}
                onInvalid={handleInvalid}
                required
                className="mt-1 h-4 w-4 accent-zinc-950"
              />
              <span>
                <span className="block text-sm font-bold text-zinc-950">Cash on Delivery</span>
                <span className="mt-0.5 block text-xs text-zinc-500">
                  Pay in cash when your order arrives at your door. No online payment needed.
                </span>
              </span>
            </label>
            {renderPaymentError()}
          </fieldset>

          {renderFormMessage()}

          <button
            type="submit"
            className="cursor-pointer rounded-full bg-zinc-950 py-4 text-sm font-bold text-white transition hover:bg-zinc-700 active:scale-95"
          >
            Place Order ({formatPrice(getCartTotal(cart))})
          </button>
        </form>

        <OrderSummary items={cart} title="Your Order" showItems sticky />
      </div>
    </PageContainer>
  );
}

Checkout.propTypes = {
  cart: PropTypes.arrayOf(cartItemPropType).isRequired,
  onPlaceOrder: PropTypes.func.isRequired,
};

export default Checkout;
