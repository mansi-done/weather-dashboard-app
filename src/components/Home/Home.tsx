import React, { useState, useEffect } from 'react'
import CityCard, { CityDetails } from '../CityCard/CityCard';
import Search from '../Search/Search';
import "./index.css"
import axios from 'axios';
import { genOpenWeatherAPI } from '../../api/api';
import { Switch } from 'antd';

const Home = () => {

    const [city, setCity] = useState<any>(null);
    const [icon, setIcon] = useState<any>(null);
    const [temperature, setTemperature] = useState<any>(null);
    const [humidity, setHumidity] = useState<any>(null);
    const [windSpeed, setWindSpeed] = useState<any>(null);
    const [description, setDescription] = useState<any>(null);
    const [position, setPosition] = useState<any>({ latitude: null, longitude: null });
    const [tempMax, setTempMax] =  useState<any>(null);
    const [tempMin, setTempMin] =  useState<any>(null);
    const [unitC,setUnitC] = useState<boolean>(true)


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
        handleLatLon(position.latitude, position.longitude)
    }, [position])


    const cityDetails: CityDetails = {
        city: city,
        icon: icon,
        temperature: temperature,
        humidity: humidity,
        windSpeed: windSpeed,
        description: description,
        tempMax : tempMax,
        tempMin : tempMin,
    };

    const handleLatLon = async (lat: number, lon: number) => {
        try {
            const response = await axios.request(genOpenWeatherAPI(lat, lon));
            const data = response.data;
            if(city == null) setCity(data.name)
            setIcon(data.weather[0].icon);
            setTemperature(data.main.temp);
            setTempMax(data.main.temp_max)
            setTempMin(data.main.temp_min)
            setHumidity(data.main.humidity);
            setWindSpeed(data.wind.speed)
            setDescription(data.weather[0].description)
        } catch (error) {
            console.error(error);
        }

    }
    const handleSearchChange = (searchData: any) => {
        setCity(searchData.value)
        setIcon(null);
        setTemperature(null);
        setHumidity(null);
        setWindSpeed(null)
        setDescription(null)
        handleLatLon(searchData.lat, searchData.lon)
    }

    const handleUnitChange = (checked:any)=>{
        setUnitC(!checked)
    }

    return (
        <div className='homecontainer'>
            <Search onSearchChange={handleSearchChange} />
            {temperature && <CityCard unitC={unitC} cityDetails={cityDetails} />}
            <div className="switch"><Switch checkedChildren="F" unCheckedChildren="C" onChange={handleUnitChange}/></div>
        </div>
    )
}

export default Home