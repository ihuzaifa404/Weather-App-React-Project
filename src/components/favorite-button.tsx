import type { WeatherData } from "@/api/types"
import { useFavorites } from "@/hooks/use-favorites"
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { toast } from "sonner";

interface FavoriteButtonProps {
    data: WeatherData
}

function FavoriteButton({ data }: FavoriteButtonProps) {

    const { addToFavorites, isFavorite, removeFavorite } = useFavorites();
    const isCurrentlyFavorite = isFavorite(data.coord.lat, data.coord.lon);

    const handleFavorite = () => {
        const currentlyFav = isFavorite(data.coord.lat, data.coord.lon);

        if (currentlyFav) {
            removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`.trim())
            toast.error(`Removed ${data.name} from Favorites`)
        } else {
            addToFavorites.mutate({
                name: data.name,
                lat: data.coord.lat,
                lon: data.coord.lon,
                country: data.sys.country
            });
            toast.success(`Added ${data.name} to Favorites`)
        }
    }
    return (
        <Button variant={isCurrentlyFavorite ? "default" : "outline"}
            size={"icon"}
            onClick={handleFavorite}
            className={`cursor-pointer ${isCurrentlyFavorite ? "bg-yellow-500 hover:bg-yellow-600 p-0" : ""}`}>
            <Star className={`w-4 h-4 ${isCurrentlyFavorite ? "fill-current" : ""}`} />
        </Button>
    )
}

export default FavoriteButton
