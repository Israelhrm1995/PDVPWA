import { create } from "zustand";

interface State {
    dados: any;
    setDados: (dados: any) => void;
}

export const useDataStore = create<State>((set, get) => ({
    dados: {},
    setDados: (dados: any) => set({ dados }),
}));
