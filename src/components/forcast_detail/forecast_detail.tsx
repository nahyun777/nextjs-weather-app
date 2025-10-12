import { convertKelvinToCelsius } from '@/utils/convertKelvinToCelsius';
import ListBox from '../listbox/listbox';
import TodayDetail, { TodayDetailProps } from '../today_detail/today_detail';
import WeatherIcon from '../weathericon/weather_icon';
import './forecast_detail.css';

type Props = {}

export interface ForecastDetailProps extends TodayDetailProps{
    weatherIcon : string;
    date : string;
    day : string;
    temp : number;
    feels_like : number;
    temp_min : number;
    temp_max : number;
    description : string;
}

export default function ForecastDetail(props : ForecastDetailProps)
{
    const {
        weatherIcon = "02d",
        date = "19.09",
        day = "Monday",
        temp,
        feels_like,
        temp_min,
        temp_max,
        description
    } = props;

    return(
        <ListBox className='box-style5'>
            <section className='forecast-left-section'>
                <div>
                    <WeatherIcon iconName={weatherIcon} />
                    <p style={{fontSize:'1rem'}}>{date}</p>
                    <p style={{fontSize:'1rem'}}>{day}</p>
                </div>

                <div className='additional-info'>
                    <span>{convertKelvinToCelsius(temp ?? 0)}℃</span>
                    <p className='additional-para'>
                        <span>체감 온도</span>
                        <span>{convertKelvinToCelsius(feels_like ?? 0)}℃</span>
                    </p>
                    <p style={{textTransform:'capitalize'}}>
                        {description}
                    </p>
                </div>
            </section>
            <section className='forecast-right-section'>
                <TodayDetail {...props} />
            </section>
        </ListBox>
    )
}