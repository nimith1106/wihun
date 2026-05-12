# MediCare Pro

MediCare Pro is a health-focused web application for early risk awareness, simple health guidance, appointment support, emergency access, and personal health record management.

The website is designed to help users understand symptoms earlier and reach the right care faster through a clear, mobile-friendly interface.

## Website Overview

MediCare Pro brings common digital healthcare tools into one place:

- AI-assisted symptom checking for general health concerns
- PCOD/PCOS risk screening for women's health awareness
- Neuro and stroke warning-sign checks for urgent symptoms
- Appointment booking support for online and in-person consultations
- Emergency help access with quick action flows
- Digital health records and trend tracking
- Simple health literacy content for easier understanding

This project is intended for awareness and support. It does not replace professional medical diagnosis, emergency care, or consultation with a qualified doctor.

## Main Pages

- `/` - Home page with health tools and platform overview
- `/symptoms` - Symptom checker
- `/pcod` - PCOD/PCOS risk checker
- `/neuro-check` - Neuro and stroke warning-sign check
- `/appointments` - Appointment booking
- `/emergency` - Emergency support
- `/records` - Health records
- `/about` - Mission, impact, and team details
- `/auth` - Authentication page

## Tech Stack

- React
- Vite
- React Router
- Tailwind CSS
- Framer Motion
- TanStack React Query
- React icons
- Recharts

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run lint checks:

```bash
npm run lint
```

## Project Structure

```text
src/
  api/          API and backend client helpers
  components/   Reusable UI, health, landing, and record components
  hooks/        Shared React hooks
  lib/          App contexts, routing helpers, and utilities
  pages/        Main route pages
  utils/        Shared utility exports
```

## Purpose

The goal of MediCare Pro is to improve early health awareness, especially for users who may have limited access to specialists, low health literacy, or urgent symptoms that need quick guidance.
