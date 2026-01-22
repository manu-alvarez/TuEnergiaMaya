# Specification: TuEnergiaMaya Mobile App

## 1. Description
"TuEnergiaMaya" is a digital platform designed to provide daily Kin information from the Tzolkin Maya calendar. The application will serve as a professional and didactic resource for both scholars and non-scholars, offering detailed Kin descriptions, illustrations, and user-specific features like saving dates and reminders.

## 2. Technical Stack
### 2.1 Frontend
- **Framework**: React with Vite
- **UI Library**: Material UI M3 (Material Design 3)
- **Styling**: Vanilla CSS (no Tailwind)
- **Language**: JavaScript (no TypeScript)
- **Features**: Fully responsive (mobile-first), Offline support (PWA), Google OAuth.

### 2.2 Backend
- **Framework**: Laravel (PHP)
- **Database**: MySQL
- **Architecture**: REST API
- **Authentication**: JWT / Sessions, OTP verification via Email, Google OAuth.

## 3. Core Features
- **Daily Kin**: Automatic calculation and display of the daily Kin based on the Tzolkin cycle.
- **Kin Library**: Searchable database of all 260 Kines with long-form descriptions (A4 equivalent) and illustrations.
- **User Profiles**: Registration via Email/OTP or Google.
- **Personalization**: Users can save their birth Kin, set reminders, and bookmark specific days.
- **NotebookLM Integration**: Automated ingestion pipeline (simulated or API-based) to update descriptions from source documents.

## 4. Design System (Material Design 3)
- **Primary Color**: Deep Indigo / Maya Blue
- **Secondary Color**: Energetic Amber
- **Background**: Dark mode optimized with glassmorphic elements.
- **Typography**: Inter / Outfit for a modern feel.

## 5. Data Model
- `users`: id, email, name, birth_kin, preferred_notifications, google_id.
- `kines`: id (1-260), name, seal, tone, affirmation, short_description, long_description, image_url.
- `daily_records`: date, kin_id.

## 6. Implementation Plan
### Phase 1: Project Setup
1. Initialize Laravel backend in `/backend`.
2. Initialize React + Vite frontend in `/frontend`.
3. Configure MySQL database.
### Phase 2: Backend Development
1. Create Kin models and migrations.
2. Seed the database with the provided Kin info (from `/info kines`).
3. Implement Auth (OTP + Google).
4. Implement Daily Kin logic.
### Phase 3: Frontend Development
1. Set up MUI M3 theme.
2. Build responsive layouts (Home, Kin Detail, Profile, Calendar).
3. Connect to Backend API.
### Phase 4: Integration & Optimization
1. Automated update logic (Kin of the day).
2. SEO and PWA configuration.
3. Testing and deployment.
