# ChronoArcana

## Project Description
A webapp that allows you to digitally pull your Tarot card for the day (Or choose your card if pulled physically). The users profile will have each days Tarot card pull stored for easy tracking over time. There will also be a small section for note taking alongside the card pull of the day.

There should be a landing page describing the product along with a signup option. The profile dashboard page will have a button to choose either a digital pull or physical. A digital pull with a press of a button will allow a randomly chosen card from the deck to be displayed. A physical pull will allow the user to manually choose the card themselves which will also display the card.

The profile dashboard will also show the Tarot card pulls of the last 30 days and allow for each day to be clicked. Each day will show the card pulled, any notes from the user, and the various card meanings and symbol associations with this card.

The profiles will have a built in function that graphs and gives data feedback as to what Tarot card was pulled the most each month, each year, etc. The idea will be to help the user discover possible patterns within their psyche based upon their pulls.

The app will also have a basic social feature that allows you to follow other users and choose to share your data with them. Each user will also have a badge that shows their most pulled card overall.

We will start with a free version that allows you to keep track of your Tarot card pulls but only for 60 days. The premium version will be a subscription service for $8/month that will have no limit to the length of time the Tarot card pull data is stored. Each version both Free and Premium will allow for saving this data to a CSV file.

## Product Requirements Document
1.  **Introduction**
    *   **Project Name:** ChronoArcana
    *   **Document Type:** Product Requirements Document (PRD)
    *   **Purpose:** This document outlines the comprehensive requirements, goals, features, and technical specifications for ChronoArcana, a web application designed to enhance the daily Tarot card pulling practice.
    *   **Vision:** To create an intuitive, aesthetically pleasing platform that empowers users to deepen their self-understanding through consistent Tarot engagement and data-driven insights into their personal psyche.

2.  **Goals & Objectives**
    *   **Primary Goal:** To provide a central, digital hub for users to perform daily Tarot card pulls, record reflections, and track their practice over time.
    *   **Secondary Goals:**
        *   Enable users to discover recurring patterns and insights within their psyche by visualizing their historical Tarot pull data.
        *   Offer both digital and physical card recording options to cater to diverse user preferences.
        *   Establish a sustainable business model through a clear freemium strategy, encouraging long-term engagement.
        *   Deliver a visually distinct and user-friendly experience consistent with the "Gothic but dreamy" aesthetic.

3.  **Target Audience & Needs**
    *   **Audience:** Individuals who currently practice daily Tarot card pulls (physically) or are interested in starting this practice.
    *   **Needs Addressed:**
        *   **Centralized Tracking:** Provides a single, easily accessible location to perform and record daily Tarot pulls, eliminating the need for physical journaling or scattered notes.
        *   **Enhanced Practice:** Offers a structured way to engage with the Tarot daily, making the process more consistent and insightful.
        *   **Self-Discovery:** Through data visualization and historical tracking, users can identify trends and patterns in their card pulls, offering unique insights into their moods, subconscious, and overall psychological landscape.
        *   **Accessibility:** Allows users to access their practice and data from any web-enabled device.

4.  **User Stories (MVP Focus)**
    *   **User Acquisition & Onboarding:**
        *   As a new user, I want to see a clear landing page describing ChronoArcana so I can understand what the product offers.
        *   As a new user, I want to be able to easily sign up for an account to start using the application.
    *   **Daily Tarot Pull & Recording:**
        *   As a user, I want to navigate to my profile dashboard to access the daily pull functionality.
        *   As a user, I want to click a "Digital Pull" button to have a random Tarot card displayed for my day.
        *   As a user, I want to manually select a card if I've pulled it physically so that the app displays the correct card.
        *   As a user, I want to see the image of the pulled card clearly displayed.
        *   As a user, I want to write and save personal notes alongside my daily card pull to record my immediate thoughts and interpretations.
        *   As a user, I want to choose between the Thoth Deck and the Rider Waite Deck as my primary deck for pulls and viewing card meanings.
    *   **Historical Tracking & Insights:**
        *   As a user, I want to view my last 30 days' Tarot card pulls on my dashboard for a quick overview.
        *   As a user, I want to click on any past daily pull entry to see the card image, my specific notes for that day, and the detailed card meanings and symbol associations.
        *   As a user, I want to see visual graphs (bar or pie) that show which Tarot cards I've pulled most frequently over various periods (e.g., month, year, overall) to identify patterns.
        *   As a user, I want to customize the colors of my data visualization graphs to personalize my experience.
    *   **Data Management & Monetization:**
        *   As a free user, I want my Tarot card pull data to be stored for a limited period (60 days).
        *   As a premium user, I want my Tarot card pull data to be stored indefinitely without any time limits.
        *   As a user (free or premium), I want to be able to export all my stored Tarot card pull data to a CSV file for personal record-keeping.

5.  **Features & Functionality**
    *   **Landing Page:**
        *   Description of ChronoArcana's core value proposition.
        *   Clear call-to-action for signup.
    *   **User Authentication & Profiles:**
        *   User registration and login.
        *   Profile Dashboard: Central hub for all user activities and data.
    *   **Daily Tarot Pull System:**
        *   **Digital Pull:** A button that, when pressed, triggers a random selection algorithm to choose and display one card from the user's chosen deck.
        *   **Physical Pull:** An interface allowing the user to browse and manually select a specific card from their chosen deck to record.
        *   **Card Display:** High-resolution display of the chosen Tarot card image.
        *   **Daily Notes:** A text input field adjacent to the daily card display for users to write and save notes specific to that day's pull.
    *   **Historical Tracking & Detail View:**
        *   **Recent Pulls Display:** A section on the dashboard showing the last 30 days of Tarot card pulls, ordered chronologically.
        *   **Clickable Entries:** Each day's entry is clickable to navigate to a detailed view.
        *   **Daily Detail Page:** Displays the card image, the user's saved notes for that day, and comprehensive static meanings and symbol associations for the specific card pulled.
    *   **Data Visualization & Insights:**
        *   **Graphing Functionality:** System to generate graphs (bar or pie chart, user selectable) showing the frequency of specific cards pulled over user-defined periods (e.g., monthly, yearly, all-time).
        *   **Customization:** Users can select their preferred graph type and choose colors for the graph elements.
        *   **Insight Generation:** Data aims to help users identify potential patterns related to their mood, recurring themes, or subconscious influences.
    *   **Deck Management:**
        *   **Deck Selection:** Users can choose between the Thoth Deck and the Rider Waite Deck as their primary deck for pulls and associated meanings. Static content for both decks will be pre-loaded.
    *   **Data Export:**
        *   **CSV Export:** Functionality to export all stored Tarot card pull data (card, date, notes, etc.) into a downloadable CSV file. Available for both Free and Premium users.

6.  **User Interface (UI) / User Experience (UX) Requirements**
    *   **Aesthetic Vision:** Gothic but dreamy vibe, evoking a sense of mysticism and introspection.
    *   **Color Scheme:** Dark mode is mandatory and will be the default/only theme.
    *   **Design Flow:** Modern and intuitive, ensuring ease of navigation and a seamless user journey from pull to reflection to insights.
    *   **Responsiveness:** The web application must be fully responsive, providing an optimal experience across various devices (desktop, tablet, mobile).

7.  **Technical Specifications**
    *   **Platform:** Web Application (SPA - Single Page Application).
    *   **Hosting:** Vercel.
    *   **Backend:** Node.js.
    *   **Database:** Supabase.
    *   **Payment Gateway:** Stripe for handling premium subscriptions.
    *   **Card Content:** Tarot card images, meanings, and symbol associations for the Thoth Deck and Rider Waite Deck will be static data assets.
    *   **Security:** Adherence to best practices for web application security, leveraging the built-in security features of Vercel, Node.js, and Supabase. Data encryption for sensitive information at rest and in transit.

