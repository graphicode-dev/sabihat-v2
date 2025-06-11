import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, Dispatch, SetStateAction } from "react";

export const usePagination = (
    currentPage: number = 1,
    setCurrentPage: Dispatch<SetStateAction<number>>,
    totalPages: number = 1
) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();

    const updateURL = (page: number) => {
        const tab = searchParams.get("tab"); // Preserve tab
        const newParams = new URLSearchParams(searchParams.toString());

        if (tab) {
            newParams.set("tab", tab);
        }
        newParams.set("page", page.toString());

        navigate(`${location.pathname}?${newParams.toString()}`);
    };

    // Sync currentPage with URL when the page loads
    useEffect(() => {
        const pageFromURL = Number(searchParams.get("page")) || 1;
        if (pageFromURL !== currentPage) {
            setCurrentPage(pageFromURL);
        }
    }, [searchParams, setCurrentPage]);

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
        if (page > 0 && page <= totalPages) {
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
