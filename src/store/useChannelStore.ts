import { create } from 'zustand';
import { Channel } from '@/types/channel';

type ChannelStore = {
    channels: Channel[]
    setChannels: (channels: Channel[]) => void,
}

export const useChannelStore = create<ChannelStore>((set) => ({
    channels: [],
    setChannels: (channels) => set({ channels })
}))