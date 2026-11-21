import { Link } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import RestaurantCard from '../components/RestaurantCard';
import DragonDreamScene from '../components/DragonDreamScene';
import Button from '../components/Button';

const CATEGORIES = [
  { id: 'all', label: '🍽️ Усі заклади' },
  { id: 'burgers', label: '🍔 Бургери' },
  { id: 'pizza', label: '🍕 Піца' },
  { id: 'sushi', label: '🍣 Суші та роли' },
  { id: 'asian', label: '🍜 Азійська кухня' },
  { id: 'desserts', label: '🍰 Десерти' },
];

const EMBERS = [
  { x: '8%', size: '5px', dur: '4.2s', delay: '0s', drift: '18px' },
  { x: '16%', size: '7px', dur: '5.1s', delay: '0.8s', drift: '-22px' },
  { x: '25%', size: '4px', dur: '3.8s', delay: '1.5s', drift: '14px' },
  { x: '34%', size: '6px', dur: '4.7s', delay: '0.4s', drift: '-16px' },
  { x: '43%', size: '5px', dur: '5.4s', delay: '2.1s', drift: '26px' },
  { x: '52%', size: '8px', dur: '4.5s', delay: '1.1s', drift: '-28px' },
  { x: '60%', size: '4px', dur: '3.9s', delay: '2.6s', drift: '15px' },
  { x: '68%', size: '6px', dur: '4.8s', delay: '0.6s', drift: '-19px' },
  { x: '75%', size: '7px', dur: '5.2s', delay: '1.8s', drift: '22px' },
  { x: '82%', size: '5px', dur: '4.1s', delay: '0.3s', drift: '-24px' },
  { x: '89%', size: '6px', dur: '4.9s', delay: '1.4s', drift: '16px' },
  { x: '94%', size: '4px', dur: '3.7s', delay: '2.3s', drift: '-12px' },
];

export default function HomePage() {
  const { data, loading } = useFetch('/data.json');

  return (
    <div className="container">
      <section className="hero">
        <div className="hero__embers" aria-hidden="true">
          {EMBERS.map((e, idx) => (
            <span
              key={idx}
              className="ember"
              style={{
                '--x': e.x,
                '--size': e.size,
                '--dur': e.dur,
                '--delay': e.delay,
                '--drift': e.drift,
              }}
            />
          ))}
        </div>

        <div className="hero__grid">
          <div>
            <span className="badge">⚡ Доставка за 25–35 хв</span>
            <h1>Улюблена їжа з топ-закладів міста прямо до дверей</h1>
            <p>
              Обирай серед найкращих ресторанів: соковиті смеш-бургери, піца на дровах, свіжі роли та десерти. Зручне замовлення без зайвих кліків.
            </p>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link to="/restaurants">
                <Button variant="primary">Переглянути заклади →</Button>
              </Link>
              <Link to="/restaurants?category=sushi">
                <Button variant="secondary">Замовити суші</Button>
              </Link>
            </div>
          </div>

          <DragonDreamScene />
        </div>
      </section>

      <section style={{ marginBottom: '36px' }}>
        <h2 style={{ marginBottom: '14px' }}>Категорії кухні</h2>
        <div className="pills-row">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              to={cat.id === 'all' ? '/restaurants' : `/restaurants?category=${cat.id}`}
              className="pill-chip"
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </section>

      <section>
        <h2 style={{ marginBottom: '18px' }}>Популярні заклади сьогодні</h2>
        {loading ? (
          <div className="cards-grid">
            {[1, 2, 3].map((n) => (
              <div key={n} className="skeleton-box" style={{ height: '270px' }} />
            ))}
          </div>
        ) : (
          <div className="cards-grid">
            {data?.restaurants?.slice(0, 3).map((r) => (
              <RestaurantCard key={r.id} restaurant={r} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}