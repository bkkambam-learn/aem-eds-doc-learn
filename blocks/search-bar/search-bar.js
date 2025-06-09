/**
 * Creates a search bar block
 * @param {Element} block The search bar block element
 */
export default function decorate(block) {
  const rows = [...block.children];

  // Create search container
  const searchContainer = document.createElement('div');
  searchContainer.className = 'search-container';

  // Extract placeholder text if provided
  let placeholder = 'Search';
  if (rows.length > 0) {
    const firstRow = rows[0];
    const text = firstRow.textContent.trim();
    if (text) {
      placeholder = text;
    }
  }

  // Create search input wrapper
  const searchWrapper = document.createElement('div');
  searchWrapper.className = 'search-wrapper';

  // Create search icon
  const searchIcon = document.createElement('div');
  searchIcon.className = 'search-icon';
  searchIcon.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 19L15.5 15.5M15.5 15.5C17.433 13.567 17.433 10.433 15.5 8.5C13.567 6.567 10.433 6.567 8.5 8.5C6.567 10.433 6.567 13.567 8.5 15.5C10.433 17.433 13.567 17.433 15.5 15.5Z" stroke="#828282" stroke-width="2" stroke-linecap="round"/>
    </svg>
  `;

  // Create search input
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.className = 'search-input';
  searchInput.placeholder = placeholder;

  // Add event listeners
  searchInput.addEventListener('focus', () => {
    searchWrapper.classList.add('focused');
  });

  searchInput.addEventListener('blur', () => {
    searchWrapper.classList.remove('focused');
  });

  searchInput.addEventListener('input', (e) => {
    const { value } = e.target;
    if (value) {
      searchWrapper.classList.add('has-value');
    } else {
      searchWrapper.classList.remove('has-value');
    }
  });

  // Create search submit functionality
  const handleSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      // Dispatch custom search event
      const searchEvent = new CustomEvent('search', {
        detail: { query },
        bubbles: true,
      });
      block.dispatchEvent(searchEvent);
    }
  };

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });

  searchIcon.addEventListener('click', handleSearch);

  // Assemble the search bar
  searchWrapper.appendChild(searchIcon);
  searchWrapper.appendChild(searchInput);
  searchContainer.appendChild(searchWrapper);

  // Clear the block and add the new structure
  block.textContent = '';
  block.appendChild(searchContainer);
}
