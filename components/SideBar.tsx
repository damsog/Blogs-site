import { User } from "@prisma/client";
import { IoBookmarksOutline } from "@react-icons/all-files/io5/IoBookmarksOutline";
import { IoBookOutline } from "@react-icons/all-files/io5/IoBookOutline";
import Link from "next/link";
import DropDownAccount from "./DropDownAccount";

interface PropsI {
    user: User,
    selection: string,
    setSelectionEvent: Function
    className: string
}

const Sidebar = ({user, selection, setSelectionEvent, className}:PropsI) => {
    return  <div className={`flex flex-row-reverse lg:flex lg:flex-col justify-between ${className}`}>
            <div className="lg:relative">
                <Link key="/" href="/">
                    <img className="lg:absolute top-0 right-0 w-44 object-contain cursor-pointer" src="https://links.papareact.com/yvf" alt="" />
                </Link>
            </div>
            <div className="lg:relative">
                <div className="flex flex-row">
                    <div className="lg:absolute m-4 lg:top-0 lg:right-0">
                        {(selection === "stories") ? 
                            (<h5 className=" text-2xl cursor-pointer text-gray-900" onClick={()=>setSelectionEvent("stories")}><IoBookmarksOutline/></h5>):
                            (<h5 className=" text-2xl cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelectionEvent("stories")}><IoBookmarksOutline/></h5>)}
                    </div>

                    <div className="lg:absolute m-4 lg:bottom-0 lg:right-0">
                        {(selection === "write") ? 
                            (<h5 className=" text-2xl cursor-pointer text-gray-900" onClick={()=>setSelectionEvent("write")}><IoBookOutline/></h5>):
                            (<h5 className=" text-2xl cursor-pointer text-gray-500 hover hover:text-gray-900" onClick={()=>setSelectionEvent("write")}><IoBookOutline/></h5>)}
                    </div>
                </div>
            </div>
            <div className="lg:relative">
                <div className="lg:absolute m-4 bottom-0 right-0 ">
                    {(selection === "account") ? 
                        (<DropDownAccount up={true}/>):
                        (<DropDownAccount up={true}/>)}
                </div>
            </div>
            </div>
}

export default Sidebar;