import React, { useState, useEffect } from 'react'
import CityCard, { CityDetails } from '../CityCard/CityCard';
import Search from '../Search/Search';
import "./index.css"
import axios from 'axios';
import { genOpenWeatherAPI } from '../../api/api';

const Home = () => {

    const [city, setCity] = useState<any>(null);
    const [icon, setIcon] = useState<any>(null);
    const [temperature, setTemperature] = useState<any>(null);
    const [humidity, setHumidity] = useState<any>(null);
    const [windSpeed, setWindSpeed] = useState<any>(null);
    const [description, setDescription] = useState<any>(null);
    const [position, setPosition] = useState<any>({ latitude: null, longitude: null });


    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(function (position) {
                setPosition({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                });
            });
        } else {
            console.log("Geolocation is not available in your browser.");
        }
    }, []);

    useEffect(() => {
        console.log(position)
        handleLatLon(position.latitude,position.longitude)
    }, [position])


    const cityDetails: CityDetails = {
        city: city,
        icon: icon,
        temperature: temperature,
        humidity: humidity,
        windSpeed: windSpeed,
        description: description,
    };

    const handleLatLon = async (lat: number, lon: number) => {
        try {
            const response = await axios.request(genOpenWeatherAPI(lat, lon));
            const data = response.data;
            console.log(data)
            if(city == null) setCity(data.name)
            setIcon(data.weather[0].icon);
            setTemperature(data.main.temp);
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed)
            setDescription(data.weather[0].description)
        } catch (error) {
            console.error(error);
        }

    }
    const handleSearchChange = (searchData: any) => {
        // console.log(searchData)
        setCity(searchData.value)
        setIcon(null);
        setTemperature(null);
        setHumidity(null);
        setWindSpeed(null)
        setDescription(null)
        handleLatLon(searchData.lat, searchData.lon)
    }

    return (
        <div className='homecontainer'>
            <Search onSearchChange={handleSearchChange} />
            {temperature && <CityCard cityDetails={cityDetails} />}
        </div>
    )
}

export default Home