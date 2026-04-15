
import { create } from 'zustand';
import { toast } from 'sonner';
import type { ApiResponse, ListResponse, PageResponse } from '@/types/common';
import { normalizePagePayload } from '@/types/common';

interface ResourceApi<TItem, TParams> {
  list?: (params?: TParams) => Promise<{ data: PageResponse<TItem> | ListResponse<TItem> }>;
  remove?: (id: string | number) => Promise<{ data: ApiResponse<unknown> }>;
}

export interface ResourceStoreState<TItem, TParams extends object> {
  list: TItem[];
  total: number;
  loading: boolean;
  params: TParams;
  setParams: (patch: Partial<TParams>) => void;
  resetParams: () => void;
  fetchList: () => Promise<void>;
  removeItem: (id: string | number) => Promise<void>;
  reset: () => void;
}

export function createResourceStore<TItem, TParams extends object>(
  api: ResourceApi<TItem, TParams>,
  initialParams: TParams
) {
  return create<ResourceStoreState<TItem, TParams>>((set, get) => ({
    list: [],
    total: 0,
    loading: false,
    params: initialParams,
    setParams: (patch) => set((state) => ({ params: { ...state.params, ...patch } })),
    resetParams: () => set({ params: initialParams }),
    fetchList: async () => {
      if (!api.list) return;
      set({ loading: true });
      try {
        const result = await api.list(get().params);
        const page = normalizePagePayload(result.data);
        set({ list: page.list, total: page.total });
      } catch (error) {
        console.error(error);
        toast.error('列表加载失败');
      } finally {
        set({ loading: false });
      }
    },
    removeItem: async (id) => {
      if (!api.remove) return;
      try {
        await api.remove(id);
        toast.success('删除成功');
        await get().fetchList();
      } catch (error) {
        console.error(error);
        toast.error('删除失败');
      }
    },
    reset: () => set({ list: [], total: 0, params: initialParams }),
  }));
}
