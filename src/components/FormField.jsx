import PropTypes from 'prop-types';

function FormField({
  name,
  label,
  value,
  onChange,
  onBlur,
  onInvalid,
  error = '',
  hint = '',
  type = 'text',
  as = 'input',
  placeholder = '',
  autoComplete = 'off',
  inputMode = 'text',
  required = false,
  minLength = 0,
  maxLength = 200,
  rows = 3,
}) {
  const inputId = 'field-' + name;
  const errorId = inputId + '-error';
  const hasError = error !== '';

  const getInputClass = () => {
    const base =
      'w-full rounded-2xl border bg-white px-4 py-3 text-sm text-zinc-950 outline-hidden transition placeholder:text-zinc-400 focus:ring-2 ';
    if (hasError === true) {
      return base + 'border-red-500 focus:ring-red-500';
    }
    return base + 'border-zinc-200 focus:border-zinc-950 focus:ring-zinc-950';
  };

  const renderHint = () => {
    if (hint === '' || hasError === true) {
      return null;
    }
    return <p className="mt-1.5 text-xs text-zinc-400">{hint}</p>;
  };

  const renderError = () => {
    if (hasError === false) {
      return null;
    }
    return (
      <p id={errorId} role="alert" className="mt-1.5 text-xs font-semibold text-red-600">
        {error}
      </p>
    );
  };

  const sharedProps = {
    id: inputId,
    name,
    value,
    onChange,
    onBlur,
    onInvalid,
    placeholder,
    autoComplete,
    required,
    minLength,
    maxLength,
    className: getInputClass(),
    'aria-invalid': hasError,
    'aria-describedby': hasError === true ? errorId : undefined,
  };

  const renderControl = () => {
    if (as === 'textarea') {
      return <textarea {...sharedProps} rows={rows} />;
    }
    return <input {...sharedProps} type={type} inputMode={inputMode} />;
  };

  return (
    <div>
      <label htmlFor={inputId} className="mb-2 block text-sm font-bold text-zinc-950">
        {label}
        {required === true ? <span className="ml-0.5 text-red-500">*</span> : null}
      </label>
      {renderControl()}
      {renderHint()}
      {renderError()}
    </div>
  );
}

FormField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  onInvalid: PropTypes.func.isRequired,
  error: PropTypes.string,
  hint: PropTypes.string,
  type: PropTypes.string,
  as: PropTypes.oneOf(['input', 'textarea']),
  placeholder: PropTypes.string,
  autoComplete: PropTypes.string,
  inputMode: PropTypes.string,
  required: PropTypes.bool,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  rows: PropTypes.number,
};

export default FormField;
