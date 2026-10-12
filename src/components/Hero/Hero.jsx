/** Full-width banner image at the top of the home page. */
export default function Hero({ src, alt = '', width, height }) {
  if (!src) return null;
  return (
    <div className="hero">
      <img src={src} alt={alt} width={width} height={height} fetchpriority="high" />
    </div>
  );
}
