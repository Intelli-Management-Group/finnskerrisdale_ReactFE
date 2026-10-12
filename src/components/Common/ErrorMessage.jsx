export default function ErrorMessage({ error, retry }) {
  return (
    <div className="error-box" role="alert">
      <p>Sorry, this content could not be loaded{error?.message ? `: ${error.message}` : '.'}</p>
      {retry && <button type="button" className="btn" onClick={retry}>Try again</button>}
    </div>
  );
}
