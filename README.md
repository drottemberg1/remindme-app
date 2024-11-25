
# Toptal RemindMe App

**Toptal RemindMe App** is a task reminder application built with a Laravel backend (using SQLite) and a React.js frontend. The app allows users to manage their reminders effectively.

---

## Stack

- **Backend**: Laravel with SQLite  
- **Frontend**: React.js  
- **Backend Language**: PHP 8.2  
- **Frontend Environment**: Node.js 18  

---

## Features

### Backend:
- RESTful API for managing reminders.
- Token-based authentication with access and refresh tokens.
- Scheduling system for automatic task reminders.
- Unit-tested endpoints.

### Frontend:
- User-friendly React.js interface.
- Real-time reminders and notifications.
- Responsive design.

---

## Backend Setup

### Prerequisites
- PHP 8.2
- Composer
- SQLite database

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone https://github.com/drottemberg1/remindme-laravel.git
   cd remindme-laravel/src/
   ```

2. **Install dependencies**:
   ```bash
   composer install
   ```

3. **Set up environment variables**:
   - Create a `.env` file at the root directory:
     ```bash
     cp .env.example .env
     ```
   - Create a `.env.testing` file for testing configurations.

4. **Run migrations**:
   ```bash
   php artisan migrate
   ```

5. **Seed the database**:
   ```bash
   php artisan db:seed --class=UserSeeder
   ```

6. **Start the server**:
   ```bash
   php artisan serve
   ```

7. **Start the scheduler**:
   ```bash
   php artisan schedule:work
   ```

8. **Run automated tests**:
   ```bash
   php artisan test
   ```

---

### Sample `.env` File
```env
APP_NAME=RemindMe
APP_ENV=local
APP_KEY=base64:jY1NIoFpEkkTcpfhP3e2Zy7hKEQTCgeY6XSi+xjfCaw=
APP_DEBUG=true
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=sqlite

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MAIL_MAILER=sendmail
MAIL_HOST=localhost
MAIL_PORT=25
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="admin@ezrv.org"
MAIL_FROM_NAME="${APP_NAME}"
MAIL_TO_OVERRIDE=david@ezrdv.org

```

---

### Sample `.env.testing` File
```env
APP_ENV=testing
APP_KEY=base64:YOUR_APP_KEY_HERE
APP_DEBUG=true
APP_URL=http://localhost

# Database connection for testing (use SQLite for speed and isolation)
DB_CONNECTION=sqlite
DB_DATABASE=:memory:
DB_FOREIGN_KEYS=true

# Mail configuration for testing
MAIL_MAILER=log
MAIL_LOG_CHANNEL=stack

# Cache configuration
CACHE_DRIVER=array
QUEUE_CONNECTION=sync
SESSION_DRIVER=array

# Other optional configurations
BROADCAST_DRIVER=log
LOG_CHANNEL=stack
FILESYSTEM_DISK=local
```

---

## Frontend Setup

### Prerequisites
- Node.js 18
- npm

### Steps to Set Up

1. **Clone the repository**:
   ```bash
   git clone https://github.com/drottemberg1/remindme-app.git
   cd remindme-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the frontend**:
   ```bash
   npm run
   ```
---
### Setup `config/WTConfig.js` File
Enter  `API_URL` corresponding to the laravel endpoints. If you are running `php artisan serve` then it should be `http://localhost:8000/api` by default.




## Project Structure

### Backend
```
src/
├── app/
├── config/
├── database/
│   ├── factories/
│   ├── migrations/
│   ├── seeders/
├── routes/
│   ├── api.php
│   ├── web.php
├── tests/
│   ├── Feature/
│   ├── Unit/
├── .env.example
├── artisan
└── composer.json
```

### Frontend
```
remindme-app/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── config/
│   ├── SDK/
│   ├── App.jsx
│   ├── index.js
├── jsconfig.json
└── package.json

```

---

## Testing

### Backend:
Tests are written using PHPUnit. To run the tests:
```bash
php artisan test
```

### Frontend:
React testing can be implemented using tools like Jest or React Testing Library.

---

## Notes

- Ensure you have the correct versions of PHP, Composer, Node.js, and npm.
- SQLite is used for both development and testing environments. Adjust `.env` files as needed.

---

## Contribution

Feel free to contribute by submitting issues or pull requests. Fork the repository, make your changes, and create a pull request.

---

## License

This project is licensed under the MIT License.
