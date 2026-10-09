import PropTypes from 'prop-types';
import Icon from './Icon';

const categorySymbols = {
  Apparel: 'shirt',
  Tech: 'chip',
  Lifestyle: 'leaf',
};

const collectionSymbols = {
  'New Arrival': 'sparkle',
  'Best Seller': 'trophy',
  'On Discount': 'percent',
};

function CatalogFilters({
  categories,
  collections,
  selectedCategory,
  selectedCollections,
  counts,
  onCategoryChange,
  onCollectionToggle,
  onReset,
}) {
  const filtersApplied = selectedCategory !== 'All' || selectedCollections.length > 0;

  const getFilterRowStyle = (isSelected) => {
    const base =
      'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-zinc-900 ';
    if (isSelected === true) {
      return base + 'bg-zinc-100 font-bold text-zinc-950';
    }
    return base + 'font-medium text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950';
  };

  const getCategoryCountStyle = (isSelected) => {
    if (isSelected === true) {
      return 'ml-auto rounded-md bg-zinc-800 px-1.5 py-0.5 text-[11px] font-bold text-white';
    }
    return 'ml-auto rounded-md bg-zinc-100 px-1.5 py-0.5 text-[11px] font-bold text-zinc-500';
  };

  const renderCategoryOption = (value, label, iconName) => {
    const isSelected = selectedCategory === value;
    return (
      <label key={value} className={getFilterRowStyle(isSelected)}>
        <input
          type="radio"
          name="category"
          value={value}
          checked={isSelected}
          onChange={() => onCategoryChange(value)}
          className="sr-only"
        />
        <Icon name={iconName} className="h-4 w-4 shrink-0" />
        <span>{label}</span>
        <span className={getCategoryCountStyle(isSelected)}>{counts[value]}</span>
      </label>
    );
  };

  const renderCollectionOption = (collection) => {
    const isSelected = selectedCollections.includes(collection);
    return (
      <label key={collection} className={getFilterRowStyle(isSelected)}>
        <input
          type="checkbox"
          name="collection"
          value={collection}
          checked={isSelected}
          onChange={() => onCollectionToggle(collection)}
          className="sr-only"
        />
        <Icon name={collectionSymbols[collection]} className="h-4 w-4 shrink-0" />
        <span>{collection}</span>
        <span
          aria-hidden="true"
          className={
            'ml-auto flex h-4 w-4 items-center justify-center rounded border transition ' +
            (isSelected === true ? 'border-zinc-950 bg-zinc-950 text-white' : 'border-zinc-300 bg-white text-transparent')
          }
        >
          <Icon name="check" className="h-3 w-3" />
        </span>
      </label>
    );
  };

  const renderClearFilters = () => {
    if (filtersApplied === false) {
      return null;
    }
    return (
      <button
        type="button"
        onClick={onReset}
        className="mt-4 cursor-pointer text-xs font-bold text-zinc-500 underline underline-offset-4 transition hover:text-zinc-950"
      >
        Clear all filters
      </button>
    );
  };

  return (
    <aside aria-label="Product filters" className="lg:sticky lg:top-28">
      <fieldset>
        <legend className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Category</legend>
        <div className="space-y-1">
          {renderCategoryOption('All', 'All Products', 'bag')}
          <div className="mt-1 space-y-1">
            {categories.map((category) => renderCategoryOption(category, category, categorySymbols[category]))}
          </div>
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">Collections</legend>
        <div className="space-y-1">{collections.map((collection) => renderCollectionOption(collection))}</div>
      </fieldset>

      {renderClearFilters()}
    </aside>
  );
}

CatalogFilters.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  collections: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  selectedCollections: PropTypes.arrayOf(PropTypes.string).isRequired,
  counts: PropTypes.objectOf(PropTypes.number).isRequired,
  onCategoryChange: PropTypes.func.isRequired,
  onCollectionToggle: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default CatalogFilters;
