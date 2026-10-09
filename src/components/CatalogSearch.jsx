import PropTypes from 'prop-types';
import Icon from './Icon';

function CatalogSearch({ value, onChange, onSubmit, placeholder = 'Search Ridleys' }) {
  const submitCatalogSearch = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <form
      onSubmit={submitCatalogSearch}
      role="search"
      className="flex w-full items-center gap-2 rounded-full bg-zinc-100 py-1.5 pl-4 pr-1.5 transition focus-within:ring-2 focus-within:ring-zinc-900 sm:max-w-sm"
    >
      <Icon name="search" className="h-4 w-4 shrink-0 text-zinc-400" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search products by name, description or category"
        className="min-w-0 flex-1 bg-transparent text-sm outline-hidden placeholder:text-zinc-400"
      />
      <button
        type="submit"
        className="cursor-pointer rounded-full bg-zinc-950 px-5 py-2 text-xs font-bold text-white transition hover:bg-zinc-700 active:scale-95"
      >
        Search
      </button>
    </form>
  );
}

CatalogSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

export default CatalogSearch;
