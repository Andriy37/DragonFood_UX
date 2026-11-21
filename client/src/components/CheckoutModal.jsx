import { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';
import CheckoutForm from './CheckoutForm';
import Button from './Button';

export default function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen } = useStore();
  const [isTeleporting, setIsTeleporting] = useState(false);
  const [showCornerFlash, setShowCornerFlash] = useState(false);

  useEffect(() => {
    const onEsc = (e) => {
      if (e.key === 'Escape' && !isTeleporting) setIsCheckoutOpen(false);
    };
    if (isCheckoutOpen) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [isCheckoutOpen, isTeleporting, setIsCheckoutOpen]);

  const handleTeleportClose = () => {
    if (isTeleporting) return;
    setIsTeleporting(true);

    setTimeout(() => {
      setShowCornerFlash(true);
    }, 480);

    setTimeout(() => {
      setIsTeleporting(false);
      setIsCheckoutOpen(false);
    }, 660);

    setTimeout(() => {
      setShowCornerFlash(false);
    }, 1050);
  };

  if (!isCheckoutOpen && !showCornerFlash) return null;

  return (
    <>
      {showCornerFlash && <div className="teleport-corner-flash" aria-hidden="true" />}

      {isCheckoutOpen && (
        <div
          className={`backdrop backdrop--center ${isTeleporting ? 'modal-backdrop-exit' : ''}`}
          onClick={() => !isTeleporting && setIsCheckoutOpen(false)}
        >
          <div
            className={`modal-card ${isTeleporting ? 'modal-teleport-exit' : ''}`}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-checkout-title"
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h2 id="modal-checkout-title">Оформлення доставки</h2>
              <Button variant="ghost" onClick={() => !isTeleporting && setIsCheckoutOpen(false)}>✕</Button>
            </div>
            <CheckoutForm onSuccess={handleTeleportClose} />
          </div>
        </div>
      )}
    </>
  );
}
