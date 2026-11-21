
import { useNavigate } from 'react-router-dom';

const DREAM_DISHES = [
  { id: 1, icon: '🍔', label: 'Бургери', category: 'burgers' },
  { id: 2, icon: '🍕', label: 'Піца', category: 'pizza' },
  { id: 3, icon: '🍣', label: 'Суші', category: 'sushi' },
  { id: 4, icon: '🍜', label: 'Рамен', category: 'asian' },
  { id: 5, icon: '🍰', label: 'Десерти', category: 'desserts' }
];

export default function DragonDreamScene() {
  const navigate = useNavigate();

  return (
    <div className="dragon-dream-stage" aria-label="Сплячий дракон мріє про 5 страв">
      {/* Хмаринка думок із 3D-каруселлю страв */}
      <div className="thought-cloud">
        <div className="orbit-3d-scene">
          <div className="orbit-3d-ring">
            {DREAM_DISHES.map((dish, idx) => (
              <button
                key={dish.id}
                type="button"
                className="orbit-3d-item"
                style={{ '--i': idx }}
                onClick={() => navigate(`/restaurants?category=${dish.category}`)}
                title={`Перейти до категорії: ${dish.label}`}
              >
                <span className="orbit-3d-emoji">{dish.icon}</span>
                <span className="orbit-3d-label">{dish.label}</span>
              </button>
            ))}
          </div>
        </div>
        <span className="thought-dot thought-dot--1" />
        <span className="thought-dot thought-dot--2" />
      </div>

      {/* Сплячий дракончик із диханням та Zzz */}
      <div className="sleeping-dragon">
        <div className="dragon-zzz">
          <span>Z</span>
          <span>z</span>
          <span>z</span>
        </div>
        <div className="dragon-body">🐉</div>
        <div className="dragon-shadow" />
      </div>
    </div>
  );
}
