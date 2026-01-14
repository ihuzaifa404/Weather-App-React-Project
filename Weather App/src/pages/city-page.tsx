import CurrentWeather from "@/components/current-weather";
import FavoriteButton from "@/components/favorite-button";
import HourlyTemperature from "@/components/hourly-temperature";
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { AlertTriangle } from "lucide-react";
import { useParams, useSearchParams } from "react-router-dom"


function CityPage() {

    const [searchParams] = useSearchParams();
    const params = useParams()

    const lat = parseFloat(searchParams.get("lat") || "0")
    const lon = parseFloat(searchParams.get("lon") || "0")

    const coordinates = { lat, lon }

    const weatherQuery = useWeatherQuery(coordinates)
    const forecastQuery = useForecastQuery(coordinates)

    if (weatherQuery.error || forecastQuery.error) {
        return (
            <Alert variant="destructive">
                <AlertTriangle className="w-4 h-4" />
                <AlertTitle>Error.</AlertTitle>
                <AlertDescription className="flex flex-col gap-4">
                    <p>Failed to fetch Weather data. Please try again. </p>
                </AlertDescription>
            </Alert>
        )
    }

    if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {
        return <LoadingSkeleton />;
    }
    return (
        <>
            <div className="space-y-4">
                {/* Favourite cities */}
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold tracking-tight">{params.cityName},
                        {weatherQuery.data.sys.country}</h1>

                    {/* favorite button */}
                    <div>
                        <FavoriteButton data={{ ...weatherQuery.data, name: params.cityName }} />
                    </div>
                </div>
                <div className="grid gap-6 overflow-hidden">
                    <div className="flex flex-col  gap-4">

                        {/* currently weather */}
                        <CurrentWeather
                            data={weatherQuery.data}
                        />

                        {/* hourly temperature */}
                        <HourlyTemperature data={forecastQuery.data} />
                    </div>

                    <div className="grid gap-6 md:grid-cols-2 items-start">
                        {/* details */}
                        <WeatherDetails data={weatherQuery.data} />
                        {/* forecast */}
                        <WeatherForecast data={forecastQuery.data} />
                    </div>
                </div>
            </div>

        </>
    )
}
export default CityPage