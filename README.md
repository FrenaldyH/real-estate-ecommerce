# RumahKu - Frontend

Frontend for RumahKu, an Indonesian real estate platform. Built with React + Vite + Tailwind CSS.

## Tech Stack

- **React 18** — UI library
- **React Router 7** — client-side routing
- **Tailwind CSS 4** — styling
- **Lucide React** — icons
- **Vite** — build tool and dev server

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
  main.tsx                  # App entry point
  app/
    App.tsx                 # Root component (providers + router)
    routes.tsx              # All route definitions
    pages/                  # One file per page/route
    components/
      layout/               # Navbar, Footer — shared across all pages
      common/               # Generic reusable components (Button, Input, Modal, etc.)
      auth/                 # Login and Register modals
      property/             # Property-specific components (grid, filters, empty state)
    context/                # React context (WishlistContext)
    hooks/                  # Custom hooks (useModal, useLocalStorage, useDebounce)
    data/                   # Static mock data (properties, blog articles, KPR terms)
    types/                  # TypeScript interfaces
    constants/              # App-wide constants (routes, categories, config)
    utils/                  # Utility/helper functions
  styles/                   # Global CSS files
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home |
| `/properties` | All properties (filterable) |
| `/properties?type=buy` | Properties for sale |
| `/properties?type=rent` | Properties for rent |
| `/property/:id` | Property detail |
| `/agents` | Agent listing |
| `/blog` | Blog list |
| `/blog/:id` | Blog article |
| `/kpr` | KPR info & calculator |
| `/kpr/simulation` | KPR simulation |
| `/wishlist` | Saved properties |
| `/advertiser` | List your property |
| `/developer/login` | Developer login |

## Key Conventions

- **Naming**: PascalCase for components, camelCase for functions/variables
- **Imports**: Use path aliases — components import from relative `../components/layout/Navbar`
- **Styling**: Tailwind utility classes only — no inline styles, no CSS modules
- **Data**: Currently uses local mock data in `src/app/data/` — replace with API calls when backend is ready
- **State**: Local `useState` for UI state, context only for cross-component state (wishlist)

## Connecting to the Backend

When the API is ready, replace the data files in `src/app/data/` with fetch calls. A good pattern:

```ts
// src/app/services/properties.ts
export async function getProperties(filters) {
  const res = await fetch(`/api/properties?${new URLSearchParams(filters)}`);
  if (!res.ok) throw new Error('Failed to fetch properties');
  return res.json();
}
```

Then use it in a page with loading/error states:

```tsx
const [properties, setProperties] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  getProperties(filters)
    .then(setProperties)
    .finally(() => setLoading(false));
}, [filters]);
```
