/**
 * Creates a carousel block with circular items
 * @param {Element} block The carousel block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create carousel container
  const carousel = document.createElement('div');
  carousel.className = 'carousel-container';

  // Extract title and chevron from first row if present
  const firstRow = rows[0];
  if (firstRow && firstRow.children.length === 2) {
    const title = firstRow.children[0].textContent.trim();
    if (title) {
      const header = document.createElement('div');
      header.className = 'carousel-header';

      const titleEl = document.createElement('h2');
      titleEl.textContent = title;
      header.appendChild(titleEl);

      const chevron = document.createElement('div');
      chevron.className = 'carousel-chevron';
      chevron.innerHTML = '<img src="./images/chevron-right.svg" alt="View all">';
      header.appendChild(chevron);

      block.appendChild(header);
      rows.shift(); // Remove title row from carousel items
    }
  }

  // Create carousel items
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'carousel-items';

  rows.forEach((row) => {
    const item = document.createElement('div');
    item.className = 'carousel-item';

    const cells = [...row.children];
    cells.forEach((cell) => {
      const img = cell.querySelector('img');
      const text = cell.textContent.trim();

      if (img) {
        const imageDiv = document.createElement('div');
        imageDiv.className = 'carousel-item-image';
        imageDiv.appendChild(img);
        item.appendChild(imageDiv);
      } else if (text) {
        const textDiv = document.createElement('div');
        textDiv.className = 'carousel-item-text';
        textDiv.textContent = text;
        item.appendChild(textDiv);
      }
    });

    itemsContainer.appendChild(item);
  });

  carousel.appendChild(itemsContainer);

  // Clear the block and add the new structure
  block.textContent = '';
  block.appendChild(carousel);
}
