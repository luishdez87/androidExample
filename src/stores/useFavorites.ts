import {StateCreator, create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import {Show} from '../models/show';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FavoritesStore {
  favorites: Show[];
  onAddFavorite: (show: Show) => void;
  onRemoveFavorite: (id: number) => void;
  checkIsInFavorites: (id: number) => boolean;
}

const slice: StateCreator<FavoritesStore> = (set, get) => ({
  favorites: [],
  onAddFavorite: (show: Show) => {
    const list = get().favorites;
    set({favorites: [show, ...list]});
  },
  onRemoveFavorite: (id: number) => {
    const filtered = get().favorites.filter(show => show.id !== id);
    set({favorites: filtered});
  },
  checkIsInFavorites: (id: number) => {
    const found = get().favorites.find(show => show.id === id);
    return found !== undefined;
  },
});

export const useFavoritesStore = create<FavoritesStore>()(
  persist(slice, {
    name: 'favorites-store',
    storage: createJSONStorage(() => AsyncStorage),
  }),
);
