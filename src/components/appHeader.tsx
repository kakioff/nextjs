import { darkMode } from "@/store/atom"
import { Icon } from "@iconify/react"
import { Button, IconButton } from "@mui/material"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRecoilState } from "recoil"
import styles from "@/styles/appHeader.module.scss"
import classNames from "classnames"

interface AppHeaderOptions {
    changeTheme?(dark: boolean): void
}
export default function AppHeader({ changeTheme }: AppHeaderOptions) {
    const [themeMode, setThemeMode] = useRecoilState(darkMode),
        [loaded, setLoaded] = useState(false),
        [showBack, setShowBack] = useState(true)
    function changeThemeHeader() {
        changeTheme?.(!themeMode || false)
        setThemeMode(!themeMode)
    }
    useEffect(() => {
        changeTheme?.(themeMode || false)
        setLoaded(true)
        setTimeout(()=>{
setShowBack(false)
        }, 500)
    }, [])

    return <header className="flex justify-between items-center px-5 py-2 shadow sticky top-0 z-50 h-[56px]">
        <div>
            <div className={classNames('inset-0', 'bg-black', 'transition-all', "duration-500",
                loaded ? 'backdrop-blur-none' : 'backdrop-blur',
                loaded ? '-z-10' : 'z-50',
                loaded ? 'bg-opacity-0' : 'bg-opacity-20',
                showBack?'fixed':'none'
            )}>
                <Link href={loaded ? '/' : ''} className="w-[112px] inline-block">
                    <span className={classNames(showBack?'left-5 top-4':'left-0 top-0 transition-none', loaded ? styles.loaded : styles.loading, "font-bold", "transition-all", "duration-500")}>GOOD STUFF</span>
                </Link>
            </div>
        </div>
        <div className="md:block hidden">
            <Link href={'/'}>
                <Button>home</Button>
            </Link>
            <Link href={'/about'}>
                <Button>about</Button>
            </Link>
            <Link href={'/games'}>
                <Button>games</Button>
            </Link>
            <Link href={'/tools'}>
                <Button>tools</Button>
            </Link>
        </div>
        <div>
            <IconButton onClick={changeThemeHeader}>
                <Icon icon={themeMode == null ? 'tabler:device-desktop-cog' :
                    themeMode ? 'tabler:moon-filled' : 'tabler:sun-filled'} />
            </IconButton>
        </div>
    </header>
}