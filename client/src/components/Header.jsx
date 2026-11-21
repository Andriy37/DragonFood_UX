import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ThemeToggle from './ThemeToggle';
import Button from './Button';

export default function Header() {
  const { totalCount, totalPrice, setIsCartOpen } = useStore();
  const [slowMo, setSlowMo] = useState(false);
  const [badgePop, setBadgePop] = useState(false);

  useEffect(() => {
    if (totalCount > 0) {
      setBadgePop(true);
      const timer = setTimeout(() => setBadgePop(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  const toggleSlowMo = () => {
    const next = !slowMo;
    setSlowMo(next);
    document.documentElement.setAttribute('data-motion', next ? 'slow' : 'normal');
  };

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          <span className="brand__icon">🐉</span>
          <div>
            Dragon<span>Food</span>
          </div>
        </Link>

        <nav className="nav" aria-label="Головна навігація">
          <NavLink to="/" end className="nav__link">
            Головна
          </NavLink>
          <NavLink to="/restaurants" className="nav__link">
            Заклади
          </NavLink>
          <NavLink to="/checkout" className="nav__link">
            Оформлення
          </NavLink>
        </nav>

        <div className="header__actions">
          <button
            type="button"
            onClick={toggleSlowMo}
            aria-pressed={slowMo}
            title="Уповільнити всі CSS-анімації у 4 рази для демонстрації"
            style={{
              padding: '8px 14px',
              borderRadius: '9999px',
              border: '1px solid var(--color-border, #334155)',
              background: slowMo ? 'var(--color-primary, #10b981)' : 'transparent',
              color: slowMo ? '#ffffff' : 'inherit',
              fontWeight: 600,
              fontSize: '13px',
              cursor: 'pointer',
              transition: 'all var(--dur-fast, 220ms) var(--ease-smooth, ease)'
            }}
          >
            {slowMo ? '🐢 Slow-Mo 0.25x' : '⚡ Motion 1x'}
          </button>

          <ThemeToggle />

          <div data-cart-target="true" className={badgePop ? 'cart-badge-animate' : ''}>
            <Button variant="primary" onClick={() => setIsCartOpen(true)}>
              🛍️ Кошик ({totalCount}){totalPrice > 0 ? ` • ${totalPrice} ₴` : ''}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

