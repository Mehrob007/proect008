
import create from 'zustand';

const useStore = create((set, get) => ({
  data: [],
  isLoading: false,
  hasMore: true,
 
  addData: newData => set(state => ({ data: [...state.data, ...newData] })),
  setLoading: isLoading => set({ isLoading }),
  setHasMore: hasMore => set({ hasMore }),

  reset: () => set({ data: [], hasMore: true })
}));

export default useStore;
