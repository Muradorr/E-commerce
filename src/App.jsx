import { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FlyToCart from './components/FlyToCart';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Favorites from './pages/Favorites';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Orders from './pages/Orders';
import NotFound from './pages/NotFound';
import { catalogFilterDefaults, ridleysCatalog } from './data/products';
import { getCartCount, getCartTotal } from './utils/cart';

function App() {
  const navigate = useNavigate();

  const [products, setProducts] = useState(ridleysCatalog);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [orders, setOrders] = useState([]);
  const [catalogFilters, setCatalogFilters] = useState(catalogFilterDefaults);

  const [flyers, setFlyers] = useState([]);
  const [cartPulse, setCartPulse] = useState(0);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    if (notice === null) {
      return undefined;
    }
    const timer = setTimeout(() => setNotice(null), 2800);
    return () => clearTimeout(timer);
  }, [notice]);

  const showNotice = (message) => {
    setNotice({ id: Date.now(), message });
  };

  const handleFlyerDone = useCallback((flyerId) => {
    setFlyers((current) => current.filter((flyer) => flyer.id !== flyerId));
    setCartPulse((current) => current + 1);
  }, []);

  const launchFlyer = (product, sourceElement) => {
    const cartIcon = document.getElementById('nav-cart');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (sourceElement === null || cartIcon === null || prefersReducedMotion === true) {
      setCartPulse((current) => current + 1);
      return;
    }

    const from = sourceElement.getBoundingClientRect();
    const to = cartIcon.getBoundingClientRect();

    const flyer = {
      id: Date.now() + Math.random(),
      image: product.image,
      fit: product.imageFit,
      left: from.left,
      top: from.top,
      width: from.width,
      height: from.height,
      deltaX: to.left + to.width / 2 - (from.left + from.width / 2),
      deltaY: to.top + to.height / 2 - (from.top + from.height / 2),
      scale: 26 / Math.max(from.width, from.height),
    };

    setFlyers((current) => [...current, flyer]);
  };

  const addProductToBag = (product, quantity = 1, sourceElement = null) => {
    const existing = cart.find((item) => item.id === product.id);
    const currentQuantity = existing === undefined ? 0 : existing.quantity;

    if (product.stock === 0) {
      showNotice(product.name + ' is out of stock.');
      return false;
    }

    if (currentQuantity + quantity > product.stock) {
      if (currentQuantity === 0) {
        showNotice('Only ' + product.stock + ' of ' + product.name + ' in stock.');
      } else {
        showNotice('Only ' + product.stock + ' in stock. You already have ' + currentQuantity + ' in your cart.');
      }
      return false;
    }

    if (existing === undefined) {
      setCart([...cart, { ...product, quantity }]);
    } else {
      setCart(
        cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + quantity };
          }
          return item;
        })
      );
    }

    launchFlyer(product, sourceElement);
    return true;
  };

  const toggleSavedProduct = (productId) => {
    const product = products.find((item) => item.id === productId);

    if (favorites.includes(productId)) {
      setFavorites(favorites.filter((id) => id !== productId));
      if (product !== undefined) {
        showNotice(product.name + ' removed from favorites.');
      }
    } else {
      setFavorites([...favorites, productId]);
      if (product !== undefined) {
        showNotice(product.name + ' added to favorites.');
      }
    }
  };

  const purchaseProductNow = (product, quantity = 1) => {
    if (product.stock === 0) {
      showNotice(product.name + ' is out of stock.');
      return;
    }

    const existing = cart.find((item) => item.id === product.id);
    const wantedQuantity = Math.min(product.stock, Math.max(quantity, existing === undefined ? 0 : existing.quantity));

    if (existing === undefined) {
      setCart([...cart, { ...product, quantity: wantedQuantity }]);
    } else {
      setCart(
        cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: wantedQuantity };
          }
          return item;
        })
      );
    }

    navigate('/checkout');
  };

  const increaseBagQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId && item.quantity < item.stock) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decreaseBagQuantity = (productId) => {
    setCart(
      cart.map((item) => {
        if (item.id === productId && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };

  const removeBagProduct = (productId) => {
    const removed = cart.find((item) => item.id === productId);
    setCart(cart.filter((item) => item.id !== productId));
    if (removed !== undefined) {
      showNotice(removed.name + ' removed from your cart.');
    }
  };

  const clearShoppingBag = () => {
    setCart([]);
    showNotice('Your cart has been cleared.');
  };

  const submitCustomerOrder = (customer, paymentMethod) => {
    const newOrder = {
      id: 'ORD-' + (1001 + orders.length),
      customer,
      items: cart,
      total: getCartTotal(cart),
      paymentMethod,
      status: 'Processing',
      placedAt: new Date().toISOString(),
    };

    setOrders([newOrder, ...orders]);

    setProducts(
      products.map((product) => {
        const purchased = cart.find((item) => item.id === product.id);
        if (purchased !== undefined) {
          return { ...product, stock: product.stock - purchased.quantity };
        }
        return product;
      })
    );

    setCart([]);
    return newOrder.id;
  };

  return (
    <div className="min-h-screen bg-white font-sans text-zinc-950 selection:bg-zinc-950 selection:text-white">
      <ScrollToTop />
      <Navbar cartCount={getCartCount(cart)} favoritesCount={favorites.length} cartPulse={cartPulse} />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                favorites={favorites}
                filters={catalogFilters}
                setFilters={setCatalogFilters}
                onToggleFavorite={toggleSavedProduct}
                onAddToCart={addProductToBag}
                onBuyNow={purchaseProductNow}
              />
            }
          />
          <Route
            path="/product/:id"
            element={
              <ProductDetails
                products={products}
                cart={cart}
                favorites={favorites}
                onToggleFavorite={toggleSavedProduct}
                onAddToCart={addProductToBag}
                onBuyNow={purchaseProductNow}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites
                products={products}
                favorites={favorites}
                onToggleFavorite={toggleSavedProduct}
                onAddToCart={addProductToBag}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                onIncrease={increaseBagQuantity}
                onDecrease={decreaseBagQuantity}
                onRemove={removeBagProduct}
                onClear={clearShoppingBag}
              />
            }
          />
          <Route path="/checkout" element={<Checkout cart={cart} onPlaceOrder={submitCustomerOrder} />} />
          <Route path="/order-success/:orderId" element={<OrderSuccess orders={orders} />} />
          <Route path="/orders" element={<Orders orders={orders} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <FlyToCart flyers={flyers} onDone={handleFlyerDone} />
      <Toast notice={notice} />
    </div>
  );
}

export default App;
