import React from 'react'
import { Card, Statistic } from 'antd';
import "./index.css"

export interface CityDetails {
    city: string,
    icon: string,
    temperature?: number,
    humidity?: number,
    windSpeed?: number,
    description?: string,
}

function msToKmh(speedMs: number | null | undefined) {
    if (speedMs) return (speedMs * 3.6).toFixed(2);
}

function capitalizeString(str: string | undefined | null) {
    if (str) return str.charAt(0).toUpperCase() + str.slice(1);
}

const CityCard: React.FC<{ cityDetails: CityDetails }> = ({ cityDetails }) => {
    const { city, icon, temperature, humidity, windSpeed, description } = cityDetails;
    return (
        <Card title={city} bordered={false} style={{ width: 300 }}>
            <div className='card-inside'>
                <div className="left">
                    <img
                        id="wicon"
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        alt="weather icon">
                    </img>
                    <p>{capitalizeString(description)}</p>


                </div>

                <div className="right">

                    <Statistic title="Temperature" value={temperature} suffix="°C" precision={0} />
                    <Statistic title="Humidity" value={humidity} suffix="%" precision={0} />
                    <Statistic title="Windspeed" value={msToKmh(windSpeed)} suffix="km/h" precision={0} />

                </div>



                {/* <p>{temperature?.toFixed(0)}°C</p>
                <p>{humidity}%</p>
                <p>{msToKmh(windSpeed)}Km/h</p>
                <p>{icon}</p> */}
            </div>
        </Card>
    )
}

export default CityCard