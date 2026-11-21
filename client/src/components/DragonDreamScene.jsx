import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const DREAM_DISHES = [
  { id: 1, icon: '🍔', label: 'Бургери', category: 'burgers' },
  { id: 2, icon: '🍕', label: 'Піца', category: 'pizza' },
  { id: 3, icon: '🍣', label: 'Суші', category: 'sushi' },
  { id: 4, icon: '🍜', label: 'Рамен', category: 'asian' },
  { id: 5, icon: '🍰', label: 'Десерти', category: 'desserts' },
];

function TransparentDragon() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const img = new Image();
    img.src = '/sleeping-dragon.jpg?v=2';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;

      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        if (r > 232 && g > 232 && b > 232) {
          data[i + 3] = 0;
        } else if (r > 205 && g > 205 && b > 205) {
          const avg = (r + g + b) / 3;
          data[i + 3] = Math.max(0, Math.round((255 - avg) * 5.5));
        }
      }

      ctx.putImageData(imageData, 0, 0);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="dragon-body"
      aria-label="Сплячий 3D дракон Dragon Food"
      style={{
        width: '330px',
        height: '330px',
        objectFit: 'contain',
        display: 'block',
      }}
    />
  );
}

export default function DragonDreamScene() {
  const navigate = useNavigate();

  return (
    <div className="dragon-dream-stage" aria-label="Сплячий дракон мріє про 5 страв">
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

      <div className="sleeping-dragon">
        <div className="dragon-zzz">
          <span>Z</span>
          <span>z</span>
          <span>z</span>
        </div>
        <TransparentDragon />
        <div className="dragon-shadow" />
      </div>
    </div>
  );
}


