export function triggerFlyToCart(sourceEl, imageUrl = null) {
  if (!sourceEl) return;

  const cartTarget = document.querySelector('[data-cart-target="true"]');
  if (!cartTarget) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  const startRect = sourceEl.getBoundingClientRect();
  const endRect = cartTarget.getBoundingClientRect();

  const ghost = document.createElement('div');
  ghost.className = 'fly-to-cart-ghost';

  const size = 46;
  const startX = startRect.left + startRect.width / 2 - size / 2;
  const startY = startRect.top + startRect.height / 2 - size / 2;
  const endX = endRect.left + endRect.width / 2 - size / 2;
  const endY = endRect.top + endRect.height / 2 - size / 2;

  ghost.style.width = `${size}px`;
  ghost.style.height = `${size}px`;
  ghost.style.left = `${startX}px`;
  ghost.style.top = `${startY}px`;

  if (imageUrl) {
    const img = document.createElement('img');
    img.src = imageUrl;
    img.alt = '';
    ghost.appendChild(img);
  } else {
    ghost.textContent = '🍔';
  }

  document.body.appendChild(ghost);

  const deltaX = endX - startX;
  const deltaY = endY - startY;
  const arcPeakY = Math.min(deltaY, 0) - 90;

  const motionScale =
    parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--motion-scale')) || 1;
  const duration = 650;

  const animation = ghost.animate(
    [
      {
        transform: 'translate3d(0, 0, 0) scale(1) rotate(0deg)',
        opacity: 1,
      },
      {
        transform: `translate3d(${deltaX * 0.5}px, ${arcPeakY}px, 0) scale(0.85) rotate(160deg)`,
        opacity: 0.95,
        offset: 0.48,
      },
      {
        transform: `translate3d(${deltaX}px, ${deltaY}px, 0) scale(0.25) rotate(320deg)`,
        opacity: 0.2,
      },
    ],
    {
      duration,
      easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
      fill: 'forwards',
    }
  );

  animation.onfinish = () => {
    ghost.remove();
  };
}

