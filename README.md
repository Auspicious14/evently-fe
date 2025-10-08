# EventNaija

EventNaija is a web application designed to help users discover tech events happening across Nigeria. It provides a centralized platform for finding, filtering, and viewing event details, including an interactive map to visualize event locations.

## Features

- **Event Listing:** Browse a comprehensive list of upcoming tech events.
- **Advanced Filtering:** Filter events by location, category, and date range to find exactly what you're looking for.
- **Interactive Map View:** See event locations plotted on an interactive Google Map.
- **Event Submission:** Submit new events to the platform through a simple and easy-to-use form.

## Tech Stack

This project is built with a modern, component-based architecture using the following technologies:

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) with [shadcn/ui](https://ui.shadcn.com/) components
- **Form Management:** [React Hook Form](https://react-hook-form.com/)
- **API Communication:** [Axios](https://axios-http.com/)

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- [npm](https://www.npmjs.com/)

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/EventNaija.git
    cd EventNaija
    ```

2.  **Install NPM packages:**
    ```sh
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env.local` file in the root of the project and add your Google Maps API key:
    ```
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
    ```

4.  **Run the Development Server:**
    ```sh
    npm run dev
    ```

The application will be available at `http://localhost:3000`.
