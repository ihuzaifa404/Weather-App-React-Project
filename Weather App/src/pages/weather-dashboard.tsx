import { Button } from "@/components/ui/button"
import useGeolocation from "@/hooks/use-geolocation"
import { AlertTriangle, MapPin, RefreshCw } from "lucide-react"
import { LoadingSkeleton } from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import CurrentWeather from "@/components/current-weather";
import HourlyTemperature from "@/components/hourly-temperature";
import WeatherDetails from "@/components/weather-details";
import WeatherForecast from "@/components/weather-forecast";
import FavoriteCities from "@/components/favorite-cities";

function WeatherDashboard() {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeolocation();

  const locationQuery = useReverseGeocodeQuery(coordinates)
  const weatherQuery = useWeatherQuery(coordinates)
  const forecastQuery = useForecastQuery(coordinates)



  const handleRefresh = () => {
    getLocation();

    if (coordinates) {
      // reload weather date 
      locationQuery.refetch()
      weatherQuery.refetch()
      forecastQuery.refetch()
    }

  }
  if (locationLoading) {
    return <LoadingSkeleton />
  }
  if (locationError) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="w-4 h-4" />
        <AlertTitle>Location Error.</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{locationError}</p>
          <Button onClick={getLocation} className="w-fit cursor-pointer" variant={"outline"} >
            <MapPin className="mr-2 w-4 h-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  if (!coordinates) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Location Required.</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Please enable location access to see your local weather.</p>
          <Button onClick={getLocation} className="w-fit cursor-pointer" variant={"outline"} >
            <MapPin className="mr-2 w-4 h-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  const locationName = locationQuery.data?.[0]

  if (weatherQuery.error || forecastQuery.error) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="w-4 h-4" />
        <AlertTitle>Error.</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>Failed to fetch Weather data. Please try again. </p>
          <Button onClick={handleRefresh} className="w-fit cursor-pointer" variant={"outline"}>
            <RefreshCw className={`mr-2 w-4 h-4 `} />
            retry
          </Button>
        </AlertDescription>
      </Alert>
    )
  }
  if (!weatherQuery.data || !forecastQuery.data) {
    return <LoadingSkeleton />;
  }

  return (
    <div className="space-y-4">
      {/* Favourite cities */}
        <FavoriteCities/>
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold tracking-tight">My Location</h1>
        <Button
          className="cursor-pointer"
          variant={"outline"}
          size={"icon"}
          onClick={handleRefresh}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching} >

          <RefreshCw className={` w-4 h-4 ${weatherQuery.isFetching ? "animate-spin" : ""}`} />

        </Button>
      </div>
      {/* Current and Hourly Weather */}
      <div className="grid gap-6 overflow-hidden">
        <div className="flex flex-col lg:flex-row gap-4">

          {/* currently weather */}
          <CurrentWeather 
          data={weatherQuery.data}
          locationName={locationName} />
          
          {/* hourly temperature */}
        <HourlyTemperature data={forecastQuery.data}/>
        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">
          {/* details */}
          <WeatherDetails data={weatherQuery.data}/>
          {/* forecast */}
          <WeatherForecast data={forecastQuery.data}/>
        </div>
      </div>
    </div>
  )
}

export default WeatherDashboard
