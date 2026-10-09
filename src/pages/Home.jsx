import { useRef } from 'react';
import PropTypes from 'prop-types';
import Hero from '../components/Hero';
import CatalogSearch from '../components/CatalogSearch';
import CatalogFilters from '../components/CatalogFilters';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import RecommendationSlider from '../components/RecommendationSlider';
import NewsletterBanner from '../components/NewsletterBanner';
import EmptyState from '../components/EmptyState';
import { categories, collections, catalogFilterDefaults, catalogHeroImage } from '../data/products';
import { filtersPropType, productPropType } from '../utils/propTypes';

const CATALOG_PAGE_SIZE = 6;

function Home({ products, favorites, filters, setFilters, onToggleFavorite, onAddToCart, onBuyNow }) {
  const catalogResultsRef = useRef(null);

  const belongsToCollection = (product, collection) => {
    if (collection === 'New Arrival') {
      return product.isNew === true;
    }
    if (collection === 'Best Seller') {
      return product.isBestSeller === true;
    }
    if (collection === 'On Discount') {
      return product.oldPrice !== null;
    }
    return false;
  };

  const selectMatchingProducts = () => {
    const keyword = filters.search.trim().toLowerCase();

    return products.filter((product) => {
      if (filters.category !== 'All' && product.category !== filters.category) {
        return false;
      }

      if (filters.collections.length > 0) {
        const matchesAny = filters.collections.some((collection) => belongsToCollection(product, collection));
        if (matchesAny === false) {
          return false;
        }
      }

      if (keyword !== '') {
        const searchable = (product.name + ' ' + product.description + ' ' + product.category).toLowerCase();
        if (searchable.includes(keyword) === false) {
          return false;
        }
      }

      return true;
    });
  };

  const countProductsByCategory = () => {
    const counts = { All: products.length };
    categories.forEach((category) => {
      counts[category] = products.filter((product) => product.category === category).length;
    });
    return counts;
  };

  const matchingProducts = selectMatchingProducts();
  const totalPages = Math.max(1, Math.ceil(matchingProducts.length / CATALOG_PAGE_SIZE));
  const currentPage = Math.min(filters.page, totalPages);
  const startIndex = (currentPage - 1) * CATALOG_PAGE_SIZE;
  const pageProducts = matchingProducts.slice(startIndex, startIndex + CATALOG_PAGE_SIZE);
  const featuredProducts = [...products].sort((a, b) => b.rating - a.rating || b.reviews - a.reviews).slice(0, 8);

  const focusCatalogResults = () => {
    if (catalogResultsRef.current !== null) {
      catalogResultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const updateSearchQuery = (value) => {
    setFilters({ ...filters, search: value, page: 1 });
  };

  const selectCategory = (category) => {
    setFilters({ ...filters, category, page: 1 });
  };

  const toggleCollectionFilter = (collection) => {
    if (filters.collections.includes(collection)) {
      const remaining = filters.collections.filter((item) => item !== collection);
      setFilters({ ...filters, collections: remaining, page: 1 });
    } else {
      setFilters({ ...filters, collections: [...filters.collections, collection], page: 1 });
    }
  };

  const selectCatalogPage = (page) => {
    setFilters({ ...filters, page });
    focusCatalogResults();
  };

  const resetCatalogFilters = () => {
    setFilters(catalogFilterDefaults);
  };

  const describeCatalogResults = () => {
    if (matchingProducts.length === 0) {
      return 'No products found';
    }
    if (matchingProducts.length === 1) {
      return 'Showing 1 product';
    }
    const endIndex = Math.min(startIndex + CATALOG_PAGE_SIZE, matchingProducts.length);
    return 'Showing ' + (startIndex + 1) + '-' + endIndex + ' of ' + matchingProducts.length + ' products';
  };

  const renderCatalogProducts = () => {
    if (matchingProducts.length === 0) {
      return (
        <EmptyState
          icon="search"
          title="No products match your search"
          message="Try a different keyword or clear the filters to see everything we have."
          actionLabel="Clear filters"
          onAction={resetCatalogFilters}
        />
      );
    }

    return (
      <>
        <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
          {pageProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isFavorite={favorites.includes(product.id)}
              onToggleFavorite={onToggleFavorite}
              onAddToCart={onAddToCart}
              onBuyNow={onBuyNow}
            />
          ))}
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={selectCatalogPage} />
      </>
    );
  };

  return (
    <>
      <Hero title="Shop" image={catalogHeroImage} />

      <section aria-label="Shop by category" className="mx-auto mt-12 grid max-w-6xl gap-4 px-4 sm:grid-cols-3 sm:px-6">
        {[
          { name: 'Apparel', caption: 'Wear it your way.', image: '/images/products/Polo Look.jpg' },
          { name: 'Tech', caption: 'Make the everyday smarter.', image: '/images/products/Wooting 60HE.jpg' },
          { name: 'Lifestyle', caption: 'A little more balance.', image: '/images/products/clean gym girl.jpg' },
        ].map((category) => (
          <button key={category.name} type="button" onClick={() => { selectCategory(category.name); focusCatalogResults(); }} className="group relative flex min-h-40 cursor-pointer items-center overflow-hidden rounded-xl bg-zinc-100 p-6 text-left">
            <div className="relative z-10 w-3/5"><p className="text-[9px] font-bold uppercase tracking-[0.18em] text-zinc-500">Explore {category.name}</p><h2 className="mt-3 max-w-36 font-editorial text-2xl leading-tight text-zinc-950">{category.caption}</h2><span className="mt-4 block text-lg" aria-hidden="true">↗</span></div>
            <img src={category.image} alt="" loading="lazy" className="absolute right-0 top-0 h-full w-2/5 object-cover mix-blend-multiply transition duration-500 group-hover:scale-105" />
          </button>
        ))}
      </section>

      <div className="relative z-10 mx-auto mt-16 max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 border-b border-zinc-200 pb-7 sm:flex-row sm:items-end sm:justify-between">
          <div><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Find your next favorite</p><h2 className="font-editorial text-4xl tracking-tight text-zinc-950 md:text-5xl">The everyday selections.</h2></div>
          <CatalogSearch value={filters.search} onChange={updateSearchQuery} onSubmit={focusCatalogResults} />
        </div>
      </div>

      <div
        id="catalog"
        ref={catalogResultsRef}
        className="mx-auto flex max-w-6xl scroll-mt-28 flex-col gap-8 px-4 pt-8 sm:px-6 lg:flex-row lg:gap-10"
      >
        <div className="lg:w-56 lg:shrink-0">
          <CatalogFilters
            categories={categories}
            collections={collections}
            selectedCategory={filters.category}
            selectedCollections={filters.collections}
            counts={countProductsByCategory()}
            onCategoryChange={selectCategory}
            onCollectionToggle={toggleCollectionFilter}
            onReset={resetCatalogFilters}
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="mb-5 text-sm font-semibold text-zinc-500" aria-live="polite">
            {describeCatalogResults()}
          </p>
          {renderCatalogProducts()}
        </div>
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <RecommendationSlider
          title="Chosen for your everyday"
          products={featuredProducts}
          favorites={favorites}
          onToggleFavorite={onToggleFavorite}
          onAddToCart={onAddToCart}
          onBuyNow={onBuyNow}
        />
      </div>

      <div className="mx-auto mt-24 max-w-6xl px-4 sm:px-6">
        <NewsletterBanner />
      </div>
    </>
  );
}

Home.propTypes = {
  products: PropTypes.arrayOf(productPropType).isRequired,
  favorites: PropTypes.arrayOf(PropTypes.number).isRequired,
  filters: filtersPropType.isRequired,
  setFilters: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onBuyNow: PropTypes.func.isRequired,
};

export default Home;
