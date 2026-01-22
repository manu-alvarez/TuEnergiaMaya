# TuEnergiaMaya - Agent Guidelines

This repository contains a React frontend and Laravel backend for a Maya energy/dreamspell application.

## Build / Lint / Test Commands

### Frontend (React + Vite)
```bash
cd frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run preview      # Preview production build
npm run predeploy    # Run build before deploy
npm run deploy       # Deploy to gh-pages
```

### Backend (Laravel)
```bash
cd backend
composer dev         # Run full dev environment (server, queue, logs, vite)
php artisan serve    # Start Laravel development server
composer test        # Run all PHPUnit tests
php artisan test     # Run all tests (alternative)
vendor/bin/phpunit   # Run tests directly
```

### Running Single Tests (Backend)
```bash
php artisan test --filter TestClassName
php artisan test --filter testMethodName
vendor/bin/phpunit --filter testMethodName
```

### Database
```bash
php artisan migrate           # Run migrations
php artisan migrate:fresh     # Fresh migration (drops tables)
php artisan db:seed           # Run seeders
```

## Code Style Guidelines

### Frontend (React/JSX)
- **File extensions**: `.jsx` for React components, `.js` for utilities
- **Component structure**: Function components only, no class components
- **State management**: `useState` hook, `useRef` for refs, `useEffect` for side effects
- **Imports**:
  - React hooks: `import { useState, useEffect, useRef } from 'react'`
  - MUI components: Named imports, e.g., `import { Box, Typography } from '@mui/material'`
  - Local files: Use relative paths with `./` prefix
- **Naming conventions**:
  - Components: PascalCase (e.g., `App`, `KinCard`)
  - Functions/variables: camelCase (e.g., `loadTodayKin`, `kinData`)
  - Constants: PascalCase or UPPER_SNAKE_CASE (e.g., `sealsData`)
  - Event handlers: `handle` prefix (e.g., `handleFlip`, `handleOpenModal`)
- **Styling**: Material-UI `sx` prop for inline styles, custom classes in CSS
- **Theme**: Dark mode theme defined in `theme.js` with custom color palette
- **No code comments** (minimal inline documentation)

### Backend (Laravel/PHP)
- **Namespaces**: PSR-4 standard, e.g., `namespace App\Http\Controllers\Api`
- **Class naming**: PascalCase (e.g., `KinController`, `Kin`)
- **Method naming**: camelCase (e.g., `calculateKinForDate`, `index`, `show`)
- **Visibility**: Public for API endpoints, private for helper methods
- **Models**: Eloquent ORM with `$table` and `$fillable` properties
- **Routing**: RESTful routes in `routes/api.php`
- **Responses**: Use `response()->json()` for API responses
- **Date handling**: Laravel's Carbon for date manipulation
- **Indentation**: 4 spaces (per `.editorconfig`), LF line endings, UTF-8 encoding

### General Conventions
- Use `firstOrFail()` for queries that should return results
- Chain Eloquent methods fluently
- Keep controllers thin, put business logic in models or services
- Use Laravel's built-in helpers where available
- Follow PSR-12 coding standard for PHP
- No comments unless explicitly requested

### Error Handling
- **Frontend**: Basic error states with loading indicators, display user-friendly error messages
- **Backend**: Laravel's exception handling, return JSON error responses from API endpoints
- Use `optional()` to avoid null reference errors
- Try-catch blocks only when specific error handling is needed

### Linting Configuration
- ESLint uses flat config format
- Ignores `dist` directory
- Rules: `no-unused-vars` with `varsIgnorePattern: '^[A-Z_]'` (allows React components)
- React hooks rules and React refresh rules enabled

## Project Structure
```
TuEnergiaMaya/
├── frontend/          # React + Vite + MUI
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── theme.js
│   │   └── utils/
│   └── package.json
└── backend/           # Laravel 12
    ├── app/
    │   ├── Http/Controllers/Api/
    │   └── Models/
    ├── database/
    │   ├── migrations/
    │   └── seeders/
    ├── routes/
    │   └── api.php
    ├── tests/
    │   ├── Feature/
    │   └── Unit/
    └── composer.json
```

## Testing Approach
- Backend uses PHPUnit with feature and unit test suites
- Test configuration in `phpunit.xml`
- Use in-memory SQLite for testing (configured in phpunit.xml)
- Follow Laravel testing conventions with `$this->get()`, `$response->assertStatus()`
- Write descriptive test method names following `test_the_application_returns_a_successful_response` pattern

## Environment Setup
- **Frontend**: Copy `.env.example` to `.env` if needed (uses Vite defaults)
- **Backend**: Copy `.env.example` to `.env`, run `php artisan key:generate`, configure database
- Backend uses SQLite by default (check `.env` for DB_CONNECTION)
- Run `php artisan migrate` to set up database tables

## API Conventions
- All API routes prefixed with `/api/` (Laravel default)
- RESTful endpoints: GET for retrieval, return JSON responses
- Include kin_number, date, and kin data in response structure
- Use snake_case for JSON response keys (Laravel default)

## Asset Management
- Static images in `frontend/public/` and `frontend/src/assets/`
- Glyph images stored in `frontend/public/assets/glyphs/`
- Use relative paths for imports: `assets/glyphs/${slug}.png`
- Vite handles asset bundling and optimization

## Git & Deployment
- Main branch is `main`
- Frontend deploys to GitHub Pages via gh-pages branch
- Run `npm run deploy` from frontend directory to publish
- Ensure `npm run build` passes before deploying changes

## Key Dependencies
- **Frontend**: React 19, Material UI 7, Axios, React Router, Vite 7
- **Backend**: Laravel 12, PHPUnit, Laravel Sanctum, Carbon
- Keep dependencies updated, test thoroughly after updates

## Debugging
- Frontend: Browser DevTools, React DevTools, Vite HMR
- Backend: Laravel Telescope, `dd()` for debugging, logging to storage/logs
- Use `php artisan tinker` for interactive shell testing
