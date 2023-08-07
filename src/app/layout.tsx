"use client"
import './globals.css'
import { Inter } from 'next/font/google'
import classNames from "classnames"
import AppHeader from '@/components/appHeader'
import { ReactElement, Suspense, useEffect, useState } from 'react'
import { ThemeProvider, createTheme } from '@mui/material'
import { RecoilRoot } from 'recoil'
import { Metadata } from 'next'
import Loading from './loading'
import { WebSocketProvider } from '@/components/websocket'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: '很不错的东西',
  description: '一些很不错的东西，一个很不错的网站',
  icons: '/favicon.ico'
}
export default function RootLayout({ children }: { children: ReactElement }) {
  const [darkMode, setDarkMode] = useState(false),
    theme = createTheme({
      palette: {
        mode: darkMode ? 'dark' : 'light'
      }
    })

  return (<html className={classNames({ 'dark': darkMode })}>
    <body className='dark:bg-gray-900 dark:text-gray-100 transition-colors'>
      <WebSocketProvider url="ws://127.0.0.1:8000/ws">
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <AppHeader changeTheme={m => { setDarkMode(m) }} />
            <Suspense fallback={<Loading />}>
              <main className='z-10 relative h-[calc(100vh-56px)] overflow-auto'>
                {/* <Component {...pageProps} socket={socket} /> */}
                {children}
              </main>
            </Suspense>
          </RecoilRoot>
        </ThemeProvider>
      </WebSocketProvider>
    </body>
  </html>)
}
