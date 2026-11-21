import { useState } from 'react';
import { useStore } from '../context/StoreContext';
import CheckoutForm from '../components/CheckoutForm';
import DragonOrderLaunch from '../components/DragonOrderLaunch';

export default function CheckoutPage() {
  const { cart, totalPrice } = useStore();
  const [launchPhase, setLaunchPhase] = useState('idle'); // 'idle' | 'flying' | 'done'

  const handleLaunch = () => {
    setLaunchPhase('flying');
    const motionScale =
      parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--motion-scale')) || 1;
    setTimeout(() => {
      setLaunchPhase('done');
    }, 950);
  };

  return (
    <div className="container" style={{ paddingTop: '32px', maxWidth: '640px' }}>
      <DragonOrderLaunch active={launchPhase === 'flying'} />

      <h1 style={{ marginBottom: '20px' }}>Оформлення замовлення</h1>

      {cart.length > 0 && launchPhase === 'idle' && (
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            marginBottom: '20px',
          }}
        >
          <h3 style={{ marginBottom: '10px' }}>Обрані позиції:</h3>
          {cart.map((item) => (
            <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span>{item.name} × {item.quantity}</span>
              <strong>{item.price * item.quantity} ₴</strong>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '10px', paddingTop: '10px', fontWeight: 800 }}>
            Разом до сплати: {totalPrice} ₴
          </div>
        </div>
      )}

      <div
        className={launchPhase === 'flying' ? 'checkout-card-fly-up' : launchPhase === 'done' ? 'modal-content' : ''}
        style={{
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '24px',
        }}
      >
        <CheckoutForm onLaunch={handleLaunch} />
      </div>
    </div>
  );
}
