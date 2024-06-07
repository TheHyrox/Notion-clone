import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const archive = mutation({
    args: {
        id: v.id("documents"),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Not authenticate / Not logged in");
        }

        const userId = identity.subject;

        const existingDocument = await ctx.db.get(args.id);

        if (!existingDocument) {
            throw new Error("Document not found");
        }

        if (existingDocument.userId !== userId) {
            throw new Error("Unauthorized / Not your document");
        }

        const reccursiveArchive = async (documentId: Id<"documents">) => {
            const children = await ctx.db
                .query("documents")
                .withIndex("by_user_parent", (q) =>
                    q
                        .eq("userId", userId)
                        .eq("parentDocumentId", documentId)
                )
                .collect();
            for (const child of children) {
                await ctx.db.patch(child._id, {
                    isArchived: true,
                });

                await reccursiveArchive(child._id);
            }
        }

        const document = await ctx.db.patch(args.id, {
            isArchived: true,
        });

        reccursiveArchive(args.id);

        return document;
    }
});

export const getSidebar = query({
    args: {
        parentDocumentId: v.optional(v.id("documents")),
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized / Not logged in");
        }

        const userId = identity.subject;

        const documents = await ctx.db
            .query("documents")
            .withIndex("by_user_parent", (q) =>
                q
                    .eq("userId", userId)
                    .eq("parentDocumentId", args.parentDocumentId)
                )
                .filter((q) =>
                    q.eq(q.field("isArchived"), false)
                )
                .order("desc")
                .collect();

                return documents;
            }
        });


export const create = mutation({
    args: {
        title: v.string(),
        parentDocumentId: v.optional(v.id("documents")),
    },
    handler: async (ctx, args) => {

        const identity = await ctx.auth.getUserIdentity();

        if (!identity) {
            throw new Error("Unauthorized / Not logged in");
        }

        const userId = identity.subject;

        const document = ctx.db.insert("documents", {
            title: args.title,
            parentDocumentId: args.parentDocumentId,
            userId,
            isArchived: false,
            isPublished: false,
        });

        return document;
    }
});

