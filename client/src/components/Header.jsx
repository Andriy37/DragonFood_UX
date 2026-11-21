import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import ThemeToggle from './ThemeToggle';

export default function Header() {
  const { totalCount, totalPrice, setIsCartOpen } = useStore();
  const [badgePop, setBadgePop] = useState(false);

  useEffect(() => {
    if (totalCount > 0) {
      setBadgePop(true);
      const timer = setTimeout(() => setBadgePop(false), 400);
      return () => clearTimeout(timer);
    }
  }, [totalCount]);

  return (
    <header className="header">
      <div className="container header__inner">
        <Link to="/" className="brand">
          <span className="brand__logo-badge" aria-hidden="true">
            <svg width="34" height="34" viewBox="0 0 64 64" fill="none">
              <defs>
                <linearGradient id="dragonHeadGrad" x1="12" y1="10" x2="52" y2="56" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#34d399" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              {/* Гребінь на спині */}
              <path
                d="M46 27c3.5 0 5.5 2 5 4.5 2.5 1 3.5 3.5 2 5.5 1.8 1.5 1.8 4.2-.5 5.5l-4.5-2"
                fill="#10b981"
              />
              {/* Роги та гребінь на маківці */}
              <path
                d="M27 17c1.5-3.2 4.5-4.5 7-2.5 2-2.2 4.8-2 6 0.5 3.5-3.5 7.5-5.5 10.5-6.5-1 4.5-3.5 8.5-7.5 11"
                fill="url(#dragonHeadGrad)"
                stroke="#064e3b"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Основний силует голови та шиї */}
              <path
                d="M42 20c4.5 4.5 7 11 6.5 18.5-.5 8.5-6.5 15.5-15.5 17.5-3.2.7-6.5.2-8.5-1.2 4.2-2.2 6.8-6 7.2-10.5-4.5 1.2-9.5 1.2-14.5-.5-3.8-1.3-6.2-4.5-5.7-8.2.4-3.2 2.8-5.6 6.2-6.6 1.2-5.5 5.5-9.5 11.5-10.5 4.5-.8 9.2-.2 12.8 1.5z"
                fill="url(#dragonHeadGrad)"
                stroke="#064e3b"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Вушко з теплим акцентом */}
              <path
                d="M39 22.5c3.5-1.5 7-1.2 9 .5-1.8 2.5-5 3.5-8.2 2.8"
                fill="#f59e0b"
                stroke="#064e3b"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Спляче око та ніздря */}
              <path
                d="M24 28.5c1.5 2 4.5 2 6 0"
                stroke="#064e3b"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
              <circle cx="17.5" cy="31.5" r="1.6" fill="#064e3b" />
              {/* Лінія усмішки та вигин шиї */}
              <path
                d="M13 37.5c4.5 1.2 9.5.8 13.5-1.5"
                stroke="#064e3b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              <path
                d="M36 33.5c2.2 4.5 2 10.5-.8 15"
                stroke="#064e3b"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
              {/* Теплий рум'янець на щічці */}
              <ellipse cx="33.5" cy="32.5" rx="2.6" ry="1.4" fill="#f59e0b" />
            </svg>
          </span>
          <div className="brand__text">
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
          <ThemeToggle />

          <button
            type="button"
            data-cart-target="true"
            onClick={() => setIsCartOpen(true)}
            className={`cart-circle-btn ${badgePop ? 'cart-badge-animate' : ''}`}
            aria-label={`Кошик: ${totalCount} товарів`}
            title={totalCount > 0 ? `Кошик: ${totalCount} шт. (${totalPrice} ₴)` : 'Кошик порожній'}
          >
            <svg
              width="19"
              height="19"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.1"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {totalCount > 0 && (
              <span key={totalCount} className="cart-circle-btn__badge">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}

