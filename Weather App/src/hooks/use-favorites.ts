import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-localStorage";
interface FavoriteDataProps {
    id: string,
    lat: number,
    lon: number,
    name: string,
    country: string,
    state?: string,
    addedAt: number,
   
}

export function useFavorites() {
    const [favorite, setFavoriteHistory] = useLocalStorage<FavoriteDataProps[]>(
        "favorites",
        []);

    const queryClient = useQueryClient();

    const favoriteQuery = useQuery({
        queryKey: ['favorites'],
        queryFn: () => favorite,
        initialData: favorite,
        staleTime:Infinity
    });

    const addToFavorites = useMutation({
        mutationFn: async (
            city: Omit<FavoriteDataProps, 'id' | 'addedAt'>
        ) => {
            const newFavorite: FavoriteDataProps = {
                ...city,
                id: `${city.lat}-${city.lon}`,
                addedAt: Date.now(),
            };
            const exists = favorite.some((fav) => fav.id === newFavorite.id)
            if (exists) return favorite
            const newFavoritesElements = [...favorite, newFavorite].slice(0, 10);

            setFavoriteHistory(newFavoritesElements);
            return newFavoritesElements
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['favorites']
            })
        }
    });

    const removeFavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavoritesElements = favorite.filter((city) => city.id !== cityId)
            setFavoriteHistory(newFavoritesElements)
            return newFavoritesElements;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['favorites']
            })
        }
    })

    return {
        favorite: favoriteQuery.data,
        addToFavorites,
        removeFavorite,
        isFavorite: (lat: number, lon: number) =>
            favorite.some((city) => city.lat === lat && city.lon === lon)
    }

}