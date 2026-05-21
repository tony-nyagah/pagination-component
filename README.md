# Pagination Component
## ARCHITECTURE & LOGIC SUMMARY

1. State Management (App.tsx)
   - The parent component owns the `currentPage` state. 
   - It computes `currentData` dynamically by slicing the total array using standard offset pagination math: 
     start = (currentPage - 1) * pageSize
     end = start + pageSize

2. Ellipsis Logic (Pagination.tsx)
   - The `useMemo` hook calculates an array of page numbers to render.
   - If total pages ≤ 7, it renders all pages.
   - If the current page is near the start (≤ 3), it renders the first 4 pages, an ellipsis, and the last 2 pages.
   - If near the end, the logic inverses.
   - If in the middle, it flanks the current page with immediate neighbors and bookends both sides with ellipses.

3. Neubrutalist Styling
   - Uses strict, high-contrast borders (`border-4 border-black`).
   - Relies on sharp, non-blurred drop shadows: `shadow-[8px_8px_0px_rgba(0,0,0,1)]`.
   - On hover/active states, the buttons utilize `translate-y` combined with adjusted shadow offsets to create a tactile "press" illusion without losing the brutalist edge.

4. Accessibility (A11y)
   - `<nav aria-label="Pagination">` identifies the component to screen readers.
   - `aria-current="page"` marks the currently active page.
   - `aria-disabled` maps to the disabled state of the extreme boundaries.
   - The `onKeyDown` handler attached to the `<nav>` wrapper allows users to navigate back and forth using the Left and Right arrow keys when focus is inside the component. Native button elements natively handle Space/Enter activation.
