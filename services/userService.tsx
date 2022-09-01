import { User } from "@prisma/client";
import prisma from "../lib/prisma";


export interface UserDataModel {
    username: string;
    email: string;
    password: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    mainPhoto: string | null | undefined;
}


export default class userService {
    static async create(user: UserDataModel): Promise<User> {
        const { username, email, password, firstName, lastName, mainPhoto } = user;
        const userCreated = await prisma.user.create({
            data: {
                ...user
            }
        });
        return userCreated;
    }

    static async findAll(): Promise<User[]> {
        const users = await prisma.user.findMany();
        return users;
    }

    static async findById(id: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                id
            }
        });
        return user;
    }

    static async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                email
            }
        });
        return user;
    }

    static async findByUsername(username: string): Promise<User | null> {
        const user = await prisma.user.findFirst({
            where: {
                username
            }
        });
        return user;
    }

    static async update(id: string, user: UserDataModel): Promise<User | null> {
        const userUpdated = await prisma.user.update({
            where: {
                id
            },
            data: {
                ...user
            }
        });
        return userUpdated;
    }
}