import cloud from "../assets/cloudy.png"
import { useState,useEffect } from "react";
import axios from "axios";
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const UNSPLASH_API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;

export default function WeatherCard(){
 
  const [weatherData,setWeatherData]=useState();
  const [location, setLocation] = useState({latitude:"",longitude:""});
  const [error, setError] = useState("");
  const [city,setCity]=useState("");
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;


  function handleCity(e){
    setCity(e.target.value);
  }
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (city.trim()) {
        getCityPos(city);
      }
    }, 1000); // waits 1 second after last change
  
    return () => clearTimeout(delayDebounce); // cleanup previous timer
  }, [city]);
  
  async function getCityPos() {
    try {
      const response = await axios.get(
        `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${WEATHER_API_KEY}`
      );
      if (response.data && response.data.length > 0) {
        const { lat, lon } = response.data[0];
        setLocation({ latitude: lat, longitude: lon });
  
        const cityarr = JSON.parse(localStorage.getItem("cities")) || [];
        if (!cityarr.includes(city)) {
          cityarr.push(city);
          localStorage.setItem("cities", JSON.stringify(cityarr));
        }
      }
    } catch (error) {
      console.error("Error fetching city position:", error);
    }
  }
  
  

  function startListening() {
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    recognition.start();
  
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setCity(transcript); // Update your state
      console.log("Recognized speech:", transcript);
    };
  
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };
  }
  
 useEffect(() => {
      if (!navigator.geolocation) {
        setError("Geolocation is not supported by your browser");
        return;
      }
  
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude:latitude, longitude:longitude });
          console.log(location);
        },
        (err) => {
          setError("Permission denied or unavailable");
          console.error(err);
        }
      );
    }, []);


    useEffect(() => {
      if (!location.latitude || !location.longitude) return;
    
      async function fetchWeather() {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&units=metric&appid=${WEATHER_API_KEY}`
          );
          setWeatherData(response.data);
        } catch (error) {
          console.error("Failed to fetch weather data:", error);
        }
      }
    
      fetchWeather();
    }, [location.latitude, location.longitude]);
    

  const [cityPhoto, setCityPhoto] = useState(null);
  const [iconUrl, setIconUrl] = useState(null);

useEffect(() => {
  if (weatherData) {
    const icon = weatherData.weather[0].icon;
    setIconUrl(`https://openweathermap.org/img/wn/${icon}@2x.png`);
    console.log(weatherData);
  }
}, [weatherData]);

  useEffect(() => {
    async function fetchWeatherAndPhoto() {
      try {
        if(!weatherData)
          return;
        const cityName = weatherData.name;
       
        console.log(cityName);
        const unsplashResponse = await axios.get(
          `https://api.unsplash.com/search/photos?page=1&query=${weatherData.name}&client_id=${UNSPLASH_API_KEY}`
        );
  
        const firstPhoto = unsplashResponse.data.results[0];
        if (firstPhoto) {
          setCityPhoto(firstPhoto.urls.regular);
        }
  
      } catch (error) {
        console.error("Failed to fetch weather or photo:", error);
      }
    }
  
    fetchWeatherAndPhoto();
  }, [weatherData]);
  
  useEffect(()=>{
    if(weatherData)
    {
      const message = `The current temperature in ${city} is ${weatherData.main.temp} degrees Celsius with ${weatherData.weather[0].description}.`;
      console.log("speaking");
      const utterance = new SpeechSynthesisUtterance(message);
      speechSynthesis.cancel(); // Stop any previous utterances
      speechSynthesis.speak(utterance);
    }
  },[weatherData])
  return (
    <div className="flex h-screen w-screen justify-center items-center">
      {!weatherData ? (
        <div className="text-white">Loading weather data...</div>
      ) : (
        <>
          {cityPhoto && (
            <img
              src={cityPhoto}
              alt="City"
              className="w-full h-full fixed object-cover z-0"
            />
          )}
  
          <div className="rounded-3xl border border-white p-4 flex flex-col opacity-90 space-y-3 z-10 bg-black/0 backdrop-blur-md w-full max-w-sm mx-4">
          <div class="flex rounded-full border border-white  overflow-hidden max-w-md mx-auto">
        <input type="email" placeholder="Search City..."
          class="w-full outline-none bg-black/5 text-white text-sm px-4 py-3 opacity-100 " onChange={handleCity}/>
          <button type="button" class=" inset-y-0 end-0 flex items-center justify-center p-3 bg-[#007bff] border-x border-x-white" onClick={startListening}>
            <svg class="w-4 h-4  text-gray-500 dark:text-white hover:text-gray-900 dark:hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7v3a5.006 5.006 0 0 1-5 5H6a5.006 5.006 0 0 1-5-5V7m7 9v3m-3 0h6M7 1h2a3 3 0 0 1 3 3v5a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V4a3 3 0 0 1 3-3Z"/>
            </svg>
        </button>
        <button type='button' class="flex items-center justify-center bg-[#007bff] px-5" onClick={getCityPos}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192.904 192.904" width="16px" class="fill-white">
            <path
              d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z">
            </path>
          </svg>
        </button>
      </div>
            <div className="text-white flex justify-center text-3xl">
              {weatherData.name}
            </div>
            <div className="text-white flex justify-center text-lg">
              {weatherData.weather[0].main.toUpperCase()}
            </div>
            <div className="text-white flex justify-center text-lg">
              {weatherData.weather[0].description.toUpperCase()}
            </div>
            <div className="text-white flex justify-center text-3xl">
              <img src={iconUrl} alt="" />
            </div>
            <div className="text-white flex justify-center text-6xl">
              {weatherData.main.temp} °
            </div>
            <div className="flex justify-center space-x-10 er text-white">
              <div className="flex flex-col justify-center items-center bg-black/30 space-y-4 p-4 rounded-full border border-white">
                <div>Humidity</div>
                <div>{weatherData.main.humidity}%</div>
              </div>
              <div className="flex flex-col justify-center items-center bg-black/30 space-y-4 p-3 rounded-full border border-white">
                <div>Wind</div>
                <div>{weatherData.wind.speed} km/h</div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
  
}