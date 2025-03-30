import { useSearchParams } from "react-router-dom";
import { useEffect, useCallback, useState } from "react";

export const usePagination = (
    initialPage: number = 1,
    onPageChange: (page: number) => void,
    totalPages: number = 1
) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [internalPage, setInternalPage] = useState(() => {
        // Initialize from URL or use initialPage
        const pageFromURL = Number(searchParams.get("page"));
        return pageFromURL > 0 && pageFromURL <= totalPages ? pageFromURL : initialPage;
    });

    // Update URL when page changes
    const updateURL = useCallback(
        (page: number) => {
            const newParams = new URLSearchParams(searchParams.toString());
            if (page === 1) {
                // Remove page parameter if it's page 1 (default)
                newParams.delete("page");
            } else {
                newParams.set("page", page.toString());
            }
            setSearchParams(newParams);
        },
        [searchParams, setSearchParams]
    );

    // Handle external URL changes
    useEffect(() => {
        const pageFromURL = Number(searchParams.get("page")) || 1;
        if (pageFromURL !== internalPage && pageFromURL > 0 && pageFromURL <= totalPages) {
            setInternalPage(pageFromURL);
            onPageChange(pageFromURL);
        }
    }, [searchParams, internalPage, totalPages, onPageChange]);

    // Sync internal state with initialPage (from parent component)
    useEffect(() => {
        if (initialPage !== internalPage && initialPage > 0 && initialPage <= totalPages) {
            setInternalPage(initialPage);
            updateURL(initialPage);
        }
    }, [initialPage, internalPage, totalPages, updateURL]);

    const goToNextPage = () => {
        if (internalPage < totalPages) {
            const nextPage = internalPage + 1;
            setInternalPage(nextPage);
            updateURL(nextPage);
            onPageChange(nextPage);
        }
    };

    const goToPreviousPage = () => {
        if (internalPage > 1) {
            const prevPage = internalPage - 1;
            setInternalPage(prevPage);
            updateURL(prevPage);
            onPageChange(prevPage);
        }
    };

    const setPage = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setInternalPage(page);
            updateURL(page);
            onPageChange(page);
        }
    };

    return {
        currentPage: internalPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        setPage,
    };
};
