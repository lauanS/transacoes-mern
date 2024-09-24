'use client'

import React, { Dispatch, SetStateAction } from 'react';

type TransationTableControllerProps = {
  total: number,
  currentPage: number,
  itensPerPage: number,
  setCurrentPage: Dispatch<SetStateAction<number>>
}

const TransationTableController = ({ total, currentPage, itensPerPage, setCurrentPage }: TransationTableControllerProps) => {
  const totalPages = Math.ceil(total / itensPerPage);

  const onClickPrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const onClickNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="mt-5 flex flex-col items-center">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Página
        <span className="font-semibold text-gray-900 dark:text-white"> {currentPage} </span>
        de
        <span className="font-semibold text-gray-900 dark:text-white"> {totalPages} </span>
      </span>
      <div className="inline-flex mt-2 xs:mt-0">
        <button 
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={onClickPrevPage}  
        >
          Anterior
        </button>
        <button
          className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          onClick={onClickNextPage}  
        >
          Próxima
        </button>
      </div>
    </div>
  )
};

export default TransationTableController;
