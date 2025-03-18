# Suitsupply Email Preferences Page

This project contains the HTML, CSS, and JavaScript for the Suitsupply Email Preferences Management page. This page allows users to manage their subscription preferences or unsubscribe from all communications.

## Project Structure

```
unsubscribe-page/
│
├── index.html          # Main HTML file for the unsubscribe page
├── css/
│   └── styles.css      # Custom CSS styles that build on Suitsupply global CSS
│
├── js/
│   └── main.js         # JavaScript functionality for the form and interactions
│
├── img/
│   ├── logo.svg        # Suitsupply logo
│   ├── favicon.svg     # Favicon for the site
│   ├── unsubscribe-mobile.svg  # Responsive image for mobile viewports
│   ├── unsubscribe-tablet.svg  # Responsive image for tablet viewports
│   └── unsubscribe-desktop.svg # Responsive image for desktop viewports
│
└── README.md           # Project documentation
```

## Features

- **Responsive Design**: Optimized for mobile, tablet, and desktop viewports
- **Email Validation**: Client-side validation of email addresses
- **Preference Management**:
  - Option to unsubscribe from all communications
  - Granular control over newsletter, promotion, and event emails
- **Accessibility**: Semantic HTML with appropriate ARIA attributes
- **Loading States**: Visual feedback during form submission
- **Success Confirmation**: Clear success message after preferences are updated

## Development Notes

### CSS Architecture

This project follows Suitsupply's CSS architecture and design system. The custom styles in `styles.css` build upon the global CSS provided by Suitsupply. The page uses Suitsupply's typography classes, colors, and spacing system.

### Form Functionality

The JavaScript handles:
- Email validation
- Toggle logic for the "Unsubscribe from all" option
- Form submission with loading state
- Success message display

### Responsiveness

The page is fully responsive with:
- A mobile-first approach to CSS
- Different image assets for mobile, tablet, and desktop using the `<picture>` element
- Responsive layout changes at appropriate breakpoints

## Implementation Details

### Global CSS Integration

This project integrates with Suitsupply's global CSS which provides:
- Typography styles (using classes like `title-01-medium`, `body-regular`, etc.)
- Color variables (using CSS variables like `--color-primary`, `--color-secondary`, etc.)
- Spacing and layout utilities

### Browser Support

The page supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Deployment

The project is built with standard HTML, CSS, and JavaScript, requiring no build step. To deploy:

1. Upload all files to your web server
2. Ensure the proper directory structure is maintained
3. Verify all links and assets are working correctly

## GitHub Repository

This project is hosted on GitHub at: https://github.com/BT-M/unsubscribe-page