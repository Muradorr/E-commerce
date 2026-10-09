import PropTypes from 'prop-types';
import PageContainer from '../components/PageContainer';
import PageHeader from '../components/PageHeader';
import EmptyState from '../components/EmptyState';
import FavoriteItem from '../components/FavoriteItem';
import { productPropType } from '../utils/propTypes';

function Favorites({ products, favorites, onToggleFavorite, onAddToCart }) {
  const favoriteProducts = [...favorites]
    .reverse()
    .map((productId) => products.find((product) => product.id === productId))
    .filter((product) => product !== undefined);

  if (favoriteProducts.length === 0) {
    return (
      <PageContainer>
        <PageHeader eyebrow="Wishlist" title="Your favorites" />
        <div className="mt-8">
          <EmptyState
            icon="heart"
            title="No favorites yet"
            message="Tap the heart on any product to save it here, then come back to add it to your cart whenever you are ready."
            actionLabel="Browse products"
            actionTo="/"
          />
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        eyebrow="Wishlist"
        title="Your favorites"
        subtitle={favoriteProducts.length + (favoriteProducts.length === 1 ? ' item' : ' items') + ' saved for later'}
      />

      <ul className="mt-8 grid gap-5 lg:grid-cols-2">
        {favoriteProducts.map((product) => (
          <li key={product.id}>
            <FavoriteItem product={product} onAddToCart={onAddToCart} onRemove={onToggleFavorite} />
          </li>
        ))}
      </ul>
    </PageContainer>
  );
}

Favorites.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default Favorites;
