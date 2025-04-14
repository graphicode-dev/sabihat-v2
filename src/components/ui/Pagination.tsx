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
}) => {

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

    return (
        <div className="flex flex-row justify-between items-center text-sm text-gray-500">
            <div className="flex items-center gap-4">
                {/* Page Navigation */}
                <div className="flex items-center">
                    {/* Previous Button */}
                    <div
                        className={`w-10 h-10 rounded-full flex justify-center items-center border ${
                            currentPage === 1
                                ? "border-dark-50 text-dark-200 cursor-not-allowed"
                                : "border-dark-200 hover:bg-dark-50 text-dark-200"
                        }`}
                    >
                        <button
                            type="button"
                            title="Previous page"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                currentPage === 1
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "hover:bg-dark-50 text-dark-200"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                    </div>

                    {/* Page Numbers */}
                    <div className="flex items-center">
                        {pageNumbers.map((page, index) => (
                            <React.Fragment key={index}>
                                {typeof page === "number" ? (
                                    <div
                                        className={`w-10 h-10 rounded-full flex justify-center items-center mx-1 ${
                                            currentPage === page
                                                ? "bg-primary-500 text-white"
                                                : "border border-dark-50 text-dark-200 hover:bg-dark-50"
                                        }`}
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setPage(page)}
                                            className="flex items-center justify-center w-full h-full rounded-full font-bold"
                                        >
                                            {page < 10 ? `0${page}` : page}
                                        </button>
                                    </div>
                                ) : (
                                    <div className="w-10 h-10 rounded-full flex justify-center items-center mx-1 border border-dark-50 text-dark-200">
                                        <span className="flex items-center justify-center w-full h-full rounded-full font-bold">
                                            ...
                                        </span>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Next Button */}
                    <div
                        className={`w-10 h-10 rounded-full flex justify-center items-center border ${
                            currentPage === totalPages
                                ? "border-dark-50 text-dark-200 cursor-not-allowed"
                                : "border-dark-200 hover:bg-dark-50 text-dark-200"
                        }`}
                    >
                        <button
                            type="button"
                            title="Next page"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className={`flex items-center justify-center w-10 h-10 rounded-full ${
                                currentPage === totalPages
                                    ? "text-gray-300 cursor-not-allowed"
                                    : "hover:bg-dark-50 text-dark-200"
                            }`}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
