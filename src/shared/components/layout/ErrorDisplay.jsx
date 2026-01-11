import PropTypes from 'prop-types'

export default function ErrorDisplay ({error, onClear}) {
  if (!error) return null

  return (
    <div className="error-display" role="alert" aria-live="polite">
      <div className="error-content">
        <p className="error-message">{error.message}</p>
        {error.suggestion && (
          <p className="error-suggestion">{error.suggestion}</p>
        )}
      </div>
      {onClear && (
        <button
          type="button"
          onClick={onClear}
          className="error-close"
          aria-label="Cerrar mensaje de error"
        >
          ✕
        </button>
      )}
    </div>
  )
}

ErrorDisplay.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string.isRequired,
    suggestion: PropTypes.string,
    code: PropTypes.string,
  }),
  onClear: PropTypes.func,
}
