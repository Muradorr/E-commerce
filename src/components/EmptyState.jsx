import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Icon from './Icon';

function EmptyState({ icon = 'bag', title, message, actionLabel = '', actionTo = '/', onAction = null }) {
  const renderAction = () => {
    if (onAction !== null) {
      return (
        <button
          type="button"
          onClick={onAction}
          className="mt-6 cursor-pointer rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-700 active:scale-95"
        >
          {actionLabel}
        </button>
      );
    }
    if (actionLabel !== '') {
      return (
        <Link
          to={actionTo}
          className="mt-6 inline-block rounded-full bg-zinc-950 px-6 py-3 text-sm font-bold text-white transition hover:bg-zinc-700 active:scale-95"
        >
          {actionLabel}
        </Link>
      );
    }
    return null;
  };

  return (
    <div className="flex flex-col items-center rounded-3xl bg-zinc-100 px-6 py-16 text-center">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-zinc-400 shadow-sm">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h2 className="mt-5 text-xl font-extrabold text-zinc-950">{title}</h2>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-zinc-500">{message}</p>
      {renderAction()}
    </div>
  );
}

EmptyState.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  actionLabel: PropTypes.string,
  actionTo: PropTypes.string,
  onAction: PropTypes.func,
};

export default EmptyState;
