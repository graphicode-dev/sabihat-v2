import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, Dispatch, SetStateAction, useRef, useCallback } from "react";

type PageSetter = Dispatch<SetStateAction<number>> | ((page: number) => void);

export const usePagination = (
    currentPage: number = 1,
    setCurrentPage: PageSetter,
    totalPages: number = 1
) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    // Use a ref to track if we're currently updating from URL to prevent circular updates
    const isUpdatingFromURL = useRef(false);
    // Use a ref to track the last page we navigated to
    const lastNavigatedPage = useRef(currentPage);

    const updateURL = useCallback((page: number) => {
        // Don't update URL if we're already on this page (prevents unnecessary history entries)
        if (lastNavigatedPage.current === page) {
            return;
        }

        console.log(`usePagination: Updating URL to page ${page} for path ${location.pathname}`);
        lastNavigatedPage.current = page;
        
        // Preserve all existing search params
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("page", page.toString());
        // Store the current pathname in the URL params to track which page this pagination belongs to
        newParams.set("path", encodeURIComponent(location.pathname));

        // Use replace instead of push to avoid cluttering browser history with pagination changes
        navigate(`${location.pathname}?${newParams.toString()}`, {
            replace: true,
        });
    }, [navigate, location.pathname, searchParams]);

    // Sync currentPage with URL when the page loads or URL changes
    useEffect(() => {
        const pageFromURL = Number(searchParams.get("page")) || 1;
        const pathFromURL = searchParams.get("path");
        const currentPathMatches = !pathFromURL || decodeURIComponent(pathFromURL) === location.pathname;
        
        // Only update if:
        // 1. The URL page is different from current page
        // 2. We're not in the middle of updating from a click action
        // 3. The path in the URL matches the current path (or no path is specified)
        if (pageFromURL !== currentPage && !isUpdatingFromURL.current && currentPathMatches) {
            console.log(`URL page changed to ${pageFromURL} for path ${location.pathname}, updating component state`);
            isUpdatingFromURL.current = true;
            
            // Update the component state with a slight delay to avoid race conditions
            setTimeout(() => {
                // Double-check that we still need to update
                const latestPageFromURL = Number(searchParams.get("page")) || 1;
                const latestPathFromURL = searchParams.get("path");
                const pathStillMatches = !latestPathFromURL || decodeURIComponent(latestPathFromURL) === location.pathname;
                
                if (latestPageFromURL !== currentPage && pathStillMatches) {
                    console.log(`Setting current page to ${latestPageFromURL} from URL for path ${location.pathname}`);
                    setCurrentPage(latestPageFromURL);
                    lastNavigatedPage.current = latestPageFromURL;
                }
                
                // Reset the flag after the update has been processed
                setTimeout(() => {
                    isUpdatingFromURL.current = false;
                    console.log(`URL sync complete, reset updating flag`);
                }, 100); 
            }, 50);
        }
    }, [searchParams, currentPage, setCurrentPage, location.pathname]);

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages && !isUpdatingFromURL.current) {
            const nextPage = currentPage + 1;
            console.log(`Going to next page: ${nextPage}`);
            isUpdatingFromURL.current = true;

            // First update the state to avoid flashing
            if (typeof setCurrentPage === "function") {
                setCurrentPage(nextPage);
            }

            // Then update the URL
            updateURL(nextPage);

            // Reset the flag after a short delay
            setTimeout(() => {
                isUpdatingFromURL.current = false;
                console.log(`Next page navigation complete, reset updating flag`);
            }, 50);
        }
    }, [currentPage, totalPages, setCurrentPage, updateURL]);

    const goToPreviousPage = useCallback(() => {
        if (currentPage > 1 && !isUpdatingFromURL.current) {
            const prevPage = currentPage - 1;
            console.log(`Going to previous page: ${prevPage}`);
            isUpdatingFromURL.current = true;

            // First update the state to avoid flashing
            if (typeof setCurrentPage === "function") {
                setCurrentPage(prevPage);
            }

            // Then update the URL
            updateURL(prevPage);

            // Reset the flag after a short delay
            setTimeout(() => {
                isUpdatingFromURL.current = false;
                console.log(`Previous page navigation complete, reset updating flag`);
            }, 50);
        }
    }, [currentPage, setCurrentPage, updateURL]);

    const setPage = useCallback((page: number) => {
        if (page > 0 && page <= totalPages && !isUpdatingFromURL.current) {
            console.log(`Setting page directly to: ${page}`);
            isUpdatingFromURL.current = true;

            // First update the state to avoid flashing
            setCurrentPage(page);

            // Then update the URL
            updateURL(page);

            // Reset the flag after a short delay
            setTimeout(() => {
                isUpdatingFromURL.current = false;
                console.log(`Set page navigation complete, reset updating flag`);
            }, 50);
        }
    }, [totalPages, setCurrentPage, updateURL]);

    return {
        currentPage,
        totalPages,
        goToNextPage,
        goToPreviousPage,
        setPage,
    };
};
