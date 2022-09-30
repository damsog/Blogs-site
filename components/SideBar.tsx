import { User } from "@prisma/client";
import { IoBookmarksOutline } from "@react-icons/all-files/io5/IoBookmarksOutline";
import { IoBookOutline } from "@react-icons/all-files/io5/IoBookOutline";
import Link from "next/link";

interface PropsI {
    user: User,
    selection: string,
    setSelectionEvent: Function
    className: string
}

const Sidebar = ({user, selection, setSelectionEvent, className}:PropsI) => {
    return  <div className={`flex flex-col justify-between ${className}`}>
            <div className="relative">
                <Link key="/" href="/">
                    <img className="absolute top-0 right-0 w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="" />
                </Link>
            </div>
            <div className="relative">
                <div className="absolute m-4 top-0 right-0">
                    {(selection === "stories") ? 
                        (<h5 className=" text-2xl cursor-pointer text-gray-900" onClick={()=>setSelectionEvent("stories")}><IoBookmarksOutline/></h5>):
                        (<h5 className=" text-2xl cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelectionEvent("stories")}><IoBookmarksOutline/></h5>)}
                </div>

                <div className="absolute m-4 bottom-0 right-0">
                    {(selection === "write") ? 
                        (<h5 className=" text-2xl cursor-pointer text-gray-900" onClick={()=>setSelectionEvent("write")}><IoBookOutline/></h5>):
                        (<h5 className=" text-2xl cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelectionEvent("write")}><IoBookOutline/></h5>)}
                </div>
            </div>
            <div className="relative">
                <div className="absolute m-4 bottom-0 right-0 ">
                    {(selection === "account") ? 
                        (<img className="h-8 w-8 rounded-full cursor-pointer outline-double outline-black-900" onClick={()=>setSelectionEvent("account")} src={user.image!} alt=""/>):
                        (<img className="h-8 w-8 rounded-full cursor-pointer hover hover:outline-double hover:outline-black-900" onClick={()=>setSelectionEvent("account")} src={user.image!} alt=""/>)}
                </div>
            </div>
            </div>
}

export default Sidebar;