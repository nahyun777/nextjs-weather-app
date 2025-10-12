import './today_detail.css';
import { FiDroplet } from 'react-icons/fi';
import { ImMeter } from 'react-icons/im';
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu';
import { MdAir } from 'react-icons/md';

type Props = {}
export interface TodayDetailProps{
    visibility: string;
    humidity: string;
    windSpeed : string;
    airPressure: string;
    sunrise: string;
    sunset: string;
}

export default function TodayDetail(props : TodayDetailProps)
{
    const {
        visibility = "25km",
        humidity = "61%",
        windSpeed = "7 km/h",
        airPressure = "1012 hPa",
        sunrise = "6.20",
        sunset = "18:48"
    } = props;

    return(
        <>
            <SingleWeatherDetail
                information='가시성'
                icon={<LuEye />}
                value={props.visibility}
            />
            <SingleWeatherDetail
                information='습도'
                icon={<FiDroplet />}
                value={props.humidity}
            />
            <SingleWeatherDetail
                information='풍속'
                icon={<MdAir />}
                value={props.windSpeed}
            />
            <SingleWeatherDetail
                information='기압'
                icon={<ImMeter />}
                value={props.airPressure}
            />
            <SingleWeatherDetail
                information='일출 시간'
                icon={<LuSunrise />}
                value={props.sunrise}
            />
            <SingleWeatherDetail
                information='일몰 시간'
                icon={<LuSunset />}
                value={props.sunset}
            />
        </>
    )
}

export interface SingleWeatherDetailProps{
    information: string;
    icon: React.ReactNode;
    value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps){
    return(
        <div className='todaydetail-item'>
            <p className='todaydetail-info-text'>{props.information}</p>
                <div className='todaydetail-icon-size'>{props.icon}</div>
            <p>{props.value}</p>
        </div>
    )
}