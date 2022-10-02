interface DisplayFormCardProps {
    title: string, 
    value: string, 
    description: string,
    className?: string
}

const DisplayFormCard = ({title, value, description, className}:DisplayFormCardProps) => {
    return (
        <div className={`my-10 ${className}`}>
            <div className="flex justify-between">
                <div>
                    <p>{title} </p>
                    <p>{value}</p>
                </div>
                <div>
                    <button className="border px-4 py-1 rounded-full border-gray-200 
                                hover:bg-gray-100">Edit</button>
                </div>
            </div>
            <hr className="pb-2" />
            <p>{description}</p>
        </div>
    );
}

export default DisplayFormCard;