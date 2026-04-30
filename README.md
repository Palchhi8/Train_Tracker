# 🚆 Train Tracker: Simplified Commuter Intelligence

##  The Core Idea
The core idea of this project is to build a type-safe, efficient, and centralized train information platform that simplifies how commuters access railway data. Millions of local train commuters face daily challenges due to the lack of clear, centralized, and easily accessible train information. This platform bridges that gap by providing a single source of truth for schedules and platform details.

## Problem Solving Strategy
Users often struggle to identify trains between two stations, find accurate platform numbers, or retrieve details using a train number. Existing systems are fragmented, outdated, or difficult to navigate. 

Our strategy focuses on:
1. **Centralization:** Bringing fragmented data into one unified, easy-to-navigate interface.
2. **Type Safety:** Using TypeScript across the entire stack to ensure code reliability, fewer runtime errors, and improved maintainability.
3. **Accessibility:** Designing a user-friendly interface that replaces the need for station boards or multiple unoptimized sources.
4. **Performance:** Leveraging Next.js App Router for optimized rendering (SSG, SSR, and ISR) to ensure data is served instantly to users on the go.

##  How It Works
The system follows a simple but powerful workflow to ensure users get the information they need in seconds:
* **Route Discovery:** Users input source and destination stations to retrieve all available trains along with their specific platform details.
* **Direct Lookup:** Users can search using a specific train number to get real-time details and schedules for that specific train.
* **Optimized Rendering:** Using a combination of static and server-side rendering, the most frequent routes are served instantly, while real-time data is fetched dynamically where necessary.
* **Data Integrity:** Through Prisma ORM and Supabase, the system maintains a robust and type-safe connection to a PostgreSQL database, ensuring that the information retrieved is accurate and consistent.

##  Tech Stack
* **Frontend / Full-stack Framework:** Next.js (App Router with TypeScript)
* **Backend:** Node.js with REST APIs (TypeScript-based)
* **Database:** Supabase (PostgreSQL)
* **ORM:** Prisma (Type-safe queries)
* **Languages:** TypeScript (End-to-End)
* **Tools & Services:** Git, GitHub, Environment Variables (.env), API Architecture