8.  **Monetization Strategy**
    *   **Freemium Model:**
        *   **Free Version:** Allows users to track their Tarot card pulls, but data retention is limited to the last 60 days. All core features (pulls, notes, basic insights, CSV export) are available within this 60-day window.
        *   **Premium Version:** Subscription-based service priced at $8/month. Offers unlimited storage duration for all Tarot card pull data, ensuring users never lose their historical insights. Includes all free features plus unlimited data retention.
    *   **Upgrade Encouragement:** The primary mechanism for encouraging upgrades will be through highlighting the limited data retention of the free version. Users will receive prompts or notifications as their data approaches the 60-day limit, emphasizing the value of indefinite storage provided by Premium.
    *   **Future Monetization Expansion:** Tarot deck customization options (e.g., custom card backs, unique themes for the app) will be explored as potential future premium features to further incentivize subscriptions.

9.  **Scope & Phased Rollout**
    *   **MVP (Minimum Viable Product) - Target Timeline: 3 Months**
        *   **Core Functionality:**
            *   Landing page with product description and signup.
            *   User registration, login, and profile dashboard.
            *   Digital and Physical Tarot card pull mechanisms.
            *   Display of pulled card with basic image.
            *   Text input for daily note-taking.
            *   Display of last 30 days' pulls on dashboard.
            *   Detailed view for past pulls (card, user notes, static card meanings).
            *   Data visualization: Bar and Pie graphs for most pulled cards (monthly/yearly/overall) with user-selectable colors.
            *   Ability to choose between Thoth and Rider Waite decks.
            *   CSV data export functionality.
            *   Free version (60-day data retention).
            *   Premium subscription integration via Stripe ($8/month, unlimited data retention).
        *   **UI/UX:** Adherence to "Gothic but dreamy" aesthetic, dark mode, modern and intuitive flow, and responsiveness.
    *   **Future Considerations (Post-MVP)**
        *   **Social Features:**
            *   User following functionality.
            *   Option to share specific data with followers (entire history, overall stats, daily pulls – **daily notes will NEVER be shared**).
            *   Public feeds for shared content.
            *   Commenting on shared pulls.
            *   User badges displaying their most pulled card overall.
        *   **Monetization Expansion:** Introduction of Tarot deck customization options (e.g., custom card backs, app themes) as premium features.
        *   **Performance & Scalability:** Ongoing monitoring and optimization of application performance and database scalability to support a growing user base.

10. **Success Metrics**
    *   Number of new user sign-ups.
    *   Daily Active Users (DAU) and Monthly Active Users (MAU).
    *   User retention rate, particularly beyond the 60-day free trial period.
    *   Conversion rate from Free to Premium subscriptions.
    *   Frequency of daily card pulls and note-taking engagement.
    *   Usage of data visualization features.
    *   Positive user feedback and reviews.

## Technology Stack
TECHSTACK: ChronoArcana

1. Overview
    This document outlines the recommended technology stack for ChronoArcana, a web application designed to track Tarot card pulls. The goal is to build a robust, scalable, and intuitive platform with a "Gothic but dreamy" aesthetic, delivering an MVP within three months.

2. Core Application Stack

*   Frontend Framework: Next.js (React)
    *   Justification:
        *   Performance & User Experience: Next.js provides server-side rendering (SSR) and static site generation (SSG) capabilities, enhancing initial load times and overall performance, critical for a modern and intuitive user interface.
        *   Developer Experience: Built on React, it offers a robust component-based architecture for building complex and interactive UIs, such as the profile dashboard, data visualizations, and daily pull pages. The extensive ecosystem and strong community support accelerate development.
        *   Routing & API Routes: Its integrated file-system-based routing simplifies navigation, and API routes can be used for minor backend logic or proxying requests, optimizing the frontend's interaction with the primary backend.
        *   Design Alignment: Compatible with various styling approaches (e.g., Tailwind CSS), enabling the implementation of the desired "Gothic but dreamy" aesthetic and mandatory dark mode.

*   Backend Runtime & Framework: Node.js with Express.js
    *   Justification:
        *   Security Alignment: Node.js is explicitly chosen for security considerations. It is highly performant and scalable for building RESTful APIs to manage user profiles, store card pull data, handle notes, and process social features.
        *   Efficiency: Node.js's asynchronous, event-driven architecture handles many concurrent connections efficiently, which is ideal for a web application with dynamic data interactions.
        *   Unified Language: Using JavaScript/TypeScript across both frontend and backend streamlines development, reduces context switching for developers, and leverages a consistent skill set.
        *   Flexibility: Express.js provides a minimalistic yet powerful foundation for creating the necessary APIs for user management, card pull logic, and data analysis.

*   Database: Supabase (PostgreSQL)
    *   Justification:
        *   Security Alignment: Supabase is explicitly chosen for security considerations. It provides a powerful and reliable PostgreSQL relational database, ensuring data integrity for critical information like user profiles, daily card pull histories, and social connections.
        *   Rapid Development: As a "Backend-as-a-Service" (BaaS), Supabase significantly accelerates development for the MVP. It offers auto-generated APIs (REST and GraphQL) and real-time subscriptions, simplifying data interaction and allowing developers to focus on core features.
        *   Integrated Features: Built-in Supabase Auth simplifies user authentication and management, while Supabase Storage is available for future features like custom Tarot deck image uploads.
        *   Scalability: PostgreSQL is a battle-tested and highly scalable database system, capable of handling a growing number of users and their historical data effectively.

3. Infrastructure & Services

*   Hosting & Deployment: Vercel
    *   Justification:
        *   Security Alignment: Vercel is explicitly chosen for security considerations. It is highly optimized for Next.js applications, offering zero-configuration deployments, a global CDN for fast content delivery, and automatic scaling.
        *   Developer Workflow: Its seamless Git integration (e.g., with GitHub) enables continuous deployment (CD), ensuring an efficient and automated development and release cycle.
        *   Performance: Vercel's edge network ensures low latency and fast content delivery to users worldwide, contributing to a responsive and intuitive user experience.

*   Payment Gateway: Stripe
    *   Justification:
        *   Monetization Strategy: Stripe is explicitly chosen for handling all payment processing, including the monthly subscriptions for the premium version and future monetization avenues such as Tarot deck customization.
        *   Robust & Secure: As an industry-leading platform, Stripe provides comprehensive APIs for securely managing subscriptions, processing payments, and handling customer data, ensuring PCI compliance.
        *   Developer-Friendly: Extensive documentation, client libraries, and SDKs facilitate straightforward integration with the web application for both frontend and backend payment flows.

4. Key Libraries & Tools

*   Authentication Management: Supabase Auth
    *   Justification: Directly integrated with the Supabase database, it provides a secure and comprehensive solution for user registration, login (email/password), session management, and fine-grained access control through Row-Level Security (RLS).

*   Styling: Tailwind CSS
    *   Justification:
        *   Rapid UI Development: As a utility-first CSS framework, Tailwind CSS allows for quickly building custom designs directly in markup, aligning with the "modern and intuitive" design goal and enabling rapid iteration.
        *   Design Flexibility: Highly customizable to achieve the specific "Gothic but dreamy" aesthetic and ensures easy and efficient implementation of the mandatory dark mode across the application.
        *   Consistency: Promotes consistent design patterns and simplifies the creation of responsive layouts across various screen sizes.

