# Kalyāna Wellness Retreat Website

A beautiful, modern website replica of Kalyāna Wellness Retreat - a wellness and cultural retreat service focused on China travel experiences.

## Features

- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Clean, elegant design with smooth animations
- **Interactive Elements**: 
  - Mobile-friendly navigation menu
  - Newsletter subscription form
  - Discovery call modal
  - Smooth scrolling
- **Wellness-Focused**: Beautiful color scheme and typography that reflects the retreat's nature + wellness + culture theme

## Project Structure

```
Kalayana Retreat/
├── index.html      # Main HTML file
├── styles.css      # All styling and responsive design
├── script.js       # JavaScript for interactivity
└── README.md       # This file
```

## Getting Started

### Option 1: Open Directly in Browser

Simply open `index.html` in your web browser. No build process or server required!

### Option 2: Use a Local Server (Recommended)

For the best experience, use a local development server:

**Using Python:**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

**Using Node.js (with http-server):**
```bash
npx http-server -p 8000
```

Then open `http://localhost:8000` in your browser.

**Using VS Code:**
- Install the "Live Server" extension
- Right-click on `index.html` and select "Open with Live Server"

## Customization

### Colors

The color scheme can be customized in `styles.css` by modifying the CSS variables:

```css
:root {
    --primary-color: #2c5f41;      /* Main green color */
    --secondary-color: #8b7355;    /* Brown accent */
    --accent-color: #d4a574;       /* Light gold */
    /* ... */
}
```

### Content

- Edit `index.html` to update text content, add new sections, or modify structure
- Update retreat information, dates, and stories in the HTML
- Modify form endpoints in `script.js` to connect to your backend

### Images

Currently, the site uses gradient placeholders for images. To add real images:

1. Create an `images/` folder
2. Add your images
3. Replace the placeholder divs with `<img>` tags in `index.html`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Notes

- The discovery call modal is included but auto-open is commented out by default
- All forms currently show alert messages - connect to your backend API for real functionality
- Social media links are placeholder - update with your actual social media URLs
- Payment method icons are text-based - replace with actual payment logos if needed

## License

This is a replica project for demonstration purposes.

