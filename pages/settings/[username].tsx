import { User } from "@prisma/client";
import { GetStaticPaths, GetStaticProps } from "next";
import Header from "../../components/Header";
import DisplayFormCard from "../../components/DisplayFormCard";
import logger from "../../lib/logger";
import userService from "../../services/userService";

interface SettingsProps {
    user: User;
}

const settings = ({user}:SettingsProps) => {
    return (
        <div>
            <Header></Header>
            <div className="lg:flex lg:flex-row-reverse lg:justify-between mx-4 sm:mx-10 lg:mx-20 ">
                <div className="hidden lg:block w-1/12"></div>
                <div className="lg:w-1/2">
                    <h3 className="text-2xl font-bold">About You</h3>
                    <hr className="py-2" />
                    <DisplayFormCard
                        id={user.id}
                        displayOption="Name"
                        option="name"
                        value={user.name!}
                        description="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
                        />
                    <DisplayFormCard
                        id={user.id}
                        displayOption="First Name"
                        option="firstName"
                        value={user.firstName!}
                        description="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
                        />
                    <DisplayFormCard
                        id={user.id}
                        displayOption="Last Name"
                        option="lastName"
                        value={user.lastName!}
                        description="Your name appears on your Profile page, as your byline, and in your responses. It is a required field."
                        />
                    
                    <div className="flex flex-row justify-between" >
                        <div>
                            <h1 className=" text-xl font-bold py-2">Profile Picture </h1>
                            <p className=" text-gray-700 text-sm">Your photo appears on your Profile page and with your stories across Medium.</p>
                        </div>
                        <img className="rounded-full w-10 h-10" src={user.image!} alt="" />
                    </div>

                    <DisplayFormCard
                        id={user.id}
                        displayOption="Email"
                        option="email"
                        value={user.email!}
                        description="Your email address is used to sign in to your account, and to send you notifications. It is a required field."
                        />
                    <DisplayFormCard
                        id={user.id}
                        displayOption="password"
                        option="password"
                        value={user.password!}
                        description="Your password is used to sign in to your account. It is a required field."
                        />
                    
                </div>
                <div className="lg:w-1/12">
                    <h1 className=" text-xl font-bold " >Settings</h1>
                </div>
            </div>
        </div>
    );
}

export default settings;

export const getStaticPaths: GetStaticPaths = async () => {
    const users = await userService.findAll();

    const paths = users.map( (user) =>{
        return `/settings/${user.email}`;
    });

    return {
        paths,
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
    const username = params!.username as string;
    const user = await userService.findByEmail(username);

    if (!user) {
        logger.error("User not found");
        return {notFound: true}
    }

    return {
        props: {
            user: JSON.parse(JSON.stringify(user))
        }
    }
}