*   Data Visualization: Chart.js (with `react-chartjs-2` wrapper for React)
    *   Justification:
        *   Feature Alignment: Supports the creation of common chart types like bar graphs and pie graphs, directly fulfilling the requirement for displaying user data patterns over time.
        *   Customization: Offers ample options for customizing chart appearance, including colors, allowing users to personalize their data visualizations as specified.
        *   Ease of Use: Relatively simple to integrate and use within a React/Next.js environment, accelerating the development of the MVP's data feedback features within the dashboard.

*   CSV Export: Client-side CSV generation library (e.g., Papaparse or similar utility)
    *   Justification: Essential for enabling users (both free and premium) to export their Tarot card pull data to CSV files. Performing this client-side minimizes server load and provides an immediate download experience.

*   Random Card Selection: JavaScript's `Math.random()`
    *   Justification: Sufficient for generating a random card selection from the static Tarot decks. For non-cryptographic randomness, this built-in function is simple, efficient, and widely supported.

5. Static Content Management

*   Tarot Card Content: JSON files or direct database entries (static content)
    *   Justification: As specified, the Tarot card meanings and symbol associations for both the Thoth Deck and Rider Waite Deck will be primarily static. Storing this content as JSON files within the application's codebase or dedicated static entries in Supabase simplifies initial development and deployment, avoiding the need for a complex content management system for the MVP.

6. Development Environment & Practices

*   Integrated Development Environment (IDE): VS Code
*   Package Manager: npm / Yarn
*   Code Quality: ESLint & Prettier
    *   Justification: These tools enforce code consistency, improve readability, and help catch potential errors early in the development cycle, contributing to maintainable and high-quality code.
*   Version Control: Git (with GitHub/GitLab/Bitbucket)
    *   Justification: Standard for collaborative software development, enabling robust code management, version tracking, and seamless team collaboration.

This technology stack has been carefully chosen to meet ChronoArcana's functional requirements, design vision, security mandates, and aggressive MVP timeline, while also providing a solid foundation for future scalability and feature expansion.

## Project Structure
PROJECTSTRUCTURE

This document outlines the file and folder organization for the "ChronoArcana" project, providing a detailed map of the codebase. The structure promotes separation of concerns, maintainability, and scalability, aligning with the project's web application nature, Node.js backend for specific tasks, Supabase database, and Vercel deployment.

```
/
├── .env                  # Environment variables for local development
├── .gitignore            # Specifies intentionally untracked files to ignore
├── package.json          # Top-level project metadata and scripts (e.g., for workspaces or shared dev dependencies)
├── README.md             # General project overview and setup instructions
├── vercel.json           # Vercel deployment configuration
│
├── client/               # Frontend application (React.js)
│   ├── public/           # Static assets served directly by the web server
│   │   ├── index.html        # Main HTML file
│   │   ├── manifest.json     # Web App Manifest for PWA features
│   │   └── assets/           # Unprocessed static assets
│   │       ├── icons/            # Favicons, app icons
│   │       └── tarot_decks/      # Static image assets for Tarot decks
│   │           ├── rider_waite/    # Rider Waite deck card images (e.g., 00_the_fool.png)
│   │           └── thoth/          # Thoth deck card images (e.g., 00_the_fool.png)
│   │
│   ├── src/              # Main source code for the React application
│   │   ├── App.jsx             # Root component of the application
│   │   ├── main.jsx            # Entry point for React DOM rendering
│   │   ├── index.css           # Global CSS styles (e.g., Tailwind CSS base styles, custom fonts)
│   │   ├── assets/             # Processed or component-specific assets
│   │   │   ├── images/           # UI-specific images (e.g., background textures for Gothic vibe)
│   │   │   ├── fonts/            # Custom font files for "Gothic but dreamy" aesthetic
│   │   │   └── svg/              # SVG icons used in components
│   │   │
│   │   ├── components/         # Reusable UI components
│   │   │   ├── auth/             # Components related to user authentication
│   │   │   │   ├── LoginForm.jsx     # Handles user login
│   │   │   │   └── SignupForm.jsx    # Handles user registration
│   │   │   ├── common/           # Generic, widely used UI components
│   │   │   │   ├── Button.jsx        # Styled button component
│   │   │   │   ├── Modal.jsx         # Reusable modal dialog
│   │   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   │   └── Spinner.jsx       # Loading indicator
│   │   │   ├── dashboard/        # Components specific to the user dashboard
│   │   │   │   ├── DailyPullSection.jsx  # Section for today's pull button and display
│   │   │   │   ├── RecentPullsList.jsx   # Displays the last 30 days of pulls
│   │   │   │   ├── DataVisualization.jsx # Displays graph data (bar/pie charts with color options)
│   │   │   │   ├── ProfileBadge.jsx      # Displays the user's most pulled card badge
│   │   │   │   └── UpgradePrompt.jsx     # Encourages free users to upgrade
│   │   │   ├── daily_pull/       # Components for the daily tarot pull experience
│   │   │   │   ├── CardDisplay.jsx       # Displays the pulled tarot card image and basic details
│   │   │   │   ├── NoteEditor.jsx        # Text area for user notes
│   │   │   │   ├── DigitalPullButton.jsx # Button for digital card pull
│   │   │   │   └── PhysicalCardSelector.jsx # UI for manually selecting a card
│   │   │   ├── tarot/            # Components related to tarot card content and deck selection
│   │   │   │   ├── TarotCardDetails.jsx  # Displays detailed card meanings and associations
│   │   │   │   └── DeckSelector.jsx      # Component to allow users to choose their main deck
│   │   │   ├── social/           # (Future Scope - not part of MVP) Components for social features
│   │   │   │   ├── FollowButton.jsx      # Button to follow other users
│   │   │   │   └── SharedPullCard.jsx    # Displays a shared tarot pull
│   │   │   │
│   │   │   └── subscription/     # Components for managing subscriptions
│   │   │       ├── PricingCard.jsx       # Displays pricing plans
│   │   │       └── SubscriptionManager.jsx # Handles upgrade/cancellation flow
│   │   │
│   │   ├── pages/              # Top-level components representing distinct application pages
│   │   │   ├── LandingPage.jsx       # Public landing page with product description and signup
│   │   │   ├── AuthPage.jsx          # Container for login/signup forms
│   │   │   ├── DashboardPage.jsx     # User's main profile dashboard
│   │   │   ├── DailyPullPage.jsx     # Page where users perform and record daily pulls
│   │   │   ├── PullDetailPage.jsx    # Displays detailed view of a specific historical pull
│   │   │   ├── ProfileSettingsPage.jsx # User profile and account settings
│   │   │   └── UpgradePage.jsx       # Page dedicated to managing subscription upgrades
│   │   │
│   │   ├── contexts/           # React Context API for global state management
│   │   │   ├── AuthContext.jsx       # Manages user authentication state
│   │   │   ├── ThemeContext.jsx      # Manages dark/light mode toggle (for flexibility, dark is default)
│   │   │   └── UserSettingsContext.jsx # Manages user-specific settings (e.g., preferred deck, graph colors)
│   │   │
│   │   ├── hooks/              # Custom React hooks for reusable logic
│   │   │   ├── useAuth.js            # Hook for authentication-related actions and state
│   │   │   ├── useTarotPulls.js      # Hook for fetching and managing tarot pull data
│   │   │   └── useGraphData.js       # Hook for fetching and processing data for visualizations
│   │   │
│   │   ├── lib/                # Client-side utility functions and third-party service integrations
│   │   │   ├── supabaseClient.js     # Initializes and configures the Supabase client
│   │   │   ├── api.js              # Abstraction layer for interacting with the Supabase database and Edge Functions
│   │   │   └── stripe.js           # Initializes Stripe.js for frontend payment processing
│   │   │
│   │   ├── styles/             # Dedicated directory for CSS/SCSS files
│   │   │   ├── tailwind.css        # If using Tailwind CSS, this imports base, components, and utility layers
│   │   │   ├── base.css            # Global styles (resets, typography, color variables for dark mode)
│   │   │   ├── components.css      # Styles for specific components or design patterns
│   │   │   └── utilities.css       # Custom utility classes if needed
│   │   │
│   │   ├── utils/              # General utility functions
│   │   │   ├── constants.js        # Defines static data like tarot card meanings, associations (Thoth/Rider Waite)
│   │   │   ├── helpers.js          # Generic helper functions (e.g., date formatting, random card selection)
│   │   │   └── validation.js       # Client-side input validation
│   │   │
│   │   └── router/             # Configuration for client-side routing
│   │       └── index.jsx           # Sets up React Router paths and components
│   │
│   └── package.json        # Frontend specific dependencies and scripts
│
├── server/               # Backend application (Node.js/Express.js) - primarily for Stripe webhooks
│   ├── src/              # Main source code for the Node.js server
│   │   ├── index.js            # Main entry point for the server application
│   │   ├── config/             # Server-side configuration
│   │   │   └── index.js          # Loads environment variables and application settings
│   │   ├── controllers/        # Handles incoming requests and orchestrates responses
│   │   │   └── stripeController.js # Logic for processing Stripe webhook events
│   │   ├── middleware/         # Express middleware functions
│   │   │   └── authMiddleware.js # (If custom authentication beyond Supabase JWT is needed)
│   │   ├── routes/             # Defines API routes
│   │   │   └── webhookRoutes.js    # Defines endpoint for Stripe webhooks
│   │   └── services/           # Business logic, interacts with external APIs/databases
│   │       └── stripeService.js    # Encapsulates Stripe API calls
│   │
│   ├── package.json        # Backend specific dependencies and scripts
│   └── .env                # Environment variables specific to the backend (e.g., Stripe secret key)
│
├── supabase/             # Supabase database configurations, migrations, and functions
│   ├── migrations/       # SQL files defining database schema changes
│   │   ├── YYYYMMDDHHMMSS_initial_schema.sql  # Initial setup of tables (users, tarot_pulls, notes, etc.)
│   │   └── YYYYMMDDHHMMSS_add_pro_features.sql # Schema changes for premium features (e.g., unlimited history)
│   │   └── ...
│   ├── functions/        # Directory for Supabase Edge Functions (serverless functions)
│   │   ├── public/         # Functions that can be called directly via RPC
│   │   │   └── rpc_get_monthly_pull_counts.sql # Example SQL function for fetching aggregated data for graphs
│   │   └── storage/        # Storage buckets configuration (if any specific to Supabase functions)
│   │       └── ...
│   └── config.toml       # Supabase CLI configuration
│
├── docs/                 # Project documentation files
│   ├── README.md             # General project overview
│   ├── ARCHITECTURE.md       # High-level system architecture
│   ├── API_REFERENCE.md      # Detailed API endpoint documentation
│   ├── DESIGN_GUIDELINES.md  # Documenting UI/UX design principles and assets (Gothic/dreamy, dark mode)
│   └── PROJECT_STRUCTURE.md  # This document
│
├── scripts/              # Utility scripts for development, deployment, or database management
│   ├── setup_db.sh           # Script to set up the local Supabase environment (if applicable)
│   ├── seed_data.js          # Script to populate the database with initial static data (e.g., card definitions)
│   └── deploy.sh             # Script for automating deployment steps
│
└── shared/               # Contains code, types, and constants shared between client, server, or Supabase functions
    ├── types/            # TypeScript type definitions
    │   └── index.d.ts        # Interfaces for database models, API responses, etc.
    ├── constants/        # Global application constants
    │   └── appConstants.js   # Defines values like FREE_TRIAL_DAYS, PREMIUM_PRICE, DECK_NAMES
    └── enums/            # Enumerations used throughout the application
        └── TarotEnums.js     # Defines enums for card suits, ranks, etc.
```

