import { Button } from "@mui/material";
import Link from "next/link";

export default function Tools(){
    return <div>
        <Link href={'/tools/chat'}>
            <Button>chat</Button>
        </Link>
    </div>
}