import { create } from 'zustand';

type Channel = {
    id: string,
    name: string
}

type ChannelStore = {
    channels: Channel[]
    setChannels: (channels: Channel[]) => void,
}

export const useChannelStore = create<ChannelStore>((set) => ({
    channels: [],
    setChannels: (channels) => set({ channels })
}))