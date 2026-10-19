# Linkora

Linkora is a simple URL shortener web app built with React and Vite. The idea is straightforward: shorten long links, keep them organized, and manage them from one place without making the experience feel too heavy.

It has a clean landing page, a sign-up and login flow, a dashboard for managing links, and a few visual touches to make the whole thing feel a bit more polished.

## What this project includes

- Shorten long URLs into cleaner links
- View and manage saved links from a dashboard
- Basic link analytics and visual summaries
- Responsive layout for desktop and mobile
- Protected routes for authenticated users

## Tech stack

- React
- Vite
- Tailwind CSS
- React Router
- Axios
- Chart.js
- React Query

## Getting started

Install the dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open the local URL shown in the terminal, usually:

```bash
http://localhost:5173
```

## Production build

To create a production build:

```bash
npm run build
```

## Project structure

A quick look at the main folders:

- src/components – pages and reusable UI pieces
- src/contextApi – shared app state
- src/apis – API requests and helpers
- src/utils – constants and utility functions

## Future enhancements

Planned improvements for the app include:

- Show summary cards at the top of the dashboard for:
  - Total URLs
  - Total Clicks
- Improve the analytics chart so it stays useful even when only one day of data exists by defaulting to the last 7 or 30 days, or showing a message such as: "More data will appear as your links receive clicks."
- Add search and filtering options for links, including:
  - Search by long URL or description
  - Filter by most clicked, newest, or oldest
- Display the destination domain instead of the full original URL, for example:
  - google.com
  - github.com