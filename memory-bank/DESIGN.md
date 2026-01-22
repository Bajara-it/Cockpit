# DESIGN.md - Cockpit CMS Frontend Design System

This document provides comprehensive frontend UI/UX design information for the Cockpit CMS project.

---

## 1. Color Palette and Theming

### Theme Architecture

Cockpit implements a dual-theme system with automatic detection of user preferences through CSS custom properties (CSS variables). The theming is controlled via the `data-theme` attribute on the HTML element, supporting `light` and `dark` modes.

### Dark Theme (Default)

The dark theme serves as the default, providing a professional, modern appearance suited for content management interfaces.

- **Base Background**: Deep navy blue (#131720) creating a sophisticated foundation
- **Base Text**: Near-white (#fafafa) for optimal readability on dark backgrounds
- **Contrast Surface**: Darker blue-black (#10131a) for elevated surfaces like cards and dialogs
- **Card Contrast**: Slightly lighter navy (#171d28) for card backgrounds with visual hierarchy

### Light Theme

The light theme provides an alternative for users preferring higher brightness environments.

- **Base Background**: Light gray (#f6f8fa) providing a clean, modern foundation
- **Base Text**: Near-black (#121212) for strong readability
- **Contrast Surface**: Pure white (#fff) for elevated elements
- **Alternate Surface**: Off-white (#fafcfe) for subtle differentiation

### Semantic Color System

The design system employs semantic colors that maintain consistent meaning across both themes:

- **Primary**: Vibrant blue (#0e8fff for dark, #8932ff purple for light) - Used for interactive elements, links, active states, and primary actions
- **Success**: Green (#4caf50) - Positive actions, confirmations, completed states
- **Warning**: Orange - Caution states, pending actions, important notices
- **Danger**: Vivid red (#f91941) - Destructive actions, errors, critical alerts
- **Muted**: Semi-transparent neutral (50-55% opacity) - Secondary text, disabled states, placeholders

### Overlay and Surface Colors

- **Overlay Dark**: 60% opacity black - Modal backgrounds, off-canvas overlays
- **Overlay Light**: 80% opacity white - Modal backgrounds in light theme
- **Shadow Colors**: Variable opacity black for depth perception, adapting to theme

---

## 2. Typography and Spacing

### Font Families

**Primary System Font Stack**: The application uses a system font approach for optimal performance and native feel:
- Apple platforms: SF Pro Display, -apple-system, BlinkMacSystemFont
- Windows: Segoe UI
- Cross-platform: Helvetica, Arial, sans-serif
- Emoji support: Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol

**Monospace Font Stack**: Used for code displays, technical content, and autocomplete suggestions:
- Primary: ui-monospace, Menlo, Monaco
- Fallbacks: Cascadia Mono, Segoe UI Mono, Roboto Mono, Oxygen Mono, Ubuntu Monospace, Source Code Pro, Fira Mono, Droid Sans Mono, Courier New

**Icon Font**: Material Icons Outlined - Provides consistent iconography throughout the interface

### Type Scale

The typography system follows a modular scale using CSS custom properties:

- **Size 1 (H1)**: 2.5rem - Main page titles
- **Size 2 (H2)**: 2rem - Section headings, dialog messages
- **Size 3 (H3)**: 1.75rem - Subsection headings
- **Size 4 (H4)**: 1.3rem customized, 1.5rem default - Feature headings
- **Size 5 (H5)**: 1rem - Standard body equivalent
- **Size 6 (H6)**: 0.875rem - Small text, secondary information
- **Extra Large**: 3.5rem - Hero text, impact statements
- **Extra Small**: 11px - Micro text, badges, labels

### Line Heights

- **Standard**: 1.5 (default reading text)
- **Headings**: 1.2 (tighter for visual impact)
- **Tight**: 1.25 (compact displays)
- **Relaxed**: 1.65 (increased readability)
- **Loose**: 2 (maximum spacing)
- **None**: 1 (icons, single-line elements)

### Text Styles

- **Caption Style**: 0.65em size, uppercase, letter-spacing 0.015em - Used for labels, categories
- **Button Text**: 0.65em size, uppercase, bold, letter-spacing 0.1em
- **Breadcrumbs**: 11px, uppercase, letter-spacing 2px
- **Navigation Links**: 14px base size
- **Table Headers**: 0.6em, uppercase, bold, letter-spacing 0.1em

### Spacing System

The spacing system uses CSS custom properties with a consistent scale:

**Margin Scale**:
- Extra Small: 4px - Minimal separation
- Small: 0.6rem (~10px) - Tight grouping
- Standard: 1rem (~16px) - Default element separation
- Large: 3rem (~48px) - Section separation

**Padding Scale**:
- Extra Small: 0.3rem (~5px) - Compact padding
- Small: 0.6rem (~10px) - Standard input padding
- Standard: 1rem (~16px) - Default container padding
- Larger: 2rem (~32px) - Comfortable spacing
- Large: 3rem (~48px) - Generous whitespace

**Block Element Margin**: 1.5rem standard vertical rhythm between block elements

---

## 3. Frontend Libraries and Tools

### Core Framework

**Vue.js 3**: The primary frontend framework providing:
- Component-based architecture with Options API
- Reactive data binding for form fields and UI state
- Template-based rendering with inline templates
- Two-way data binding for form components

### CSS Framework

**Kiss CSS**: A custom lightweight CSS framework providing:
- Base reset and normalization
- Utility classes for layout, spacing, colors, and typography
- Component styles for buttons, cards, forms, dialogs, and navigation
- Custom web components using HTML custom elements (kiss-dialog, kiss-card, kiss-grid, etc.)
- Responsive breakpoint system
- RTL (Right-to-Left) language support

### Animation Library

**Animate.css v3.7.0**: Provides pre-built CSS animations including:
- Attention seekers: bounce, flash, pulse, rubberBand
- Entrance animations: fadeIn, slideIn, zoomIn variations
- Exit animations: fadeOut, slideOut, zoomOut variations
- CSS keyframe-based for performance

### Specialized Libraries

**CodeMirror**: Code editor with syntax highlighting for code fields, with addons for:
- Dialog overlays
- Fullscreen editing
- Code folding
- Autocomplete hints
- Linting
- Merge views
- Custom scrollbars
- Search functionality

**Tiptap**: Rich text editor integration providing WYSIWYG editing capabilities

**AG Grid**: Data grid component with custom theming for table displays

**Uppy**: File upload component with progress tracking and preview functionality

**Spotlight**: Lightbox functionality for asset preview

**GraphiQL**: GraphQL IDE for API exploration

**Xterm**: Terminal emulator for system console functionality

---

## 4. Component Styling Patterns

### Web Components Architecture

The design system leverages HTML Custom Elements for encapsulated components:

- **kiss-dialog**: Modal dialogs with backdrop, content container, and animation states
- **kiss-card**: Flexible card containers with theming, hover effects, and shadow options
- **kiss-grid**: CSS Grid-based responsive layout system
- **kiss-dropdown**: Dropdown menus with positioning options
- **kiss-offcanvas**: Slide-in side panels for navigation and forms
- **kiss-tabs**: Tabbed interface navigation
- **kiss-tooltip**: Contextual hover information
- **kiss-toast**: Notification messages
- **kiss-navlist**: Navigation list styling

### Application-Specific Components

- **app-loader**: Loading indicators with orbit and dots animation modes
- **app-actionbar**: Fixed bottom action bar for form submissions
- **app-avatar**: User avatar display with canvas rendering
- **app-fieldcontainer**: Form field wrapper with active state styling
- **app-scrollcontainer**: Custom scrollable containers
- **app-textcomplete**: Autocomplete dropdown styling

### Card Patterns

Cards support multiple visual treatments through attributes:
- **theme="shadowed"**: Adds subtle drop shadow
- **theme="bordered"**: Adds border with configurable color
- **theme="contrast"**: Applies contrast background color
- **hover="shadow"**: Elevates on hover with enhanced shadow
- **hover="scale"**: Subtle scale transform on hover
- **hover="bordered"**: Shows border on hover

### Button Patterns

Buttons follow a consistent styling approach:
- **Default**: Solid background with uppercase text
- **Primary**: Uses primary brand color
- **Danger**: Red background for destructive actions
- **Outline**: Transparent with border
- **Blank**: No visible background or border
- **Size variants**: Small, default, large with adjusted padding and line-height
- **Button groups**: Adjacent buttons with shared border radius

### Form Field Patterns

Form inputs share consistent styling:
- Subtle border with theme-appropriate color
- Background with slight transparency
- Focus state with primary color border
- Placeholder text with reduced opacity
- Border radius matching global setting (3px)
- Smooth transition for interactive states

---

## 5. UI/UX Design Principles

### Visual Hierarchy

The interface establishes clear visual hierarchy through:
- Size differentiation for headings and body text
- Color contrast between primary content and secondary information
- Spacing variation to group related content
- Shadow depth for elevation levels
- Opacity variations for active vs inactive states

### Accessibility Considerations

**Color Contrast**: Light and dark themes maintain readable contrast ratios

**Reduced Motion**: Respects user preference with `prefers-reduced-motion` media query, disabling all animations and transitions when enabled

**Focus States**: Visible focus indicators with box-shadow outlines for keyboard navigation

**Screen Reader Support**: Hidden visually but accessible elements using `.kiss-hidden-visually` class

**Touch Device Support**: Specific styles for touch vs pointer devices using media queries

### Responsive Design Approach

**Breakpoint System**:
- Small (640px): Phone landscape
- Medium (960px): Tablet landscape
- Large (1200px): Desktop
- Extra Large (1600px): Large screens

**Container Widths**:
- Maximum: 1800px
- Medium: 1200px
- Small: 900px

**Mobile Considerations**:
- Fixed sidebar collapses on smaller screens
- Container padding adapts to viewport
- Grid columns reduce for smaller breakpoints
- Touch-specific visibility classes

### Internationalization (RTL Support)

Full Right-to-Left language support including:
- Direction reversal for layouts
- Mirrored positioning for sidebar and panels
- Logical properties (margin-inline-start, padding-inline-end)
- Adjusted animations for slide directions
- Dropdown positioning adaptations

### Animation and Motion

**Transition Timing**: Standard 250ms duration with ease timing for smooth interactions

**Dialog Animations**: Entry with translateY slide-up and opacity fade, exit with reverse

**Hover Transitions**: Color, opacity, and transform changes with 250-300ms duration

**Loading States**: Continuous animations using CSS keyframes for orbit and dots patterns

**Performance**: Hardware-accelerated transforms using translate3d and translateZ(0)

---

## 6. Frontend Library Usage Patterns

### Vue.js Component Structure

Components follow the Options API pattern with:
- **_meta object**: Defines label, info, icon, settings array, and render function for field types
- **data()**: Returns reactive state with unique instance IDs
- **props**: Typed properties with defaults for component configuration
- **watch**: Reactive observers for external value changes
- **computed**: Derived properties for display values
- **methods**: Event handlers and utility functions
- **template**: Inline template strings using tagged template literals

### Field Component Pattern

Form field components share a consistent structure:
- Model value binding with v-model pattern
- Input wrapper with field-type attribute for scoping
- Conditional rendering for display variations
- Size and appearance props for customization
- Update method emitting modelValue changes

### Kiss CSS Utility Pattern

Utility classes follow a consistent naming convention:
- **Prefix**: `kiss-` for all utilities
- **Type**: Describes the property (margin, padding, flex, color)
- **Modifier**: Optional size or direction (small, large, top, left)
- **Responsive suffix**: Optional breakpoint indicator (@s, @m, @l, @xl)

### Custom Properties Organization

CSS custom properties are organized by scope:
- **kiss-** prefix: Framework-level variables
- **app-** prefix: Application-specific variables
- **Component-specific**: Scoped to their elements

### Icon Implementation

Icons use a hybrid approach:
- **Material Icons Outlined**: Icon font for standard UI icons, rendered via `<icon>` custom element
- **SVG Icons**: Module-specific icons stored as separate SVG files for specialized visuals
- **kiss-svg Component**: SVG rendering for scalable vector icons

---

## Summary

The Cockpit CMS frontend design system provides a cohesive, accessible, and performant user interface through:

- Dual-theme support with automatic system preference detection
- System font stack for optimal performance and native feel
- Modular spacing and typography scales using CSS custom properties
- Web Components architecture for encapsulated styling
- Vue.js 3 for reactive component logic
- Comprehensive RTL support for international audiences
- Accessibility features including reduced motion and focus management
- Responsive design with four breakpoint levels
- Consistent animation patterns for smooth interactions

The design emphasizes clarity, efficiency, and professionalism appropriate for a content management system used by developers and content editors.
