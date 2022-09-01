import { Category } from "@prisma/client";
import prisma from "../lib/prisma";

export interface CategoryDataModel {
    name: string;
}

export default class categoryService {
    static async create(category: CategoryDataModel): Promise<Category> {
        const categoryCreated = await prisma.category.create({
            data: {
                ...category
            }
        });
        return categoryCreated;
    }

    static async findAll(): Promise<Category[]> {
        const categories = await prisma.category.findMany();
        return categories;
    }

    static async findById(id: string): Promise<Category | null> {
        const category = await prisma.category.findFirst({
            where: {
                id
            }
        });
        return category;
    }

    static async findByName(name: string): Promise<Category | null> {
        const category = await prisma.category.findFirst({
            where: {
                name
            }
        });
        return category;
    }

    static async update(id: string, category: CategoryDataModel): Promise<Category | null> {
        const categoryUpdated = await prisma.category.update({
            where: {
                id
            },
            data: {
                ...category
            }
        });
        return categoryUpdated;
    }

    static async delete(id: string): Promise<Category | null> {
        const categoryDeleted = await prisma.category.delete({
            where: {
                id
            }
        });
        return categoryDeleted;
    }
}