import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    goToNextPage: () => void;
    goToPreviousPage: () => void;
    setPage: (page: number) => void;
    itemsPerPage: number;
    totalItems: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    setPage,
    itemsPerPage,
    totalItems,
}) => {
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(currentPage * itemsPerPage, totalItems);

    const getPageNumbers = () => {
        const pages = [];
        const pageRange = 2;

        pages.push(1);

        if (currentPage > pageRange + 2) {
            pages.push("...");
        }

        for (
            let i = Math.max(2, currentPage - pageRange);
            i <= Math.min(totalPages - 1, currentPage + pageRange);
            i++
        ) {
            pages.push(i);
        }

        if (currentPage < totalPages - pageRange - 1) {
            pages.push("...");
        }

        if (totalPages > 1) {
            pages.push(totalPages);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers();

    const handleGoToNextPage = () => {
        console.log("Next page clicked");
        goToNextPage();
    };

    const handleGoToPreviousPage = () => {
        console.log("Previous page clicked");
        goToPreviousPage();
    };

    const handleSetPage = (page: number) => {
        console.log("Set page clicked:", page);
        setPage(page);
    };

    return (
        <nav
            className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
            aria-label="Table navigation"
        >
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {start}-{end}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {totalItems}
                </span>
            </span>

            <ul className="inline-flex items-stretch -space-x-px">
                <li>
                    <button
                        onClick={handleGoToPreviousPage}
                        disabled={currentPage === 1}
                        className={`flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                            currentPage === 1
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        <span className="sr-only">Previous</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>

                {pageNumbers.map((page, index) => (
                    <li key={index}>
                        {typeof page === "number" ? (
                            <button
                                onClick={() => handleSetPage(page)}
                                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight border ${
                                    currentPage === page
                                        ? "z-10 text-primary-600 bg-primary-50 border-primary-300 dark:bg-gray-700 dark:text-white"
                                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                }`}
                            >
                                {page}
                            </button>
                        ) : (
                            <span className="flex items-center justify-center text-sm py-2 px-3 leading-tight border bg-white text-gray-500 border-gray-300 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400">
                                {page}
                            </span>
                        )}
                    </li>
                ))}

                <li>
                    <button
                        onClick={handleGoToNextPage}
                        disabled={currentPage === totalPages}
                        className={`flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${
                            currentPage === totalPages
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}
                    >
                        <span className="sr-only">Next</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
