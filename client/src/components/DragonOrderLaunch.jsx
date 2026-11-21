export default function DragonOrderLaunch({ active }) {
  if (!active) return null;

  return (
    <div className="dragon-launch-overlay" aria-hidden="true">
      <div className="dragon-lightning-flash" />
      <div className="dragon-flyer">
        <span className="dragon-flyer__trail">⚡🔥</span>
        <span>🐉</span>
      </div>
    </div>
  );
}
