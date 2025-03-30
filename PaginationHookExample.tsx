"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect } from "react";

export const usePagination = (
    currentPage: number = 1,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    totalPages: number = 1
) => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const updateURL = (page: number) => {
        const tab = searchParams.get("tab") || "default-tab"; // Preserve tab
        const newParams = new URLSearchParams(searchParams.toString());

        newParams.set("tab", tab);
        newParams.set("page", page.toString());

        console.log("New URL params:", newParams.toString());

        router.push(`?${newParams.toString()}`, { scroll: false });
    };

    // Sync currentPage with URL when the page loads
    useEffect(() => {
        const pageFromURL = Number(searchParams.get("page")) || 1;
        if (pageFromURL !== currentPage) {
            setCurrentPage(pageFromURL);
        }
    }, [currentPage, searchParams, setCurrentPage]);

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            updateURL(currentPage + 1);
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            updateURL(currentPage - 1);
            setCurrentPage((prev) => prev - 1);
        }
    };

    const setPage = (page: number) => {
        console.log("Setting page to:", page);
        console.log("Total pages:", totalPages);
        if (page > 0 && page <= totalPages) {
            console.log("Updating URL to page:", page);
            updateURL(page);
            setCurrentPage(page);
        }
    };

    return {
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        setPage,
    };
};
