import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from './Icon';
import ProductImage from './ProductImage';
import Rating from './Rating';
import { formatPrice, getDiscountPercent } from '../utils/format';
import { productPropType } from '../utils/propTypes';

function FavoriteItem({ product, onAddToCart, onRemove }) {
  const imageRef = useRef(null);
  const [justAdded, setJustAdded] = useState(false);
  const isSoldOut = product.stock === 0;
  const discountPercent = getDiscountPercent(product);

  useEffect(() => {
    if (justAdded === false) {
      return undefined;
    }
    const timer = setTimeout(() => setJustAdded(false), 1400);
    return () => clearTimeout(timer);
  }, [justAdded]);

  const handleAdd = () => {
    const added = onAddToCart(product, 1, imageRef.current);
    if (added === true) {
      setJustAdded(true);
    }
  };

  const getAddButtonClass = () => {
    const base =
      'flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-bold text-white transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none ';
    if (justAdded === true) {
      return base + 'bg-zinc-700';
    }
    return base + 'bg-zinc-950 hover:bg-zinc-700';
  };

  const renderAddLabel = () => {
    if (justAdded === true) {
      return (
        <>
          <Icon name="check" className="h-4 w-4" />
          Added
        </>
      );
    }
    if (isSoldOut === true) {
      return 'Sold out';
    }
    return (
      <>
        <Icon name="cart" className="h-4 w-4" />
        Add to Cart
      </>
    );
  };

  const renderPrice = () => {
    if (product.oldPrice === null) {
      return <span className="text-xl font-extrabold text-zinc-950">{formatPrice(product.price)}</span>;
    }
    return (
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="text-xl font-extrabold text-zinc-950">{formatPrice(product.price)}</span>
        <span className="text-sm text-zinc-400 line-through">{formatPrice(product.oldPrice)}</span>
        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] font-bold text-white">
          -{discountPercent}%
        </span>
      </div>
    );
  };

  const renderStockNote = () => {
    if (isSoldOut === true) {
      return <p className="mt-2 text-xs font-bold text-zinc-700">Out of stock</p>;
    }
    if (product.stock <= 5) {
      return <p className="mt-2 text-xs font-bold text-zinc-700">Only {product.stock} left in stock</p>;
    }
    return null;
  };

  return (
    <article className="flex flex-col gap-5 rounded-3xl border border-zinc-200 bg-white p-4 sm:flex-row">
      <Link
        ref={imageRef}
        to={'/product/' + product.id}
        aria-label={'View details of ' + product.name}
        className="block aspect-4/5 w-full shrink-0 overflow-hidden rounded-2xl bg-zinc-100 sm:w-36"
      >
        <ProductImage src={product.image} alt={product.name} fit={product.imageFit} className="h-full w-full" />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col">
        <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">{product.category}</span>
        <Link to={'/product/' + product.id} className="text-lg font-bold text-zinc-950 transition hover:text-zinc-500">
          {product.name}
        </Link>
        <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-500">{product.description}</p>
        <Rating rating={product.rating} reviews={product.reviews} className="mt-3" />
        <div className="mt-3">{renderPrice()}</div>
        {renderStockNote()}

        <div className="mt-auto flex flex-wrap gap-3 pt-5">
          <button type="button" onClick={handleAdd} disabled={isSoldOut} className={getAddButtonClass()}>
            {renderAddLabel()}
          </button>
          <button
            type="button"
            onClick={() => onRemove(product.id)}
            aria-label={'Remove ' + product.name + ' from favorites'}
            className="flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-full border border-zinc-300 px-6 py-3 text-sm font-bold text-zinc-950 transition hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-700 active:scale-95 sm:flex-none"
          >
            <Icon name="trash" className="h-4 w-4" />
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

FavoriteItem.propTypes = {
  product: productPropType.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default FavoriteItem;
