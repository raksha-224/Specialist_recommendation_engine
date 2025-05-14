# Health Guide - Specialist Recommendation System

A comprehensive health monitoring system that helps users track their health conditions and recommends appropriate medical specialists based on their symptoms. The system consists of a Django backend for disease prediction and specialist recommendations, and a React frontend for user interaction.

## Project Structure

```
.
├── backend/                 # Django Backend
│   ├── accounts/           # User authentication and profiles
│   ├── predictor/          # Disease prediction module
│   ├── specialist/         # Specialist recommendation module
│   └── health_monitoring/  # Main Django project settings
│
└── health_guide_new/       # React Frontend
    ├── src/
    │   ├── components/     # Reusable UI components
    │   ├── pages/          # Page components
    │   └── services/       # API services
    └── public/             # Static assets
```

## Features

- User Authentication and Registration
- Health Profile Management
- Disease Prediction based on Symptoms
- Specialist Recommendations
- Interactive Dashboard
- Responsive UI Design

## Technology Stack

### Backend
- Python 3.x
- Django
- Django REST Framework
- Machine Learning Libraries (scikit-learn)
- SQLite Database

### Frontend
- React.js
- React Router
- Modern UI Components
- Axios for API calls

## Setup Instructions

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Run migrations:
   ```bash
   python manage.py migrate
   ```

5. Start the Django server:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd health_guide_new
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Endpoints

### Authentication
- POST `/api/auth/register/` - User registration
- POST `/api/auth/login/` - User login
- POST `/api/auth/logout/` - User logout

### Health Profile
- POST `/api/health/profile/` - Create health profile
- GET `/api/health/profile/` - Get user health profile
- PUT `/api/health/profile/` - Update health profile

### Disease Prediction
- POST `/api/predictor/predict/` - Get disease prediction
- GET `/api/predictor/history/` - View prediction history

### Specialist Recommendation
- GET `/api/specialist/recommend/` - Get specialist recommendations
- GET `/api/specialist/list/` - List all specialists

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Disease prediction model trained on comprehensive medical dataset
- Specialist recommendation system based on verified medical professional data
- UI/UX design inspired by modern healthcare applications
