import Image from "next/image";
import { Loader2 } from "lucide-react";

export default function LoadingPage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <Image src="/logo.png" alt="Logo" width={100} height={100} />
            <Loader2 className="animate-spin" color="#A6A6A6" size={50} />
        </div>
    );
}