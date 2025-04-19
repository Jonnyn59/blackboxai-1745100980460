# Work Shift Calendar

A responsive React application for managing work shifts with dark mode support, built using React, Tailwind CSS, and date-fns.

## Features

- View and manage work shifts on a calendar.
- Add, edit, and delete shifts with customizable colors and time ranges.
- Dark mode toggle with default dark theme.
- Responsive design optimized for both desktop and mobile devices.

## Technologies Used

- React
- Tailwind CSS
- date-fns
- Font Awesome for icons
- Google Fonts (Poppins)

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- npm (comes with Node.js)

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd work-shift-calendar
```

2. Install dependencies:

```bash
npm install
```

### Running the App in Development

```bash
npm start
```

This will start the development server and open the app in your default browser at `http://localhost:3000`.

### Building for Production

To create an optimized production build, run:

```bash
npm run build
```

This will generate a `build` folder with the production-ready files.

### Deployment

You can deploy the contents of the `build` folder to any static hosting service such as:

- GitHub Pages
- Netlify
- Vercel
- AWS S3 + CloudFront
- Firebase Hosting

## Folder Structure

- `src/` - React source code
- `public/` - Static assets and HTML template
- `package.json` - Project metadata and scripts
- `tailwind.config.js` - Tailwind CSS configuration

## Customization

- Tailwind CSS configuration is in `tailwind.config.js`.
- Fonts and icons are imported via CDN in `src/index.css`.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact the project maintainer.
