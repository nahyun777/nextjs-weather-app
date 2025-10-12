'use client';

import Navbar from "@/components/navbar/navbar";
import styles from "./page.module.css";
import { useQuery } from "react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import ListBox from "@/components/listbox/listbox";
import { convertKelvinToCelsius } from "@/utils/convertKelvinToCelsius";
import WeatherIcon from "@/components/weathericon/weather_icon";
import TodayDetail from "@/components/today_detail/today_detail";
import { metersToKilometers } from "@/utils/metersToKilometers";
import { convertWindSpeed } from "@/utils/convertWindSpeed";
import ForecastDetail from "@/components/forcast_detail/forecast_detail";
import { useEffect, useState } from "react";
import Gpt from "@/components/gpt/gpt";

// 테스트URL [API페이지의 5 Day / 3 Hour Forecast] - Key생성 후 약 5분 대기 필요
// https://api.openweathermap.org/data/2.5/forecast?q=seoul&appid=2d557665e2a5d037da5e63113777afca&cnt=2
// https://api.openweathermap.org/data/2.5/forecast?q=incheon&appid=2d557665e2a5d037da5e63113777afca&cnt=56

interface WeatherData {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherList[];
  city: City;
}

interface WeatherList {
  dt: number;
  main: Main;
  weather: Weather[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  sys: Sys;
  dt_txt: string;
}

interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface Clouds {
  all: number;
}

interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

interface Sys {
  pod: string;
}

interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

interface Coord {
  lat: number;
  lon: number;
}

export default function Home() {
  const location: string[] = [
    // United States
    'new york', 'los angeles', 'chicago', 'houston', 'phoenix', 'philadelphia', 'san antonio', 'san diego', 'dallas', 'san jose', 'austin', 'jacksonville', 'fort worth', 'columbus', 'charlotte', 'san francisco', 'indianapolis', 'seattle', 'denver', 'washington',
    // United Kingdom
    'london', 'birmingham', 'leeds', 'glasgow', 'sheffield', 'manchester', 'liverpool', 'bristol', 'newcastle', 'nottingham', 'southampton', 'portsmouth', 'plymouth', 'brighton', 'leicester', 'edinburgh', 'cardiff', 'belfast', 'stoke-on-trent', 'coventry',
    // France
    'paris', 'marseille', 'lyon', 'toulouse', 'nice', 'nantes', 'strasbourg', 'montpellier', 'bordeaux', 'lille', 'rennes', 'reims', 'le havre', 'saint-étienne', 'toulon', 'angers', 'grenoble', 'dijon', 'nîmes', 'aix-en-provence',
    // Japan
    'tokyo', 'yokohama', 'osaka', 'nagoya', 'sapporo', 'kobe', 'kyoto', 'fukuoka', 'kawasaki', 'hiroshima', 'sendai', 'kitakyushu', 'chiba', 'sakai', 'niigata', 'hamamatsu', 'shizuoka', 'sagamihara', 'okayama', 'kumamoto',
    // South Korea
    'seoul', 'busan', 'incheon', 'daegu', 'daejeon', 'gwangju', 'suwon', 'ulsan', 'changwon', 'goyang', 'yongin', 'seongnam', 'cheongju', 'jeonju', 'cheonan', 'ansan', 'jeju', 'hwaseong', 'gimhae', 'pohang', 'jinju', 'gyeongju', 'mokpo', 'suncheon', 'chuncheon', 'wonju', 'gumi', 'iksan', 'andong', 'yangsan', 'gunsan', 'gwangmyeong', 'asan', 'pyeongtaek', 'siheung', 'paju', 'gimpo', 'uijeongbu', 'donghae', 'gangneung',
    // China
    'beijing', 'shanghai', 'guangzhou', 'shenzhen', 'chengdu', 'wuhan', 'tianjin', 'hangzhou', 'chongqing', 'nanjing', 'shenyang', 'xi\'an', 'harbin', 'suzhou', 'qingdao', 'dalian', 'zhengzhou', 'jinan', 'changsha', 'kunming', 'fuzhou', 'changchun', 'nanning', 'hefei', 'shijiazhuang', 'guiyang', 'ningbo', 'taiyuan', 'xiamen', 'urumqi', 'shijiazhuang', 'lanzhou', 'haikou', 'sanya',
    // India
    'mumbai', 'delhi', 'bangalore', 'hyderabad', 'ahmedabad', 'chennai', 'kolkata', 'surat', 'pune', 'jaipur', 'lucknow', 'kanpur', 'nagpur', 'visakhapatnam', 'indore', 'thane', 'bhopal', 'patna', 'vadodara', 'ghaziabad', 'ludhiana', 'agra', 'nashik', 'ranchi', 'faridabad', 'meerut', 'rajkot', 'kalyan-dombivli', 'vasai-virar', 'varanasi', 'srinagar', 'aurangabad', 'dhanbad', 'amritsar', 'navi mumbai', 'allahabad', 'howrah', 'gwalior', 'jabalpur',
    // Russia
    'moscow', 'saint petersburg', 'novosibirsk', 'yekaterinburg', 'nizhny novgorod', 'kazan', 'chelyabinsk', 'omsk', 'samara', 'rostov-on-don', 'ufa', 'krasnoyarsk', 'voronezh', 'perm', 'volgograd', 'krasnodar', 'saratov', 'tyumen', 'tolyatti', 'izhevsk', 'barnaul', 'ulyanovsk', 'irkutsk', 'khabarovsk', 'yaroslavl', 'vladivostok', 'makhachkala', 'tomsk', 'orenburg', 'kemerovo', 'novokuznetsk', 'ryazan', 'astrakhan', 'penza', 'lipetsk', 'kirov', 'cheboksary', 'kaliningrad', 'bryansk',
    // Australia
    'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide', 'gold coast', 'canberra', 'newcastle', 'wollongong', 'logan city', 'geelong', 'hobart', 'townsville', 'cairns', 'toowoomba', 'darwin', 'ballarat', 'bendigo', 'launceston', 'mackay', 'rockhampton', 'bunbury', 'bundaberg', 'hervey bay', 'maitland',
    // Germany
    'berlin', 'hamburg', 'munich', 'cologne', 'frankfurt', 'stuttgart', 'düsseldorf', 'dortmund', 'essen', 'leipzig', 'bremen', 'dresden', 'hanover', 'nuremberg', 'duisburg', 'bochum', 'wuppertal', 'bielefeld', 'bonn', 'münster', 'karlsruhe', 'mannheim', 'augsburg', 'wiesbaden', 'gelsenkirchen', 'mönchengladbach', 'braunschweig', 'chemnitz', 'aachen', 'kiel', 'halle', 'magdeburg', 'krefeld', 'freiburg', 'lübeck', 'oberhausen', 'erfurt', 'mainz', 'rostock', 'kassel',
    // Italy
    'rome', 'milan', 'naples', 'turin', 'palermo', 'genoa', 'bologna', 'florence', 'catania', 'bari', 'venice', 'verona', 'messina', 'padua', 'trieste', 'brescia', 'taranto', 'parma', 'prato', 'modena', 'reggio calabria', 'reggio emilia', 'perugia', 'livorno', 'ravenna', 'cagliari', 'foggia', 'rimini', 'salerno', 'ferrara',
    // Spain
    'madrid', 'barcelona', 'valencia', 'seville', 'zaragoza', 'málaga', 'murcia', 'palma', 'las palmas', 'bilbao', 'alicante', 'córdoba', 'valladolid', 'vigo', 'gijón', 'hospitalet de llobregat', 'vitoria-gasteiz', 'granada', 'elche', 'oviedo', 'badalona', 'cartagena', 'terrassa', 'jerez de la frontera', 'sabadell', 'móstoles', 'santa cruz de tenerife', 'alcalá de henares', 'pamplona', 'fuenlabrada', 'almería', 'leganés', 'san sebastián', 'burgos', 'santander', 'castellón de la plana', 'getafe', 'alcorcón', 'albacete',
    // Canada
    'toronto', 'montreal', 'vancouver', 'calgary', 'edmonton', 'ottawa', 'winnipeg', 'quebec city', 'hamilton', 'kitchener', 'london', 'victoria', 'halifax', 'oshawa', 'windsor', 'saskatoon', 'regina', 'st. john\'s', 'barrie', 'kelowna', 'abbotsford', 'sherbrooke', 'sudbury', 'kingston', 'saguenay', 'trois-rivières', 'guelph', 'moncton', 'brantford', 'saint john', 'thunder bay', 'charlottetown', 'red deer', 'lethbridge', 'kamloops', 'nanaimo', 'fredericton', 'saint-jérôme', 'peterborough',
    // Brazil
    'são paulo', 'rio de janeiro', 'brasília', 'salvador', 'fortaleza', 'belo horizonte', 'manaus', 'curitiba', 'recife', 'goiânia', 'belém', 'porto alegre', 'guarulhos', 'campinas', 'são luís', 'são gonçalo', 'maceió', 'duque de caxias', 'natal', 'teresina', 'nova iguaçu', 'são bernardo do campo', 'campo grande', 'joão pessoa', 'ribeirão preto', 'jaboatão dos guararapes', 'contagem', 'aracaju', 'feira de santana', 'sorocaba', 'londrina', 'juiz de fora', 'joinville', 'ananindeua', 'uberlândia', 'pelotas', 'blumenau', 'niterói', 'macapá',
    // South Africa
    'cape town', 'johannesburg', 'durban', 'pretoria', 'port elizabeth', 'bloemfontein', 'east london', 'nelspruit', 'kimberley', 'polokwane', 'pietermaritzburg', 'vereeniging', 'welkom', 'klerksdorp', 'george', 'witbank', 'potchefstroom', 'rustenburg', 'bethlehem', 'grahamstown', 'stellenbosch', 'rustenburg', 'sasolburg', 'newcastle', 'kroonstad', 'phalaborwa', 'carletonville', 'vryheid', 'kuruman', 'kathu',
    // Egypt
    'cairo', 'alexandria', 'giza', 'shubra el kheima', 'port said', 'suez', 'luxor', 'mansoura', 'tanta', 'asyut', 'ismailia', 'faiyum', 'zagazig', 'damietta', 'aswan', 'minya', 'beni suef', 'qena', 'sohag', 'shibin el kom', 'banha', 'arish', 'mallawi', '10th of ramadan city', 'bilqas', 'el quseir', 'hurghada', 'borg el arab', 'matruh', 'el kharga',
    // Turkey
    'istanbul', 'ankara', 'izmir', 'bursa', 'adana', 'gaziantep', 'konya', 'antalya', 'kayseri', 'mersin', 'eskisehir', 'diyarbakir', 'samsun', 'denizli', 'sanliurfa', 'adapazari', 'malatya', 'kahramanmaras', 'erzurum', 'van', 'batman', 'elazig', 'izmit', 'afyonkarahisar', 'tekirdag', 'trabzon', 'ordu', 'sivas', 'usak', 'aydin',
    // Argentina
    'buenos aires', 'córdoba', 'rosario', 'mendoza', 'la plata', 'san miguel de tucumán', 'mar del plata', 'salta', 'santa fe', 'san juan', 'resistencia', 'santiago del estero', 'corrientes', 'bahía blanca', 'paraná', 'neuquén', 'formosa', 'san luis', 'san salvador de jujuy', 'santa rosa', 'catamarca', 'río gallegos', 'comodoro rivadavia', 'posadas', 'rafaela', 'san fernando del valle de catamarca', 'la rioja', 'san carlos de bariloche', 'tandil', 'villa maría',
    // Mexico
    'mexico city', 'guadalajara', 'monterrey', 'puebla', 'tijuana', 'león', 'ciudad juárez', 'zapopan', 'monterrey', 'mérida', 'cancún', 'querétaro', 'morelia', 'aguascalientes', 'hermosillo', 'saltillo', 'culiacán', 'chihuahua', 'san luis potosí', 'torreón', 'veracruz', 'villahermosa', 'xalapa', 'irapuato', 'mazatlán', 'durango', 'cuernavaca', 'celaya', 'matamoros', 'nuevo laredo',
    // Indonesia
    'jakarta', 'surabaya', 'bandung', 'medan', 'bekasi', 'tangerang', 'depok', 'semarang', 'palembang', 'makassar', 'batam', 'pekanbaru', 'bogor', 'bandar lampung', 'malang', 'padang', 'denpasar', 'samarinda', 'tasikmalaya', 'banjarmasin', 'balikpapan', 'jambi city', 'surakarta', 'manado', 'yogyakarta', 'mataram', 'kupang', 'cilegon', 'kendari', 'bengkulu',
    // Thailand
    'bangkok', 'nonthaburi', 'nakhon ratchasima', 'chiang mai', 'hat yai', 'udon thani', 'pak kret', 'khon kaen', 'ubon ratchathani', 'nakhon si thammarat', 'songkhla', 'surat thani', 'phitsanulok', 'pattaya', 'lampang', 'trang', 'rayong', 'chiang rai', 'nakhon sawan', 'phuket'
  ];
  
  const [place, setPlace] = useState('seoul')   // 기본값
  const { isLoading, error, data, refetch} = useQuery<WeatherData>(
    "repoData",
    async ()=>{
      const {data} = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
  });

  useEffect(()=>{
    refetch();
  }, [place, refetch]);

  console.log('data', data);
  console.log('country: ', data?.city.country);
  console.log('city name: ', data?.city.name);

  const filteredList = data?.list.filter(item=>item.dt_txt.endsWith("00:00:00"));
  console.log('필터링:', filteredList);

  const todayData = data?.list[1];
  const daysInKorea = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"]
  const today = new Date();
  const dayInKorea = daysInKorea[today.getDay()];

  function formatDate(dateTimeString : string | undefined){
    if(!dateTimeString){
      return '';
    }

    const datepart = dateTimeString.split(' ')[0];
    const [year, month, day] = datepart.split('-');

    return `${year}.${month}.${day}`;       // 2024-07-12 00:00:00 --> 2024.07.12
  }

  if (isLoading){
    return(
      <div className={styles.homeLoadingBox}>
        <p className={styles.homeLoadingText}>Loading...</p>
      </div>
    )
  } 

  return (
    <div className={styles.homeContainer}>
      <Navbar place={place} setPlace={setPlace} location={location}/>
      <main className={styles.homeMain}>
        {/* 오늘 */}
        <section className={styles.spaceY4}>
          <div className={styles.spaceY2}>
            <h2 className={styles.todayHeader}>
              <p>{dayInKorea}</p>
              <p>({formatDate(todayData?.dt_txt)})</p>
            </h2>
            <ListBox className="box-style2">
              <div className={styles.flexColumnP4}>
                <span className={styles.fontSize48}>
                  {convertKelvinToCelsius(todayData?.main.temp ?? 296.37)}℃
                </span>
                <p className={styles.nowrapText}>
                  <span>체감온도</span>
                  <span>
                    {convertKelvinToCelsius(todayData?.main.feels_like ?? 296.37)}℃
                  </span>
                </p>
                <p className={styles.minmaxText}>
                  <span>
                    {convertKelvinToCelsius(todayData?.main.temp_min ?? 296.37)}℃↓
                  </span>
                  <span>
                    {convertKelvinToCelsius(todayData?.main.temp_max ?? 296.37)}℃↑
                  </span>
                </p>
              </div>
              {/* 시간 및 날씨 아이콘 */}
              <div className={styles.todayInfo}>
                {
                  data?.list.slice(1).map((item, index)=>{
                    return(
                      <div className={styles.todayItem} key={index+1}>
                        <p>
                          {
                            item.dt_txt
                          }
                        </p>
                        <WeatherIcon iconName={item.weather[0].icon}/>
                        <p >
                          {
                            convertKelvinToCelsius(item?.main.temp ?? 0)
                          }℃
                        </p>
                      </div>
                    )
                  })
                }
              </div>
            </ListBox>
          </div>
          {/* today 두번째 박스 */}
          <div className={styles.todaySecondBox}>
              {/* 왼쪽 */}
              <ListBox className="box-style3">
                <p className={styles.todaySecondTitle}>
                  {todayData?.weather[0].description}
                </p>
                  <WeatherIcon iconName={todayData?.weather[0].icon ?? ""}/>
              </ListBox>
              {/* 오른쪽 */}
              <ListBox className="box-style4">
                <TodayDetail 
                  visibility={metersToKilometers(todayData?.visibility ?? 10000)} 
                  humidity={`${todayData?.main.humidity}%`} 
                  windSpeed={convertWindSpeed(todayData?.wind.speed ?? 0.0)} 
                  airPressure={`${todayData?.main.pressure} hPa`} 
                  sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "H:mm")} 
                  sunset={format(fromUnixTime(data?.city.sunset ?? 0), "H:mm")}
                />
              </ListBox>
          </div>
        </section>

