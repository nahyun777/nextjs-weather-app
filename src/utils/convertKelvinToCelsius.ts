
export function convertKelvinToCelsius(tempInKelvin : number) : number
{
    let tempInCelsius = tempInKelvin - 273.15;
    return Math.floor(tempInCelsius);           // 반올림
}


