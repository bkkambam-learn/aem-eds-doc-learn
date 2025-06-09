/**
 * Creates a pills block with icons and labels
 * @param {Element} block The pills block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create pills container
  const pillsContainer = document.createElement('div');
  pillsContainer.className = 'pills-container';

  // Map of pill labels to their corresponding icons
  const iconMap = {
    favorites: 'like-icon.svg',
    history: 'history-icon.svg',
    following: 'person-tick-icon.svg',
    orders: 'orders-icon.svg',
  };

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const text = cell.textContent.trim();
      if (text) {
        const pill = document.createElement('div');
        pill.className = 'pill';

        const iconLabel = document.createElement('div');
        iconLabel.className = 'pill-content';

        // Determine icon based on text content
        const lowerText = text.toLowerCase();
        let iconSrc = '';

        Object.entries(iconMap).forEach(([key, icon]) => {
          if (lowerText.includes(key)) {
            iconSrc = `/images/${icon}`;
          }
        });

        // Create icon element
        if (iconSrc) {
          const iconEl = document.createElement('img');
          iconEl.src = iconSrc;
          iconEl.alt = text;
          iconEl.className = 'pill-icon';
          iconLabel.appendChild(iconEl);
        }

        // Create label element
        const labelEl = document.createElement('span');
        labelEl.className = 'pill-label';
        labelEl.textContent = text;
        iconLabel.appendChild(labelEl);

        pill.appendChild(iconLabel);

        // Add click handler for interaction
        pill.addEventListener('click', () => {
          pill.classList.toggle('active');
        });

        pillsContainer.appendChild(pill);
      }
    });
  });

  // Clear the block and add the new structure
  block.textContent = '';
  block.appendChild(pillsContainer);
}
