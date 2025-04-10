import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import WeatherInfo from './pages/WeatherInfo';
import ProtectedRoute from './Routes/ProtectedRoute'; // adjust the path if needed
import './App.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route
        path="/weatherInfo"
        element={
          <ProtectedRoute>
            <WeatherInfo />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
