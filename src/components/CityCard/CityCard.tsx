import React,{useState,useEffect} from 'react'
import { Card, Statistic } from 'antd';
import "./index.css"

export interface CityDetails {
    city: string,
    icon: string,
    temperature?: number,
    humidity?: number,
    windSpeed?: number,
    description?: string,
    tempMax?: number,
    tempMin?: number
}

function msToKmh(speedMs: number | null | undefined) {
    if (speedMs) return (speedMs * 3.6).toFixed(2);
}

function capitalizeString(str: string | undefined | null) {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
}

function celsiusToFahrenheit(tempCelsius: any) {
    return tempCelsius * 9 / 5 + 32;
}

const CityCard: React.FC<{ cityDetails: CityDetails, unitC: boolean }> = ({ cityDetails, unitC }) => {
    const { city, icon, temperature, humidity, windSpeed, description, tempMax, tempMin } = cityDetails;
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 600px)").matches
    )

    useEffect(() => {
        window
        .matchMedia("(min-width: 600px)")
        .addEventListener('change', e => setMatches( e.matches ));
      }, []);
    return (
        <Card title={city} bordered={false} style={{width: matches ? 500 : 300 }}>
            <div className='card-inside'>
                <div className="left">
                    <img
                        id="wicon"
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="weather icon">
                    </img>
                    <p>{capitalizeString(description)}</p>
                    <div className="temps">
                        <Statistic valueStyle={{ fontSize: 15 }} title="Max. Temp" value={unitC ? tempMax : celsiusToFahrenheit(tempMax)} suffix={unitC ? "°C" : "°F"} precision={0} />
                        <Statistic valueStyle={{ fontSize: 15 }} title="Min. Temp" value={unitC ? tempMin : celsiusToFahrenheit(tempMin)} suffix={unitC ? "°C" : "°F"} precision={0} />

                    </div>
                </div>
                <div className="right">
                    <Statistic title="Temperature" value={unitC ? temperature : celsiusToFahrenheit(temperature)} suffix={unitC ? "°C" : "°F"} precision={0} />
                    <Statistic title="Humidity" value={humidity} suffix="%" precision={0} />
                    <Statistic title="Windspeed" value={msToKmh(windSpeed)} suffix="km/h" precision={0} />
                </div>
            </div>
        </Card>
    )
}

export default CityCard