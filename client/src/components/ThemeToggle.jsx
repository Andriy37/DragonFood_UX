import { useStore } from '../context/StoreContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useStore();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isLight}
      aria-label={isLight ? 'Увімкнути темну тему' : 'Увімкнути світлу тему'}
      title={isLight ? 'Темна тема' : 'Світла тема'}
      onClick={toggleTheme}
      className={`ios-theme-switch ${isLight ? 'ios-theme-switch--light' : ''}`}
    >
      <span className="ios-theme-switch__thumb">
        {isLight ? (
          <svg
            className="ios-theme-switch__icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
            <line x1="12" y1="2" x2="12" y2="4.5" />
            <line x1="12" y1="19.5" x2="12" y2="22" />
            <line x1="4.93" y1="4.93" x2="6.7" y2="6.7" />
            <line x1="17.3" y1="17.3" x2="19.07" y2="19.07" />
            <line x1="2" y1="12" x2="4.5" y2="12" />
            <line x1="19.5" y1="12" x2="22" y2="12" />
            <line x1="4.93" y1="19.07" x2="6.7" y2="17.3" />
            <line x1="17.3" y1="6.7" x2="19.07" y2="4.93" />
          </svg>
        ) : (
          <svg
            className="ios-theme-switch__icon"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M20.354 15.354A9 9 0 0 1 8.646 3.646 9.003 9.003 0 0 0 12 21a9.003 9.003 0 0 0 8.354-5.646Z" />
          </svg>
        )}
      </span>
    </button>
  );
}
