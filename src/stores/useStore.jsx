import create from 'zustand';

const useStore = create((set, get) => ({
  data: [],
  isLoading: false,
  hasMore: true,
  
  addData: (newData) => set((state) => {
    const existingIds = new Set(state.data.map(item => item.id));
    const uniqueNewData = newData.filter(item => !existingIds.has(item.id));
    return { data: [...state.data, ...uniqueNewData] };
  }),
  
  setLoading: (isLoading) => set({ isLoading }),
  setHasMore: (hasMore) => set({ hasMore }),

  reset: () => set({ data: [], hasMore: true }),
}));

export default useStore;