### Explanations of Key Directories and Files:

*   **Root Level (`/`)**: Contains essential project configuration files that apply to the entire repository.
*   **`client/`**: This directory encapsulates the entire frontend application. It's built with React and designed for deployment on Vercel.
    *   `public/`: Stores assets that are directly served by the web server without processing, such as the main HTML file and raw images for Tarot decks. The Tarot card images are considered "static for now" as per requirements.
    *   `src/`: Contains the core logic and components of the React application. It follows a modular structure, separating concerns into `components`, `pages`, `contexts`, `hooks`, `lib`, `styles`, and `utils`.
        *   `components/`: Houses all reusable UI components, categorized by their domain (e.g., `auth`, `dashboard`, `daily_pull`). This includes specific components for the "Gothic but dreamy" UI, data visualizations (bar/pie graphs), and upgrade prompts. Social features are placed here but marked as "Future Scope" in line with MVP priorities.
        *   `pages/`: Defines the top-level views/pages of the application, representing distinct user interfaces.
        *   `contexts/`: Manages global application state using React's Context API, including authentication, theme (dark mode is a must), and user settings.
        *   `hooks/`: Provides custom React hooks for encapsulating reusable stateful logic related to data fetching, authentication, and data manipulation for graphs.
        *   `lib/`: Integrates third-party libraries and services like Supabase and Stripe. `api.js` acts as an abstraction layer for interacting with Supabase, simplifying data operations.
        *   `styles/`: Dedicated to styling files, allowing for a structured approach to implementing the "Gothic but dreamy" dark mode aesthetic.
        *   `utils/`: Contains general utility functions and `constants.js` which holds the static Tarot card content (meanings, associations for Thoth and Rider Waite decks).
*   **`server/`**: This directory holds the Node.js backend logic. Given Supabase handles much of the database interaction, this server primarily focuses on external service integrations like Stripe webhooks, which require a dedicated endpoint for security and processing.
    *   `src/`: Contains the server's main application logic, including controllers for handling requests (e.g., Stripe events), middleware for request processing, and services for interacting with external APIs.
*   **`supabase/`**: Manages all database-related assets for Supabase.
    *   `migrations/`: Stores versioned SQL scripts for evolving the database schema, including initial setup and changes for premium features (unlimited data storage).
    *   `functions/`: Contains Supabase Edge Functions, which can host serverless logic (e.g., custom RPC functions for data aggregation for graphs).
*   **`docs/`**: A central repository for all project documentation, ensuring clear communication of architecture, APIs, design guidelines, and project structure.
*   **`scripts/`**: Houses various utility scripts to automate development, testing, deployment, and database setup tasks.
*   **`shared/`**: Contains code, types, and constants that are universally applicable across different parts of the application (client, server, Supabase functions), promoting code consistency and reducing duplication. This includes shared types for data models and application-wide constants like monetization details and trial limits.

## Database Schema Design
SCHEMADESIGN

This section outlines the database schema design for ChronoArcana, detailing the data models, relationships, and overall database structure. The chosen database technology is PostgreSQL, accessed via Supabase.

