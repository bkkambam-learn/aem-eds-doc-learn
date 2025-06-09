/**
 * Creates a banner block with pagination
 * @param {Element} block The banner block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create banner container
  const banner = document.createElement('div');
  banner.className = 'banner-container';

  let backgroundImage = '';
  let title = '';
  let paginationCount = 5; // Default pagination count

  rows.forEach((row) => {
    const cells = [...row.children];
    cells.forEach((cell) => {
      const img = cell.querySelector('img');
      const text = cell.textContent.trim();

      if (img) {
        backgroundImage = img.src;
      } else if (text && !title) {
        title = text;
      } else if (text && text.includes('pagination')) {
        // Parse pagination count if specified
        const match = text.match(/(\d+)/);
        if (match) {
          paginationCount = parseInt(match[1], 10);
        }
      }
    });
  });

  // Set background image if available
  if (backgroundImage) {
    banner.style.backgroundImage = `url(${backgroundImage})`;
  }

  // Create title element
  if (title) {
    const titleEl = document.createElement('h2');
    titleEl.className = 'banner-title';
    titleEl.textContent = title;
    banner.appendChild(titleEl);
  }

  // Create pagination dots
  const pagination = document.createElement('div');
  pagination.className = 'banner-pagination';

  Array.from({ length: paginationCount }, (_, i) => {
    const dot = document.createElement('div');
    dot.className = `banner-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => {
      // Remove active class from all dots
      pagination.querySelectorAll('.banner-dot').forEach((d) => d.classList.remove('active'));
      // Add active class to clicked dot
      dot.classList.add('active');
    });
    pagination.appendChild(dot);
    return dot;
  });

  banner.appendChild(pagination);

  // Clear the block and add the new structure
  block.textContent = '';
  block.appendChild(banner);
}
