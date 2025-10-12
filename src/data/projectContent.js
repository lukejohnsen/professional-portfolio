export const projectAboutContent = {
  timc: `This project was built to streamline the registration process for the annual Tucson International Mariachi Conference, which hosts 1,000+ participants each year. The body of participants is comprised of school and community mariachi and folklórico groups from around the country.

The process of registering, collecting payments, and managing participant data is complex and required addressing specific and nuanced needs, especially for group registrations. For instance, many school groups needed to pay via purchase order rather than credit card. This meant building a flexible system that could handle various payment methods while ensuring data integrity and security.

I developed a custom WordPress integration through my WP theme's functions.php file with Gravity Forms to handle complex multi-participant registration. The biggest challenge was creating a dynamic system that could handle anywhere between 2 and 80+ participants per group registration.

The solution involved building a custom PHP loop that dynamically collects participant data by checking for the existence of form fields incrementally. This allowed groups to register anywhere from 1 to 80+ participants without knowing the exact number beforehand.

Capturing data from Gravity Forms was tricky because Gravity Forms uses dynamic field IDs based on the form structure. I had to carefully map these IDs to ensure that each participant's data was correctly captured and stored.

I also integrated Stripe's payment API for secure credit card processing and built a MySQL database structure with prepared statements to prevent SQL injection attacks. The system tracks participant information, group details, song selections, and payment status across multiple related tables.

Using a rapid application development platform called PHPRunner, I created a secure admin interface for event staff to manage registrations, view participant details, and track payments. This interface allows for easy updates and management of the data collected through the registration form.

Below you will find a code snippet showcasing the dynamic participant collection logic implemented in PHP.

As of right now, the live form is not currently accessible.`,

  whatToWatch: `WhatToWatch is a modern web application that gamifies movie discovery through a swipe-based interface. Built with Next.js, the app integrates with The Movie Database (TMDB) API to deliver real-time popular movie data in an engaging user-friendly experience.

Current Features:

Swipe Interface - Tinder-style card UI for browsing popular movies
TMDB API Integration - Real-time fetching of movie data, posters, and metadata
Persistent Favorites - LocalStorage-based system for saving liked movies
Matches Gallery - Grid view of saved movies with removal functionality
Responsive Design - Mobile-optimized layout with Tailwind CSS
Next.js Image Optimization - Automatic image optimization for performance

Future Enhancements:

User Authentication (OAuth via Auth.js)
Database Integration - Migrating from localStorage to persistent user profiles
Advanced Filtering - Genre, year, rating-based movie discovery
Recommendation Engine - ML-based suggestions using user preferences
`,
};