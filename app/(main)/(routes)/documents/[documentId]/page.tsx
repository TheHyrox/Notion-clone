"use client";

import { Toolbar } from "@/app/(main)/_components/toolbar";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";

interface DocumentIdPageProps {
    params: {
        documentId: Id<"documents">;
    };
}

const DocumentIdPage = ({
    params
} : DocumentIdPageProps) => {

    const document = useQuery(api.documents.getById, {
        documentId: params.documentId
    })

    if(document === undefined) {
        return (
            <div className="">Loading ...</div>
        )
    }

    if(document === null) {
        return (
            <div className="">Not found</div>
        )
    }

    return (
        <div className="pb-40">
            <div className="h-[35vh]"/>
            <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
                <Toolbar initialData={document}/>

            </div>
        </div>
    );
}
export default DocumentIdPage;