**1. `users` Table**
*   **Purpose:** Stores core user profile information and links to the Supabase authentication system.
*   **Columns:**
    *   `id` (UUID, Primary Key):
        *   Unique identifier for the user.
        *   References `auth.users.id` for authentication linkage.
    *   `username` (VARCHAR(50), NOT NULL, UNIQUE):
        *   The user's chosen display name.
    *   `email` (VARCHAR(255), NOT NULL, UNIQUE):
        *   User's email address (for convenience, also in `auth.users`).
    *   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp when the user account was created.
    *   `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp of the last update to the user's profile.
    *   `subscription_status` (ENUM('free', 'premium'), DEFAULT 'free', NOT NULL):
        *   Current subscription level (free or premium).
    *   `premium_start_date` (DATE, NULL):
        *   Date when a premium subscription commenced, if applicable.
    *   `chosen_deck_id` (INT, NULL, References `tarot_decks.id`):
        *   The ID of the user's preferred default Tarot deck.
    *   `most_pulled_card_id` (INT, NULL, References `tarot_cards.id`):
        *   The ID of the Tarot card most frequently pulled by the user overall (for the badge feature).
    *   `last_login` (TIMESTAMP WITH TIME ZONE, NULL):
        *   Timestamp of the user's last login session.

**2. `tarot_decks` Table**
*   **Purpose:** Stores static information about the available Tarot decks that users can choose from.
*   **Columns:**
    *   `id` (INT, Primary Key):
        *   Unique identifier for the Tarot deck.
    *   `name` (VARCHAR(100), NOT NULL, UNIQUE):
        *   The full name of the deck (e.g., "Rider Waite Deck", "Thoth Deck").
    *   `description` (TEXT, NULL):
        *   A brief description or background of the deck.
    *   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp when the deck record was added.

**3. `tarot_cards` Table**
*   **Purpose:** Stores static, detailed information for each individual Tarot card within specific decks.
*   **Columns:**
    *   `id` (INT, Primary Key):
        *   Unique identifier for the specific card entry across all decks.
    *   `deck_id` (INT, NOT NULL, References `tarot_decks.id`):
        *   Foreign key linking to the `tarot_decks` table, specifying which deck the card belongs to.
    *   `card_name` (VARCHAR(100), NOT NULL):
        *   The name of the Tarot card (e.g., "The Fool", "The Magician").
    *   `card_number` (INT, NULL):
        *   The numerical position or identifier of the card within its deck.
    *   `suit` (VARCHAR(50), NULL):
        *   The suit of the card (e.g., "Major Arcana", "Wands", "Cups", "Swords", "Pentacles").
    *   `upright_meaning` (TEXT, NOT NULL):
        *   Detailed meaning when the card appears in its upright orientation.
    *   `reversed_meaning` (TEXT, NULL):
        *   Detailed meaning when the card appears in its reversed orientation.
    *   `symbol_associations` (TEXT, NULL):
        *   A description of key symbols depicted on the card and their associations.
    *   `keywords` (VARCHAR(500), NULL):
        *   A comma-separated list of keywords associated with the card.
    *   `image_url` (VARCHAR(255), NULL):
        *   URL to the static image of the card.
    *   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp when the card record was added.
*   **Unique Constraint:** `(deck_id, card_name)` - Ensures each card name is unique within a specific deck.

**4. `daily_pulls` Table**
*   **Purpose:** Stores each instance of a user's daily Tarot card pull, including associated notes and details.
*   **Columns:**
    *   `id` (UUID, Primary Key, DEFAULT GEN_RAND_UUID()):
        *   Unique identifier for each individual card pull record.
    *   `user_id` (UUID, NOT NULL, References `users.id`):
        *   Foreign key linking to the user who performed this pull.
    *   `card_id` (INT, NOT NULL, References `tarot_cards.id`):
        *   Foreign key linking to the specific Tarot card that was pulled.
    *   `pull_date` (DATE, NOT NULL):
        *   The calendar date on which the card was pulled.
    *   `pull_type` (ENUM('digital', 'physical'), NOT NULL):
        *   Indicates whether the card was chosen digitally (randomly) or physically (manually).
    *   `notes` (TEXT, NULL):
        *   User's personal notes or reflections for this specific daily pull.
    *   `is_reversed` (BOOLEAN, DEFAULT FALSE, NOT NULL):
        *   A flag indicating if the card was pulled in its reversed orientation.
    *   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp when the pull record was created.
    *   `updated_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp of the last modification to the pull's notes.
*   **Unique Constraint:** `(user_id, pull_date)` - Ensures a user can only record one pull per day.
*   **Indexing:** Indices on `user_id` and `pull_date` for efficient retrieval of historical pulls (e.g., last 30 days) and for data visualization queries.

**Future Scope Tables (Social Features):**
These tables are planned for future implementation based on the project's roadmap.

**5. `follows` Table**
*   **Purpose:** Manages the follower-following relationships between users.
*   **Columns:**
    *   `follower_id` (UUID, Primary Key, References `users.id`):
        *   The ID of the user who is initiating the follow.
    *   `followed_id` (UUID, Primary Key, References `users.id`):
        *   The ID of the user being followed.
    *   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp when the follow relationship was established.
*   **Composite Primary Key:** `(follower_id, followed_id)` - Ensures a unique follow relationship.

**6. `shared_data_permissions` Table**
*   **Purpose:** Controls the granular data sharing permissions between users.
*   **Columns:**
    *   `id` (UUID, Primary Key, DEFAULT GEN_RAND_UUID()):
        *   Unique identifier for the permission record.
    *   `user_id` (UUID, NOT NULL, References `users.id`):
        *   The ID of the user granting the permission.
    *   `shared_with_user_id` (UUID, NOT NULL, References `users.id`):
        *   The ID of the user receiving the shared data.
    *   `permission_type` (ENUM('entire_history', 'overall_stats', 'daily_pulls_no_notes'), NOT NULL):
        *   Specifies the type of data being shared.
        *   'daily_pulls_no_notes' explicitly excludes sensitive daily notes.
    *   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp when the permission was granted.
*   **Unique Constraint:** `(user_id, shared_with_user_id, permission_type)` - Prevents duplicate permission entries for the same users and type.

**7. `comments` Table**
*   **Purpose:** Stores comments made by users on shared daily pull entries.
*   **Columns:**
    *   `id` (UUID, Primary Key, DEFAULT GEN_RAND_UUID()):
        *   Unique identifier for each comment.
    *   `pull_id` (UUID, NOT NULL, References `daily_pulls.id`):
        *   The foreign key to the `daily_pulls` entry being commented on.
    *   `user_id` (UUID, NOT NULL, References `users.id`):
        *   The foreign key to the user who authored the comment.
    *   `comment_text` (TEXT, NOT NULL):
        *   The content of the comment.
    *   `created_at` (TIMESTAMP WITH TIME ZONE, DEFAULT NOW()):
        *   Timestamp when the comment was created.

**Key Implementation Considerations:**

*   **Row Level Security (RLS):**
    *   Crucial for ensuring data privacy and security, especially for `users`, `daily_pulls`, `follows`, `shared_data_permissions`, and `comments` tables.
    *   RLS policies will ensure users can only access their own data unless explicitly shared through `shared_data_permissions`.
    *   Daily notes in `daily_pulls` will have RLS policies strictly preventing their exposure even when daily pulls are shared.
*   **Data Retention for Free Tier:**
    *   A scheduled Supabase function or external cron job will be implemented to automatically delete `daily_pulls` records older than 60 days for users with `subscription_status = 'free'`.
*   **Static Data Population:**
    *   The `tarot_decks` and `tarot_cards` tables will be pre-populated with the static content for the Thoth and Rider Waite decks upon database initialization.
*   **Data Visualization:**
    *   Aggregated data for graphs (most pulled cards by month/year) will be generated via real-time queries against the `daily_pulls` table. No dedicated tables are required for storing pre-calculated analytics for MVP.
*   **Scalability & Performance:**
    *   Appropriate indexing on foreign keys and frequently queried columns will be applied to ensure optimal query performance, especially for historical data retrieval.
    *   Pagination will be implemented for listing historical pulls to manage large datasets efficiently.

## User Flow
USERFLOW

