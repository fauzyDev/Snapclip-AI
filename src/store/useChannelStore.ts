import { create } from 'zustand';
import { Channel } from '@/types/channel';

type ChannelStore = {
    channels: Channel[];
    isSubmitted: boolean;
    setChannels: (ch: Channel[]) => void;
    resetChannels: () => void;
}

export const useChannelStore = create<ChannelStore>((set) => ({
    channels: [],
    isSubmitted: false,
    setChannels: (ch) => set({ channels: ch, isSubmitted: true }),
    resetChannels: () => set({ channels: [], isSubmitted: false })
}))