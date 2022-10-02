import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface DisplayFormCardProps {
    id: string,
    displayOption: string, 
    option: "name" | "firstName" | "lastName" | "email" | "password" | "image" | "password",
    value: string, 
    description: string,
    className?: string
}

interface IFormInput {
    id: string,
    name: string | null,
    firstName: string | null,
    lastName: string | null,
    email: string | null,
    image: string | null,
    password: string | null
}


const DisplayFormCard = ({id, displayOption, option, value, description, className}:DisplayFormCardProps) => {

    const [ editing, setEditing ] = useState(false);
    const { register, handleSubmit, watch, formState: { errors } } = useForm<IFormInput>();

    const onSubmit:SubmitHandler<IFormInput> = async (data) => {
        console.log(`Submitting data:  ${JSON.stringify(data)}`);

        try{
            const response = await fetch(`/api/user/${id}`, {
                method: "PUT",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(data)
            });
            console.log(`Response: ${JSON.stringify(response)}`);
            setEditing(false);
        }catch(e){
            console.log(`Error: ${e}`);
            setEditing(false);
        }
    }
    
    return (
        <div className={`my-10 ${className}`}>
            <form onSubmit={handleSubmit(onSubmit)} className="flex justify-between ">
                <div>
                    <h1 className=" font-bold py-1 text-xl" >{displayOption}</h1>
                    <input 
                        {...register("id", {required: true})}
                        type="hidden"
                        name="postId"
                        value={id}
                    />
                    <input 
                        {...register(option, {required: true})}
                        type="text"
                        placeholder={value}
                        value={value}
                        className="rounded-lg p-1 text-gray-800" 
                        disabled={!editing}
                    />
                </div>
                <div className="flex flex-row">
                    {editing && (
                        <input 
                            type="submit" 
                            className="border px-4 py-1 rounded-2xl border-gray-200 
                            hover:bg-green-100" 
                            value="Save"
                        />
                    )}
                    <button type="button" onClick={()=>setEditing(!editing)} className="border px-4 py-1 rounded-2xl border-gray-200 
                                hover:bg-gray-100">{editing ? "Cancel" : "Edit"}</button>
                </div>
            </form>
            <hr className="pb-2" />
            <p className=" text-sm text-gray-700 " >{description}</p>
        </div>
    );
}

export default DisplayFormCard;