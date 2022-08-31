import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export interface UserToCreate {
    username: string;
    email: string;
    password: string;
    firstName: string | null | undefined;
    lastName: string | null | undefined;
    mainPhoto: string | null | undefined;
}


export default class userService {
    static async create(user: UserToCreate): Promise<User> {
        const { username, email, password, firstName, lastName, mainPhoto } = user;
        const userCreated = await prisma.user.create({
            data: {
                username,
                email,
                password,
                firstName,
                lastName,
                mainPhoto
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

    static async update(id: string, user: UserToCreate): Promise<User | null> {
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