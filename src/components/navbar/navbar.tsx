'use client';
import { MdWbSunny } from 'react-icons/md';
import './navbar.css';
import SearchBox from '../searchbox/searchbox';
import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

type Props = {place:string, setPlace:Dispatch<SetStateAction<string>>, location:string[]}

export default function Navbar(props: Props){
    const [city, setCity] = useState('');
    const [error, setError] = useState('');

    async function handleInputChange(value: string){
        setCity(value);
        if(value.length >= 3){
            try{
                const res = await axios.get(
                    `https://api.openweathermap.org/data/2.5/forecast?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
                );
                setError("");
            }catch(error){
                console.log(error);
            }
        }
    }

    function handleSubmitSearch(e:React.FormEvent<HTMLFormElement>){
        e.preventDefault();         // 새로고침 안되게 막기
        if(props.location.includes(city.toLowerCase())){
            setError("")
            props.setPlace(city);
        }else{
            setError("Location not found")
        }
    }

    return(
        <div className="navbar-container">
            <div className="navbar-inner">
                <div className="navbar-title">
                    <h2 className="navbar-heading">Nextjs 날씨앱</h2>
                    <MdWbSunny className="navbar-logo-icon" />
                </div>

                <section className='navbar-section'>
                    <p className='location-text'>{props.place}</p>
                    <div style={{position:'relative'}}>
                        <SearchBox searchValue={city} onSubmit={handleSubmitSearch} onChange={(e)=>handleInputChange(e.target.value)} />
                        {
                            error && (
                                <p style={{color:'red'}}>
                                    {error}
                                </p>
                            )
                        }
                    </div>
                </section>
            </div>
      </div>
    )
}

// npm install react-icons --save