        <section className={styles.gptSection}>
            <Gpt />
        </section>

        {/* 일주일 예보 */}
        <section className={styles.forecastSectionFlex}>
          <strong>일기예보 (자정 기준)</strong>
          {
            filteredList && filteredList.map((item, index)=>{
              return(
                <ForecastDetail 
                    key={index}
                    description="33"
                    weatherIcon="02d"
                    date={format(parseISO(item.dt_txt ?? ""), "MM월 dd일")}
                    day={format(parseISO(item.dt_txt ?? ""), "EEEE")}
                    feels_like={item.main.feels_like ?? 0}
                    temp={item.main.temp ?? 0}
                    temp_max={item.main.temp_max ?? 0}
                    temp_min={item.main.temp_min ?? 0}
                    airPressure={`${item.main.pressure} hPa`}
                    humidity={`${item.main.humidity}%`}
                    sunrise={format(fromUnixTime(data?.city.sunrise ?? 0), "H:mm")} 
                    sunset={format(fromUnixTime(data?.city.sunset ?? 0), "H:mm")}
                    visibility={`${metersToKilometers(item.visibility ?? 10000)} `}
                    windSpeed={`${convertWindSpeed(item.wind.speed ?? 1.64)}`}
                  />
              )
            })
          }
          
        </section>

        <section className={styles.boardSectionGrid}>
          <h2>검색 도시 안내</h2>
          <div className={styles.searchBoard}>
            {
              location.map((item, index)=>{
                return(
                  <p key={index}>{item}</p>
                )
              })
            }
          </div>
          
        </section>
      </main>
    </div>
  );
}

// favicon.ico를 지우고 icon.png 를 app 폴더에 넣는다 ==> title 로고이미지가 바뀐다
// npm install axios
// npm install date-fns@2.30.0
