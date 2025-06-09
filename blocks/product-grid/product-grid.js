/**
 * Creates a product grid block with cards
 * @param {Element} block The product grid block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create product grid container
  const productGrid = document.createElement('div');
  productGrid.className = 'product-grid-container';

  // Extract title and chevron from first row if present
  const firstRow = rows[0];
  if (firstRow && firstRow.children.length === 2) {
    const title = firstRow.children[0].textContent.trim();
    if (title) {
      const header = document.createElement('div');
      header.className = 'product-grid-header';

      const titleEl = document.createElement('h2');
      titleEl.textContent = title;
      header.appendChild(titleEl);

      const chevron = document.createElement('div');
      chevron.className = 'product-grid-chevron';
      chevron.innerHTML = '<img src="./images/chevron-right.svg" alt="View all">';
      header.appendChild(chevron);

      block.appendChild(header);
      rows.shift(); // Remove title row from product items
    }
  }

  // Create product items
  const itemsContainer = document.createElement('div');
  itemsContainer.className = 'product-grid-items';

  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const cells = [...row.children];
    let imageEl = null;
    let brand = '';
    let productName = '';
    let price = '';

    cells.forEach((cell) => {
      const img = cell.querySelector('img');
      const text = cell.textContent.trim();

      if (img) {
        imageEl = img;
      } else if (text) {
        // Parse cell content to determine if it's brand, product name, or price
        if (text.startsWith('$')) {
          price = text;
        } else if (!brand) {
          brand = text;
        } else if (!productName) {
          productName = text;
        }
      }
    });

    // Create card structure
    if (imageEl) {
      const imageDiv = document.createElement('div');
      imageDiv.className = 'product-card-image';
      imageDiv.appendChild(imageEl);
      card.appendChild(imageDiv);
    }

    const infoDiv = document.createElement('div');
    infoDiv.className = 'product-card-info';

    if (brand) {
      const brandDiv = document.createElement('div');
      brandDiv.className = 'product-card-brand';
      brandDiv.textContent = brand;
      infoDiv.appendChild(brandDiv);
    }

    if (productName) {
      const nameDiv = document.createElement('div');
      nameDiv.className = 'product-card-name';
      nameDiv.textContent = productName;
      infoDiv.appendChild(nameDiv);
    }

    if (price) {
      const priceDiv = document.createElement('div');
      priceDiv.className = 'product-card-price';
      priceDiv.textContent = price;
      infoDiv.appendChild(priceDiv);
    }

    card.appendChild(infoDiv);
    itemsContainer.appendChild(card);
  });

  productGrid.appendChild(itemsContainer);

  // Clear the block and add the new structure
  block.textContent = '';
  block.appendChild(productGrid);
}
