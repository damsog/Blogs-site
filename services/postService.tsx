import { Post } from "@prisma/client";
import prisma from "../lib/prisma";

interface PostDataModelBase {
    title: string;
    slug: string;
    description: string;
    content: string;
    authorId: string;
    categoryId: string;
    mainPhoto: string | null | undefined;
}

export interface PostDataModel extends PostDataModelBase {
    slug: string;
}

export default class postService {
    static async create(post: PostDataModelBase): Promise<Post> {
        const slug = post.title.toLowerCase().replace(/ /g, "_");
        const postWSlug:PostDataModel = {...post, slug: slug};
        const postCreated = await prisma.post.create({
            data: {
                ...postWSlug
            }
        });
        return postCreated;
    }

    static async findAll(): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            include: {
                author: {
                    select: {
                        firstName: true
                    }
                }
                
            }
        });
        return posts;
    }

    static async findByAuthorId(authorId: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                authorId
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                    }
                }
            }
        });
        return posts;
    }

    static async findByCategoryId(categoryId: string): Promise<Post[]> {
        const posts = await prisma.post.findMany({
            where: {
                categoryId
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                    }
                }
            }
        });
        return posts;
    }

    static async findById(id: string): Promise<Post | null> {
        const post = await prisma.post.findFirst({
            where: {
                id
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                    }
                }
            }
        });
        return post;
    }

    static async findByTitle(title: string): Promise<Post | null> {
        const post = await prisma.post.findFirst({
            where: {
                title
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                    }
                }
            }
        });
        return post;
    }

    static async findBySlug(slug: string): Promise<Post | null> {
        const post = await prisma.post.findFirst({
            where: {
                slug
            },
            include: {
                author: {
                    select: {
                        firstName: true,
                    }
                }
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