1. User Onboarding & First-Time Experience

   1.1. Landing Page (Entry Point)
      *   **Wireframe Description:** The landing page presents a "Gothic but dreamy" visual theme with a predominant dark mode color palette. A prominent hero section features the product name "ChronoArcana" and a concise tagline describing its purpose (e.g., "Unveil Your Daily Insights"). Below this, a brief product description highlights key features: digital/physical pulls, historical tracking, and pattern analysis. Call-to-action (CTA) buttons for \"Sign Up\" and \"Login\" are clearly visible, positioned centrally or prominently within the hero section.
      *   **User Journey:**
          1.  User navigates to ChronoArcana URL.
          2.  User lands on the landing page, reads product overview.
          3.  **Interaction:** User clicks \"Sign Up\" to create a new account or \"Login\" if they are a returning user.

   1.2. Sign Up / Log In
      *   **Wireframe Description:** Standard authentication forms. The \"Sign Up\" form requires email, password, and password confirmation. The \"Login\" form requires email and password. Both pages maintain the dark mode and thematic visual elements. Options for password recovery (e.g., \"Forgot Password?\") are available.
      *   **User Journey (Sign Up):**
          1.  User clicks \"Sign Up\" from landing page.
          2.  User fills out registration form fields.
          3.  **Interaction:** User clicks \"Create Account\" button.
          4.  System processes registration; user is then directed to the Initial Deck Selection.
      *   **User Journey (Login):**
          1.  User clicks \"Login\" from landing page.
          2.  User enters credentials.
          3.  **Interaction:** User clicks \"Login\" button.
          4.  System authenticates; user is directed to their Profile Dashboard.

   1.3. Initial Deck Selection (First-Time User Only)
      *   **Wireframe Description:** A full-screen modal or dedicated page displayed only upon a user's first successful sign-up or login. It presents two large, visually distinct options for Tarot decks: \"Thoth Deck\" and \"Rider Waite Deck\". Each option has a clear label and perhaps a small illustrative image. A descriptive text explains that this will be their primary deck for pulls. A \"Confirm Selection\" button becomes active once a choice is made.
      *   **User Journey:**
          1.  After successful sign-up, user is presented with deck selection.
          2.  User reviews the two deck options.
          3.  **Interaction:** User clicks on their preferred deck (e.g., \"Rider Waite Deck\"). The selected option visually highlights.
          4.  **Interaction:** User clicks \"Confirm Selection\" button.
          5.  System saves the user's primary deck preference.
          6.  User is then directed to their Profile Dashboard.

2. Daily Card Pull Journey

   2.1. Profile Dashboard (Core User Hub)
      *   **Wireframe Description:** The central hub of the application. The dark mode interface is clean and intuitive. Dominating the upper section is a prominently displayed area for the *current day's* card, if pulled, or a prompt to pull a card. Below this, two distinct buttons: \"Digital Card Pull\" and \"Physical Card Pull\". A section titled \"Past 30 Days\" displays a scrollable list or grid of previous pull dates, each clickable. \"Analytics\" and \"Export Data (CSV)\" buttons are easily accessible. A \"Most Pulled Card\" badge is visually integrated, displaying the user's overall most frequent card. For Free users, a subtle prompt or progress bar might indicate the 60-day data limit and encourage upgrade.
      *   **User Journey:**
          1.  User logs in and lands on the Profile Dashboard.
          2.  User reviews their latest pull or sees the option to pull for the day.
          3.  **Interaction:** User chooses to initiate a pull by clicking either \"Digital Card Pull\" or \"Physical Card Pull\".

   2.2. Digital Card Pull Workflow
      *   **Wireframe Description:** A dedicated page with an animated visual of a shuffled Tarot deck. A large, central button labeled \"Pull My Card\" is prominent. After the pull, this page transitions to display the randomly chosen card, its name, and a section for notes.
      *   **User Journey:**
          1.  From the Profile Dashboard, user clicks \"Digital Card Pull\".
          2.  User sees the animated deck and the \"Pull My Card\" button.
          3.  **Interaction:** User clicks \"Pull My Card\".
          4.  **Interaction Pattern:** A brief animation simulates the card being drawn from the deck.
          5.  The randomly selected card is displayed on screen, along with its name.
          6.  User is prompted to add notes (see 2.4).
          7.  **Interaction:** User can click a button (e.g., \"View Details\") to immediately go to the full Card Display Page for the pulled card (see 2.3), or simply add notes and return to Dashboard later.

   2.3. Physical Card Pull Workflow
      *   **Wireframe Description:** A dedicated page displaying a static image representing a Tarot deck. An input field or dropdown menu (e.g., \"Select Card\") allows the user to manually choose the card they physically pulled (e.g., via card name or number input). A \"Confirm Selection\" button is active once a card is chosen. After confirmation, the page displays the selected card, its name, and a section for notes.
      *   **User Journey:**
          1.  From the Profile Dashboard, user clicks \"Physical Card Pull\".
          2.  User sees the static deck image and the manual selection interface.
          3.  **Interaction:** User uses the input field/dropdown to select the specific card they pulled physically.
          4.  **Interaction:** User clicks \"Confirm Selection\".
          5.  The manually selected card is displayed on screen, along with its name.
          6.  User is prompted to add notes (see 2.4).
          7.  **Interaction:** User can click a button (e.g., \"View Details\") to immediately go to the full Card Display Page for the pulled card (see 2.3), or simply add notes and return to Dashboard later.

   2.4. Post-Pull Actions (Notes & View Details)
      *   **Wireframe Description:** Integrated into the digital/physical pull result page, or as a subsequent dedicated page. Displays the pulled card prominently. Below it, a text area labeled \"Notes\" allows users to type reflections or observations for that day's pull. An \"Add/Save Notes\" button finalizes the entry. A dedicated section below the notes area (or accessible via a toggle/button) displays the card's various meanings and symbol associations.
      *   **User Journey (Adding Notes):**
          1.  After a digital or physical pull, the card is displayed.
          2.  User sees the "Notes" text area.
          3.  **Interaction:** User types their notes into the text area.
          4.  **Interaction:** User clicks \"Save Notes\" (or similar) to store their entry.
          5.  System saves the notes, user is optionally returned to the Dashboard or remains on the card detail view.
      *   **User Journey (Viewing Card Meanings):**
          1.  On the card display page (after pull or for past pulls).
          2.  User sees the \"Card Meanings and Symbol Associations\" section.
          3.  **Interaction Pattern:** This section might be collapsible/expandable or simply scrollable to reveal detailed static content about the card.
          4.  User reads the provided interpretations.

3. Historical Data & Insights Journey

   3.1. Accessing Past Pulls
      *   **Wireframe Description:** On the Profile Dashboard, a section clearly lists the \"Past 30 Days\" (for Free users) or \"Historical Pulls\" (for Premium users). Each entry in this list represents a specific date and might show a small thumbnail of the card pulled on that day. The entire entry is clickable.
      *   **User Journey:**
          1.  User logs in and views the Profile Dashboard.
          2.  User scrolls to the \"Past Pulls\" section.
          3.  **Interaction:** User clicks on a specific date entry (e.g., \"Oct 26, 2023\") to view details for that day.

   3.2. Viewing Individual Pull Details
      *   **Wireframe Description:** This page is identical in layout to the post-pull Card Display Page (see 2.4). It shows the card, the user's previously saved notes (editable), and the static card meanings/associations. The notes section is initially read-only but has an \"Edit Notes\" button, which transforms it into an editable text area with a \"Save Changes\" button.
      *   **User Journey:**
          1.  User clicks on a past date from the Dashboard.
          2.  The specific day's card pull (card image, name) and associated notes are displayed.
          3.  User reads their previous notes and the card meanings.
          4.  **Interaction (Edit Notes):** User clicks \"Edit Notes\". The notes text area becomes editable. User modifies notes. User clicks \"Save Changes\". Notes are updated in the database.

   3.3. Data Visualization & Analytics
      *   **Wireframe Description:** A dedicated \"Analytics\" page accessible from the Profile Dashboard. It features controls at the top: dropdowns for \"Timeframe\" (e.g., \"Last Month\", \"Last Year\", \"All Time\"), radio buttons/toggles for \"Graph Type\" (\"Bar Graph\", \"Pie Graph\"), and a \"Color Picker\" for graph customization. The main area displays the chosen graph illustrating the frequency of pulled cards. A summary section might list the top 3 most pulled cards for the selected timeframe.
      *   **User Journey:**
          1.  From the Profile Dashboard, user clicks \"Analytics\".
          2.  User lands on the Analytics page, seeing a default graph view.
          3.  **Interaction (Timeframe):** User clicks the \"Timeframe\" dropdown and selects an option (e.g., \"Last Year\"). The graph dynamically updates.
          4.  **Interaction (Graph Type):** User clicks the \"Graph Type\" toggle/radio button to switch between \"Bar Graph\" and \"Pie Graph\". The graph dynamically updates.
          5.  **Interaction (Colors):** User clicks the \"Color Picker\" and selects preferred colors for the graph elements. The graph dynamically updates.
          6.  User analyzes the visualized data to discover patterns in their pulls.

   3.4. "Most Pulled Card" Badge
      *   **Wireframe Description:** A persistent badge or section on the Profile Dashboard, prominently displaying the single Tarot card that the user has pulled most frequently across their entire history. The card image and its name are shown.
      *   **User Journey:**
          1.  User logs in and views the Profile Dashboard.
          2.  User passively observes their \"Most Pulled Card\" badge.
          3.  **Interaction Pattern:** This badge updates automatically as new pulls are recorded and the most frequent card changes.

4. Account Management & Monetization

   4.1. Free vs. Premium Management
      *   **Wireframe Description:** On the Profile Dashboard (for Free users), a clear banner or section notifies the user of their current data retention limit (60 days) and encourages upgrading to Premium for unlimited storage. This might include a progress indicator (e.g., "You have X days left of data retention"). A prominent \"Upgrade to Premium\" button is present.
      *   **User Journey (Free User):**
          1.  User logs in and sees their remaining data retention period.
          2.  **Interaction:** As the 60-day limit approaches or is reached, the upgrade prompt becomes more insistent.
          3.  **Interaction:** User clicks \"Upgrade to Premium\" to initiate the subscription process.

   4.2. Upgrade Process (Monetization)
      *   **Wireframe Description:** A dedicated \"Upgrade to Premium\" page. It clearly outlines the benefits of the premium subscription (unlimited data storage, future features like deck customization). The pricing model ($8/month) is stated. A \"Subscribe Now\" button integrates with Stripe. Success and error messages are handled gracefully.
      *   **User Journey:**
          1.  User clicks \"Upgrade to Premium\" from the Dashboard or a prompt.
          2.  User is directed to the Upgrade page.
          3.  User reviews the features and pricing.
          4.  **Interaction:** User clicks \"Subscribe Now\".
          5.  **Interaction Pattern:** A modal or redirect to Stripe's secure checkout page appears.
          6.  User enters payment details on Stripe.
          7.  **Interaction Pattern:** Upon successful payment, Stripe redirects back to ChronoArcana, and the user's account status is updated to Premium.
          8.  User is directed back to the Dashboard, now with Premium features active (e.g., no data limit notification, access to full historical data).

   4.3. Data Export (CSV)
      *   **Wireframe Description:** A button labeled \"Export Data (CSV)\" is located on the Profile Dashboard. Clicking it triggers a download.
      *   **User Journey:**
          1.  User views the Profile Dashboard.
          2.  **Interaction:** User clicks \"Export Data (CSV)\".
          3.  **Interaction Pattern:** The browser prompts the user to download a CSV file containing their entire Tarot pull history (date, card name, potentially notes if user opts in for notes export - though notes are not shared socially, personal export is allowed).
          4.  System generates and provides the CSV file for download.

5. Future Social Features (Conceptual Interactions)

   5.1. Following Other Users & Public Feeds
      *   **Wireframe Description:** (Future) A dedicated \"Social\" tab or section on the Dashboard. It might display a feed of shared pulls from users the current user follows. A search bar for finding other users and \"Follow\" buttons next to user profiles are present.
      *   **User Journey:**
          1.  User navigates to the \"Social\" section.
          2.  **Interaction:** User searches for another user by username.
          3.  **Interaction:** User clicks \"Follow\" on a user's profile.
          4.  User's feed updates to show shared content from followed users.

   5.2. Data Sharing Permissions
      *   **Wireframe Description:** (Future) A \"Privacy Settings\" section within the user's profile settings. It contains checkboxes or toggles for different data sharing levels: \"Share Entire History\", \"Share Overall Stats (excluding notes)\", \"Share Daily Pulls (excluding notes)\". A clear disclaimer states that daily notes are NEVER shared.
      *   **User Journey:**
          1.  User navigates to \"Privacy Settings\".
          2.  User reviews the sharing options.
          3.  **Interaction:** User toggles preferences for sharing their Tarot pull data.
          4.  **Interaction:** User clicks \"Save Changes\" to update their sharing preferences.
          5.  **Interaction Pattern:** Data shared on public feeds or with followers adheres strictly to these chosen permissions.

## Styling Guidelines
STYLING GUIDELINES: ChronoArcana

This document outlines the styling principles, color palette, typography, and UI/UX guidelines for the ChronoArcana web application. Our goal is to create a visually cohesive, immersive, and intuitive experience that aligns with the "Gothic but dreamy" aesthetic while maintaining a modern feel. Dark mode is the foundational visual mode for the entire application.

I. DESIGN PHILOSOPHY & VISION
The core design vision for ChronoArcana is to blend a "Gothic but dreamy" aesthetic with a modern, intuitive user interface. This translates into a dark-mode-first approach, where deep, rich colors are complemented by ethereal accents and subtle visual textures. The design should evoke a sense of mystique and introspection, providing a serene environment for users to engage with their Tarot practice. Visuals will prioritize legibility and clarity, ensuring that thematic elements enhance rather than detract from usability.

II. COLOR PALETTE
Our color palette is built around deep, mystical tones with selective, luminous accents to create contrast and highlight interactive elements.

A. PRIMARY PALETTE (Dark Mode Foundation)
These colors form the base of the UI, providing depth and a sense of atmosphere.
*   **Deep Void (Background):** A very dark, almost black hue that serves as the primary canvas.
    *   Hex: #0F0F1A
*   **Shadow Veil (Card/Container Background):** A slightly lighter, desaturated dark gray for distinct UI elements like cards, sections, and modals.
    *   Hex: #1A1A2B
*   **Midnight Aura (Borders/Dividers):** A subtle, darker shade for separators and subtle depth.
    *   Hex: #2C2C3A

B. ACCENT PALETTE (Dreamy & Luminous)
These colors are used for interactive elements, highlights, graphs, and to provide visual interest. They should evoke a sense of magic and introspection.
*   **Lunar Glow (Primary Accent/Text Highlight):** A soft, ethereal white or very light gray, perfect for primary text on dark backgrounds and subtle highlights.
    *   Hex: #F0F0F5
*   **Astral Gold (Interactive/CTA):** A muted, old gold or brass color for primary call-to-action buttons, active states, and key data points.
    *   Hex: #B89C6F
*   **Amethyst Dream (Secondary Accent/Graph):** A deep, rich purple that adds a touch of mystery and can be used for secondary buttons or graph elements.
    *   Hex: #7F58AF
*   **Emerald Whisper (Tertiary Accent/Graph):** A dark, mystical green for additional graph elements or subtle UI highlights.
    *   Hex: #4E8D7F
*   **Sapphire Haze (Tertiary Accent/Graph):** A deep, enchanting blue for further graph elements or decorative touches.
    *   Hex: #3F5F7F

C. SEMANTIC COLORS (Subtle Application)
For states like success, warning, or error, these colors will be used sparingly and subtly, primarily for icons or borders.
*   **Success (Whisper Green):** #6FCF97
*   **Warning (Amber Glow):** #F2C94C
*   **Error (Crimson Stain):** #EB5757

III. TYPOGRAPHY
Typography aims to strike a balance between classic elegance (Gothic feel) and modern readability (intuitive flow).

A. FONT FAMILIES
*   **Primary (Headings & Display):** "Cinzel" (Google Fonts) or a similar serif font with elegant, slightly gothic characteristics. Used for prominent titles, section headers, and key numerical data where a distinct stylistic impact is desired.
    *   Example Usage: H1, H2, Data Visualizations Labels
*   **Secondary (Body Text & UI Elements):** "Inter" (Google Fonts) or a similar clean, highly legible sans-serif font. Used for all body copy, button labels, form inputs, navigation, and detailed information.
    *   Example Usage: Body Paragraphs, Button Text, Navigation Links, Card Meanings, Notes

B. FONT WEIGHTS
*   Primary Font: Regular, Bold
*   Secondary Font: Regular, Medium, Semibold, Bold

C. FONT SIZING & HIERARCHY (Example Scale - Responsive Adaptations Required)
*   **H1 (Page Title):** 48px (Cinzel, Bold)
*   **H2 (Section Header):** 36px (Cinzel, Semibold)
*   **H3 (Card Title/Subsection):** 24px (Cinzel, Regular)
*   **Body Large:** 18px (Inter, Regular) - For primary content areas, key descriptions.
*   **Body Medium:** 16px (Inter, Regular) - Standard paragraph text, main UI labels.
*   **Body Small:** 14px (Inter, Regular) - Captions, meta-data, secondary information.
*   **Buttons/CTA:** 16px (Inter, Semibold)
*   **Input Fields:** 16px (Inter, Regular)

D. LINE HEIGHT & LETTER SPACING
*   Line Height: 1.5 for body text, 1.2 for headings to ensure readability on dark backgrounds.
*   Letter Spacing: Default for most text. Slightly tighter for headings if aesthetically pleasing, but avoid negative spacing.

IV. ICONOGRAPHY
*   **Style:** Icons should be clean, line-based or subtly filled, with a consistent stroke weight. They should align with the "modern" aspect while complementing the "dreamy" aesthetic (e.g., subtle glow effects on hover or active states).
*   **Usage:** For navigation, feature representations, data visualization toggles, and UI actions.
*   **Color:** Primarily Lunar Glow (#F0F0F5), with Astral Gold (#B89C6F) for active states or key indicators.

V. UI COMPONENTS
Consistency in UI components is crucial for an intuitive experience.

A. BUTTONS
*   **Primary CTA (Call to Action):** Astral Gold (#B89C6F) background, Lunar Glow (#F0F0F5) text. Subtle shadow. Hover state: slightly brighter Astral Gold, minor scale up.
*   **Secondary Buttons:** Shadow Veil (#1A1A2B) background with Lunar Glow (#F0F0F5) border and text. Hover state: Lunar Glow border brightens slightly, background darkens to Deep Void (#0F0F1A).
*   **Tertiary/Text Buttons:** Lunar Glow (#F0F0F5) text directly on background. Hover state: text lightens slightly, subtle underline appears.

B. CARDS & CONTAINERS
*   Background: Shadow Veil (#1A1A2B)
*   Borders: Subtle 1px Midnight Aura (#2C2C3A) or no border, relying on subtle shadow for depth.
*   Content Padding: Consistent spacing (e.g., 20px all around).

C. FORMS & INPUTS
*   Input Fields: Shadow Veil (#1A1A2B) background, Lunar Glow (#F0F0F5) text.
*   Borders: Midnight Aura (#2C2C3A).
*   Focus State: Astral Gold (#B89C6F) glow around the input field.
*   Placeholder Text: Muted Lunar Glow (e.g., #C0C0C8).
*   Error State: Subtle Crimson Stain (#EB5757) border or text.

D. NAVIGATION
*   Primary Navigation: Deep Void (#0F0F1A) background with Lunar Glow (#F0F0F5) text/icons.
*   Active State: Astral Gold (#B89C6F) accent (e.g., underline, icon color change).
*   Hover State: Subtle glow effect on text/icons.

E. DATA VISUALIZATION
*   Graphs (Bar/Pie): Will utilize the Accent Palette (Astral Gold, Amethyst Dream, Emerald Whisper, Sapphire Haze) for clarity and visual appeal.
*   User Customization: Users will have the option to choose from a predefined set of color combinations for their graphs, primarily drawing from the accent palette to maintain aesthetic consistency.

VI. IMAGERY & GRAPHICS
*   **Tarot Cards:** High-resolution, authentic representations of the Thoth and Rider-Waite decks. The focus is on clarity and fidelity to the original artwork.
*   **Backgrounds:** Subtle, abstract textures, gradients, or faint patterns that complement the "Gothic but dreamy" theme without distracting from content. Avoid busy or overly detailed backgrounds.
*   **Illustrations/Icons:** Any custom illustrations should adhere to the ethereal, mystical, or gothic tone, using colors from the defined palette.

VII. UI/UX PRINCIPLES
A. DARK MODE PRIORITIZATION
*   All design elements, from colors to shadows and contrasts, are optimized for a dark background. This includes ensuring sufficient contrast for readability and appropriate luminance for interactive elements.

B. INTUITIVE NAVIGATION & FLOW
*   The application flow should be logical and straightforward. Users should easily find core features like card pulling, historical data, and profile settings.
*   Minimize clicks and cognitive load to ensure a smooth, enjoyable experience.

C. VISUAL HIERARCHY & FOCUS
*   Utilize size, color, contrast, and spacing to guide the user's eye to the most important information or actions on the screen.
*   Primary actions should be immediately apparent, while secondary information should recede slightly.

D. CONSISTENCY
*   Maintain a consistent look and feel across all pages and components. This includes consistent spacing, button styles, typography, and interaction patterns.
*   Consistency builds familiarity and reduces the learning curve for users.

E. FEEDBACK & RESPONSIVENESS
*   Provide clear visual feedback for all user interactions (e.g., button presses, form submissions, data loading).
*   Use subtle animations and transitions to enhance the "dreamy" feel and provide a smooth, responsive experience without being distracting.

F. READABILITY & ACCESSIBILITY
*   Ensure high contrast ratios between text and background colors for optimal readability, especially in dark mode.
*   Font sizes should be legible on various screen sizes, and dynamic type should be considered.
*   Interactive elements should have clear focus states for keyboard navigation.

G. BRAND IMMERSION
*   Every visual element, from subtle background textures to the choice of icon style, should reinforce the "Gothic but dreamy" and mystical essence of ChronoArcana.
*   The UI should feel like an extension of the Tarot experience itself.

H. USER CUSTOMIZATION (Data Visualization)
*   As specified, users will have the ability to select their preferred color schemes for data visualization graphs (bar and pie charts) from a curated palette, empowering a sense of personalization.
