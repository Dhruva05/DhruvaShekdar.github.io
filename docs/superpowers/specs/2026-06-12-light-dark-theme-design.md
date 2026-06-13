# Light and Dark Theme Design

## Goal

Add an accessible light and dark theme switch to the portfolio while
preserving the existing editorial design, static export, and low client-side
JavaScript footprint.

## Approved Experience

- Place a compact labeled sun/toggle/moon control in the navigation action
  group beside GitHub and Resume.
- On a first visit, follow the operating system's
  `prefers-color-scheme` value.
- After the visitor changes the theme, persist the explicit light or dark
  choice and reuse it across routes and later visits.
- Use the existing light palette and a neutral graphite dark palette.
- Apply the initial theme before the page paints so the interface does not
  flash in the wrong theme.

## Visual Direction

The switch uses two small sun and moon icons around a compact track. The active
side is communicated through the track position, icon color, accessible label,
and `aria-pressed` state. It should read as a utility control rather than a
primary call to action.

The graphite palette keeps the current visual hierarchy:

- Deep neutral canvas rather than pure black or blue-tinted navy.
- Slightly lighter neutral surfaces for cards and the sticky header.
- Off-white primary text with restrained gray secondary text.
- Existing blue and teal accents adjusted only where contrast requires it.
- Subtle light grid lines, borders, selections, and translucent panels.
- Project images and videos retain their original colors without overlays.

## Architecture

### Theme Attribute

The active theme is represented by `data-theme="light"` or
`data-theme="dark"` on the root `<html>` element. CSS variables remain the
single source of truth for visual colors.

### Pre-Paint Initialization

The root layout includes a small inline script before visible page content. It:

1. Reads a versioned local storage key for an explicit user choice.
2. Uses that value when it is `light` or `dark`.
3. Otherwise evaluates `window.matchMedia("(prefers-color-scheme: dark)")`.
4. Applies the resulting `data-theme` attribute and matching
   `color-scheme` value to the document root.

Storage access is wrapped in error handling so restricted storage does not
prevent system preference fallback.

### Theme Toggle Component

A focused client component owns the interactive control. It:

- Reads the already-applied root theme after hydration.
- Switches between light and dark on click or keyboard activation.
- Writes the explicit choice to local storage.
- Updates `data-theme` and `color-scheme` immediately.
- Exposes an accessible name describing the next action.
- Uses `aria-pressed` to communicate whether dark mode is active.
- Avoids rendering theme-dependent text that would create a hydration
  mismatch.

The component does not wrap the application in a provider because theme state
is global DOM state and no other React component needs to subscribe to it.

### System Preference Changes

When there is no explicit stored preference, the active theme follows live
system preference changes. Once the user chooses a theme, the persisted manual
choice takes precedence until local site data is cleared.

## CSS System

The current light values remain in `:root`. Dark values are defined under
`:root[data-theme="dark"]`.

Explicit light-only colors in the sticky header, body grid, translucent process
stages, selection rows, footer metadata, and footer links are converted into
semantic variables. Media backgrounds that are intentionally black remain
unchanged.

Color transitions are limited to background, border, and text colors and are
disabled under `prefers-reduced-motion: reduce`.

## Responsive Behavior

- Desktop and tablet keep the toggle between GitHub and Resume.
- On narrow screens, the control remains fully visible and compact.
- Existing responsive navigation behavior remains intact.
- The control has at least a 40 by 40 CSS pixel interactive area and visible
  keyboard focus.
- The toggle must not cause horizontal page overflow at 390 CSS pixels.

## Accessibility

- Use a native `<button type="button">`.
- Provide an action-oriented accessible label such as
  `Switch to dark mode` or `Switch to light mode`.
- Mark decorative icons as hidden from assistive technology.
- Maintain focus-visible styling and WCAG AA contrast for control states,
  text, borders, and links in both themes.
- Apply `color-scheme` so browser-provided controls match the selected theme.

## Testing

Automated tests verify:

- The pre-paint script exists in the root layout and handles stored preference
  plus system fallback.
- The navigation renders the theme toggle.
- The toggle is a client component with a native button, persistence, root
  attribute updates, and accessible state.
- Dark theme CSS variables and semantic replacements exist.
- The deployment workflow regression test remains intact.

Manual browser verification covers:

- First-load system preference with no stored choice.
- Switching in both directions.
- Persistence after reload and navigation to the Mini-DLSS route.
- Desktop and mobile layout without overflow.
- Keyboard focus and activation.
- Reduced-motion behavior.
- Homepage and case-study readability, borders, surfaces, media, tables, and
  footer in both themes.

## Scope

Included:

- Theme initialization, toggle interaction, palette tokens, responsive styling,
  tests, and browser verification.

Excluded:

- A third explicit "system" mode in the visible control.
- Server-side cookies or account synchronization.
- Theme-specific image assets.
- Changes to page content, layout structure, or project media.
