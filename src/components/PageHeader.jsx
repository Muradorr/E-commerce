import PropTypes from 'prop-types';

function PageHeader({ eyebrow = '', title, subtitle = '' }) {
  const renderEyebrow = () => {
    if (eyebrow === '') {
      return null;
    }
    return <p className="mb-2 text-xs font-bold uppercase tracking-widest text-zinc-400">{eyebrow}</p>;
  };

  const renderSubtitle = () => {
    if (subtitle === '') {
      return null;
    }
    return <p className="mt-2 text-sm text-zinc-500">{subtitle}</p>;
  };

  return (
    <div>
      {renderEyebrow()}
      <h1 className="font-editorial text-5xl tracking-tight text-zinc-950 md:text-6xl">{title}</h1>
      {renderSubtitle()}
    </div>
  );
}

PageHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};

export default PageHeader;
