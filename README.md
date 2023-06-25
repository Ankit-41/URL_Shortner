# URL Shortener and Search optimisation

URL Shortener is a web application designed to simplify and streamline the process of generating shorter URLs. It allows users to create compact and easily shareable URLs for their long web addresses, making it convenient to share links across various platforms.


![full_view](https://github.com/Ankit-41/URL_Shortner/assets/98843149/41f0b8b8-2087-43b4-8d3b-ef747a1d5b4a)


## Key Features

- Generate Short URLs: The URL Shortener enables users to shorten their lengthy URLs into concise and manageable links. This makes it more convenient to share URLs through social media, messaging apps, or any other communication channels.

- Notes Integration: In addition to generating short URLs, the application allows users to add notes or descriptions along with each shortened link. This feature helps users to associate important information or context with the URLs they are shortening, facilitating better organization and future search capabilities.

- Advanced Search Functionality: The URL Shortener provides a robust search functionality, enabling users to search for shortened URLs using various criteria. Users can search by the long URL, short URL, or the associated notes, making it effortless to locate specific links based on their attributes.

- Click Tracking: The application tracks the number of clicks recorded for each shortened URL. Users can easily view the total click count, providing valuable insights into the popularity and engagement level of their shared links.

- Responsive Design: The URL Shortener is built with a responsive design approach, ensuring optimal performance and visual appeal across different screen sizes and devices. It offers a seamless user experience, whether accessed from larger desktop screens or smaller mobile devices.

![Screenshot (100)](https://github.com/Ankit-41/URL_Shortner/assets/98843149/db8c742b-c969-4f2f-aede-a49b632c3e5b)     ![iphone_view](https://github.com/Ankit-41/URL_Shortner/assets/98843149/4faf369f-3b6f-4266-8660-2d644c15034e)


## How It Works

1. User Interface: When a user visits the webpage, they are presented with an input field where they can enter a long URL and add associated notes. After pressing the Enter key or the Submit button, the data is sent to the MongoDB database for storage.

2. Database Storage: The entered URL and notes are stored in the MongoDB database. This ensures that the shortened URL and its associated information are securely saved for future reference.

3. URL Shortening: The application uses the ShortID library to generate a unique and shortened URL for the entered long URL. This shortened URL is created using an algorithm that ensures uniqueness and maintainability.

4. Click Tracking: Each time a user clicks on a shortened URL, the application increments the click count associated with that URL. This helps track the popularity and engagement level of the shared links.

5. Advanced Search: The application provides a search feature implemented through a dedicated route in Node.js. Users can search for specific shortened URLs based on the long URL, short URL, or associated notes. The search functionality retrieves the relevant links from the MongoDB database and displays them to the user.

6. URL Deletion: The application includes a route to delete a shortened URL based on its unique identifier (ID). Users can delete unwanted URLs from the database using this route, enhancing flexibility and organization.

## Getting Started

To get started with the URL Shortener, follow the steps below:

1. Clone the repository or download the source code:

   ```
   git clone https://github.com/Ankit-41/URL_Shortener.git
   ```

2. Change to the project directory:

   ```
   cd URL_Shortener
   ```

3. Install the required dependencies:

   ```
   npm install
   ```

4. Start the application:

   ```
   npm run start
   ```

   This will launch the URL Shortener on your local environment.

Please ensure you have [Node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed on your machine before proceeding with the installation.

## Contributing

Contributions to the URL Shortener project are highly appreciated. If you encounter any issues, have suggestions for improvements, or would like to contribute new features, please feel free to open a pull request. Your contributions will help enhance the functionality and usability of the application.

