import { Button } from "@/components/ui/button"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { LogOut, UserCircle } from "lucide-react"
import Image from "next/image";
import Link from "next/link"
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { Avatar, AvatarFallback } from "./ui/avatar";


type PopoverDemoProps = {
    user: string | null; // Allowing null for user
};

export const PopoverDemo: React.FC<PopoverDemoProps> = ({ user }) => {

    const router = useRouter();

    const logout = () => {
        localStorage.removeItem("token");
        toast.success("Logout successfully !")
        router.push("/signin");
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button className="shadow-none">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-800">
                            {user ? user.toUpperCase() : 'G'}
                        </AvatarFallback>
                    </Avatar>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-50 mr-9 p-2 bg-slate-100 border mt-2 rounded">
                <ul>
                    <li >
                        <Link href={"/view-profile"} className="flex gap-3">
                            <UserCircle className="w-5 h-5 text-gray-600" />
                            <span className="text-sm font-medium text-gray-700">{user}</span>
                        </Link>

                    </li>
                    <hr className="my-2" />
                    <li className="flex">
                        <Button onClick={logout} className="shadow-none p-0 h-5 text-sm font-medium text-gray-700">
                            <LogOut className="w-5 font-bold h-5 text-gray-600" />
                            <span className="ml-2">Logout</span>
                        </Button>
                    </li>


                </ul>
            </PopoverContent>
        </Popover>
    )
}
