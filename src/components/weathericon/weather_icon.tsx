import Image from 'next/image';
import './weather_icon.css';
import React from 'react';
import classNames from 'classnames';

type Props = {}

export default function WeatherIcon(props : React.HTMLProps<HTMLDivElement> & {iconName: string})
{
    return(
        <div {...props} className={classNames('relative h-20 w-20')}>
            <Image src={`https://openweathermap.org/img/wn/${props.iconName}@4x.png`} alt='weather-icon'
            width={100} height={100}
            className='absolute h-full w-full'/>
        </div>
    )
}

// https://openweathermap.org/img/wn/01d@4x.png
// https://openweathermap.org/img/wn/02d@4x.png


// npm install classnames : 클래스이름 이어붙이기