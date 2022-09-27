import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface PropsI {
    posts: Post[]
}

const Stories = ({posts}: PropsI) => {
    const [selection, setSelection] = useState("stories");
    const { data: session, status } = useSession();
    
    return (
        <div className="h-full w-full">
            <div className="flex flex-col items-center p-10">
                <h3 className="text-4xl font-bold">Stories</h3>
            </div>
            <div className="flex px-10 gap-6">
                {(selection === "stories") ? 
                    (<div className="flex flex-col">
                        <h5 className=" cursor-pointer text-gray-900 " onClick={()=>setSelection("stories")}>Your Stories</h5>
                        <hr className="w-full border-black" />
                    </div>) :
                    (<h5 className=" cursor-pointer text-gray-500 hover hover:text-gray-900 " onClick={()=>setSelection("stories")}>Your Stories</h5>)}            
                {(selection === "following") ? 
                    (<div className="flex flex-col">
                        <h5 className=" cursor-pointer text-gray-900 " onClick={()=>setSelection("following")}>Following</h5>
                        <hr className="w-full border-black" />
                    </div>) :
                    (<h5 className=" cursor-pointer text-gray-500 hover hover:text-gray-900 " onClick={()=>setSelection("following")}>Following</h5>
                )}
            </div>
            <hr className="mx-4 pb-2" />

            {(selection === "stories") && (
                posts.map((post) => 
                    (<p>{post.title}</p>)
                )
            )}

            {(selection === "following") && (
                <div className="flex flex-col items-center">
                    <p>following</p>
                </div>
            )}
        </div> 
    )
}

export default Stories;