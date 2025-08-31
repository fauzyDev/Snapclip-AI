import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Channel } from '@/types/channel';

type ChannelStore = {
    channels: Channel[];
    isSubmitted: boolean;
    setChannels: (ch: Channel[]) => void;
    resetChannels: () => void;
}

export const useChannelStore = create<ChannelStore>()(persist(
    (set) => ({
        channels: [],
        isSubmitted: false,
        setChannels: (ch) => set({ channels: ch, isSubmitted: true }),
        resetChannels: () => set({ channels: [], isSubmitted: false })
    }),
    { name: 'channel-storage' }
))