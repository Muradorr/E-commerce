import PropTypes from 'prop-types';
import Icon from './Icon';

function Pagination({ currentPage, totalPages, onPageChange }) {
  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    const pages = [1];

    if (currentPage > 3) {
      pages.push('start-gap');
    }

    const first = Math.max(2, currentPage - 1);
    const last = Math.min(totalPages - 1, currentPage + 1);
    for (let page = first; page <= last; page += 1) {
      pages.push(page);
    }

    if (currentPage < totalPages - 2) {
      pages.push('end-gap');
    }

    pages.push(totalPages);
    return pages;
  };

  const getPageClass = (page) => {
    const base = 'flex h-9 min-w-9 cursor-pointer items-center justify-center rounded-lg px-2 text-sm font-bold transition ';
    if (page === currentPage) {
      return base + 'bg-zinc-950 text-white';
    }
    return base + 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950';
  };

  const navButtonClass =
    'flex cursor-pointer items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold text-zinc-950 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:text-zinc-300 disabled:hover:bg-transparent';

  const renderPages = () => {
    return getPageNumbers().map((page) => {
      if (typeof page === 'string') {
        return (
          <li key={page} aria-hidden="true" className="flex h-9 min-w-9 items-center justify-center text-zinc-400">
            ...
          </li>
        );
      }
      return (
        <li key={page}>
          <button
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={'Go to page ' + page}
            aria-current={page === currentPage ? 'page' : undefined}
            className={getPageClass(page)}
          >
            {page}
          </button>
        </li>
      );
    });
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav aria-label="Product pages" className="mt-10 flex items-center justify-between border-t border-zinc-200 pt-6">
      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={navButtonClass}
      >
        <Icon name="arrowLeft" className="h-4 w-4" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      <ul className="flex items-center gap-1">{renderPages()}</ul>

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={navButtonClass}
      >
        <span className="hidden sm:inline">Next</span>
        <Icon name="arrowRight" className="h-4 w-4" />
      </button>
    </nav>
  );
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
