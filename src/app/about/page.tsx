import { Metadata } from "next"

export const metadata: Metadata = {
    title: "关于这个网站"
}

export default function About(){
    return <div className="h-full">
        about page
        <div className="h-full"></div>
        end
    </div>
}