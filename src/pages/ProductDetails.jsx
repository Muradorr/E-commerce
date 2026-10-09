import { Link, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import EmptyState from '../components/EmptyState';
import ProductDetailView from '../components/ProductDetailView';
import RecommendationSlider from '../components/RecommendationSlider';
import { cartItemPropType, productPropType } from '../utils/propTypes';

function ProductDetails({ products, cart, favorites, onToggleFavorite, onAddToCart, onBuyNow }) {
  const { id } = useParams();
  const product = products.find((item) => item.id === Number(id));

  if (product === undefined) {
    return (
      <PageContainer>
        <EmptyState
          icon="box"
          title="Product not found"
          message="The product you are looking for does not exist or has been removed."
          actionLabel="Back to shop"
          actionTo="/"
        />
      </PageContainer>
    );
  }

  const cartItem = cart.find((item) => item.id === product.id);
  const cartQuantity = cartItem === undefined ? 0 : cartItem.quantity;
  const relatedProducts = products.filter((item) => item.category === product.category && item.id !== product.id);

  const renderRelated = () => {
    if (relatedProducts.length === 0) {
      return null;
    }
    return (
      <div className="mt-24">
        <RecommendationSlider
          title={'More from ' + product.category}
          products={relatedProducts}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      </div>
    );
  };

  return (
    <PageContainer>
      <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm text-zinc-500">
        <Link to="/" className="transition hover:text-zinc-950">
          Home
        </Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
        <span aria-hidden="true">/</span>
        <span className="font-semibold text-zinc-950">{product.name}</span>
      </nav>

      <ProductDetailView
        key={product.id}
        product={product}
        isFavorite={favorites.includes(product.id)}
        cartQuantity={cartQuantity}
        onToggleFavorite={onToggleFavorite}
        onAddToCart={onAddToCart}
        onBuyNow={onBuyNow}
      />

      {renderRelated()}
    </PageContainer>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  cart: PropTypes.arrayOf(cartItemPropType).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

export default ProductDetails;
