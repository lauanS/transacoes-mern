'use client'

import React, { useState } from 'react';

interface TransationTableFiltersProps {
  fetchResources: (name: string, date: string) => void;
}

const TransationTableFilters = ({ fetchResources }: TransationTableFiltersProps) => {
  const [name, setName] = useState<string>('');
  const [date, setDate] = useState<string>('');

  const handleSearch = () => {
    fetchResources(name, date);
  };

  return (
    <div className="flex flex-col items-center px-8 py-4 md:flex-row md:space-x-4">
      <div className="w-full md:w-2/5">
        <label htmlFor="name" className="block text-sm font-medium">
          Nome
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 block w-full p-2 text-gray-700 border border-gray-300 rounded-md shadow-sm"
          placeholder="Digite o nome"
        />
      </div>

      <div className="w-full md:w-2/5 md:my-4">
        <label htmlFor="date" className="block text-sm font-medium">
          Data
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-1 block w-full p-2 text-gray-700 border border-gray-300 rounded-md shadow-sm"
        />
      </div>

      <button
        onClick={handleSearch}
        className="w-full md:w-1/5 mt-6 px-4 py-2 rounded-lg shadow-md bg-green-500 text-white hover:bg-green-700"
      >
        Buscar
      </button>
    </div>
  );
};

export default TransationTableFilters;
