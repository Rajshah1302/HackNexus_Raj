import {
  scrollSepolia,
} from 'wagmi/chains'
import {
  getDefaultConfig,
} from '@rainbow-me/rainbowkit'
import { ethereumClassic } from '@/components/EthereumClassic'
// import { milkomeda } from '@/components/Milkomeda'

export const config = getDefaultConfig({
  appName: 'HackNexus',
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID ?? '',
  chains: [
    // scrollSepolia,
    ethereumClassic,
  ],
  ssr: true,
})
