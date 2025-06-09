# EDS Blocks Documentation

This document describes the custom EDS blocks created from the Figma e-commerce design.

## Blocks Overview

### 1. Carousel Block (`/blocks/carousel/`)
Displays circular category items in a horizontal scrollable carousel.

**Structure:**
```html
<div class="carousel">
  <div>
    <div>Categories</div>
    <div>→</div>
  </div>
  <div>
    <div><picture><img src="image.jpg" alt="Category"></picture></div>
    <div>Category Name</div>
  </div>
  <!-- More items... -->
</div>
```

**Features:**
- Horizontal scrolling
- Circular image containers
- Header with title and chevron
- Responsive design

### 2. Product Grid Block (`/blocks/product-grid/`)
Displays product cards with images, brand, name, and price.

**Structure:**
```html
<div class="product-grid">
  <div>
    <div>Products Title</div>
    <div>→</div>
  </div>
  <div>
    <div><picture><img src="product.jpg" alt="Product"></picture></div>
    <div>Brand Name</div>
    <div>Product Name</div>
    <div>$19.99</div>
  </div>
  <!-- More products... -->
</div>
```

**Features:**
- Horizontal scrolling product cards
- Brand, name, and price display
- Hover effects
- Header with title and chevron

### 3. Banner Block (`/blocks/banner/`)
Promotional banner with background image and pagination dots.

**Structure:**
```html
<div class="banner">
  <div>
    <div><picture><img src="banner-bg.jpg" alt="Banner"></picture></div>
    <div>Banner Title</div>
    <div>pagination: 5</div>
  </div>
</div>
```

**Features:**
- Background image support
- Interactive pagination dots
- Title overlay
- Click handlers for pagination

### 4. Pills Block (`/blocks/pills/`)
Filter buttons with icons and labels.

**Structure:**
```html
<div class="pills">
  <div>Favorites</div>
  <div>History</div>
  <div>Following</div>
  <div>Orders</div>
</div>
```

**Features:**
- Auto-icon mapping based on text
- Click states and visual feedback
- Horizontal scrolling on mobile
- Icons: like, history, person-tick, orders

### 5. Search Bar Block (`/blocks/search-bar/`)
Search input with icon and placeholder.

**Structure:**
```html
<div class="search-bar">
  <div>Search placeholder text</div>
</div>
```

**Features:**
- Search icon with SVG
- Focus states and styling
- Custom search events
- Enter key and click handlers

## Usage Examples

### Basic Usage in HTML
```html
<!-- Carousel -->
<div class="carousel">
  <div><div>Categories</div><div>→</div></div>
  <div><div><img src="cat1.jpg"></div><div>Electronics</div></div>
</div>

<!-- Product Grid -->
<div class="product-grid">
  <div><div>Products</div><div>→</div></div>
  <div><div><img src="prod1.jpg"></div><div>Nike</div><div>Shoes</div><div>$99</div></div>
</div>
```

### Programmatic Usage
```javascript
import { buildBlock, decorateBlock, loadBlock } from './scripts/aem.js';

// Create carousel
const carouselData = [
  ['Categories'],
  ['/images/cat1.jpg', 'Electronics'],
  ['/images/cat2.jpg', 'Fashion']
];
const carouselBlock = buildBlock('carousel', carouselData);
decorateBlock(carouselBlock);
await loadBlock(carouselBlock);
```

## Responsive Design

All blocks are responsive and adapt to:
- **Mobile** (< 768px): Horizontal scrolling, smaller images
- **Tablet** (768px - 1024px): Optimized layouts
- **Desktop** (> 1024px): Full-width layouts with max-width constraints

## Icon System

The pills block automatically maps text to icons:
- "Favorites" → like-icon.svg
- "History" → history-icon.svg  
- "Following" → person-tick-icon.svg
- "Orders" → orders-icon.svg

## Events

### Search Bar Events
```javascript
// Listen for search events
document.addEventListener('search', (event) => {
  const query = event.detail.query;
  console.log('Search query:', query);
});
```

## Styling

All blocks use consistent styling with:
- Inter font family
- Consistent spacing and padding
- Smooth transitions and hover effects
- Accessible color contrast
- Mobile-first responsive approach

## File Structure

```
blocks/
├── carousel/
│   ├── carousel.js
│   └── carousel.css
├── product-grid/
│   ├── product-grid.js
│   └── product-grid.css
├── banner/
│   ├── banner.js
│   └── banner.css
├── pills/
│   ├── pills.js
│   └── pills.css
└── search-bar/
    ├── search-bar.js
    └── search-bar.css

images/
├── chevron-right.svg
├── like-icon.svg
├── history-icon.svg
├── person-tick-icon.svg
├── orders-icon.svg
├── category-1.png
├── category-2.png
├── product-1.png
├── product-2.png
└── banner-bg.png
```