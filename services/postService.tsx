import { Post } from "@prisma/client";
import prisma from "../lib/prisma";

export interface PostDataModel {
    title: string;
    content: string;
    authorId: string;
    categoryId: string;
    mainPhoto: string | null | undefined;
}

export default class postService {
    static async create(post: PostDataModel): Promise<Post> {
        const postCreated = await prisma.post.create({
            data: {
                ...post
            }
        });
        return postCreated;
    }

    static async findAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany();
        return posts;
    }

    static async findByAuthorId(authorId: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                authorId
            }
        });
        return posts;
    }

    static async findById(id: string): Promise<Post | null> {
        const post = await prisma.post.findFirst({
            where: {
                id
            }
        });
        return post;
    }

    static async findByTitle(title: string): Promise<Post | null> {
        const post = await prisma.post.findFirst({
            where: {
                title
            }
        });
        return post;
    }

    static async update(id: string, post: PostDataModel): Promise<Post | null> {
        const postUpdated = await prisma.post.update({
            where: {
                id
            },
            data: {
                ...post
            }
        });
        return postUpdated;
    }

    static async delete(id: string): Promise<Post | null> {
        const postDeleted = await prisma.post.delete({
            where: {
                id
            }
        });
        return postDeleted;
    }
}