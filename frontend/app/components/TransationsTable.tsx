'use client'

import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import TransationTableController from '@/app/components/TransationsTableController';
import TransationTableFilters from '@/app/components/TransationsTableFilters';

type Transation = {
  id: string,
  name: string,
  doc: string, // CPF or CNPJ
  date: Date,
  value: number
}

type PaginationResponse = {
  metadata: [{
    totalCount: number
  }],
  data: Transation[]
}

const TransationTable = () => {
  const [transations, setTransations] = useState<Transation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);

  const itensPerPage = 10;

  const fetchTransations = useCallback(async (name: string | null, date: string | null) => {
    try {
      setError(false);
      setLoading(true);
      setMessage('');

      const parsedName = name ? name.trim() : null;
      const parsedDate =  date ? new Date(date).toISOString() : null;

      const response = await axios.get<PaginationResponse[]>(
        `http://localhost:8000/transations/`,
        {
          params: {
            name: parsedName,
            startDate: parsedDate,
            page,
            pageSize: itensPerPage
          }
        }
      );

      const responseData = response.data[0];
      const transations = responseData.data || [];
      
      setTransations(transations);
      setTotal(responseData.metadata[0]?.totalCount || 0);
    } catch (error) {
      setMessage('Falha ao carregar os dados da tabela.');
      setError(true);
      console.log('Error', error); 
    } finally {
      setLoading(false);
    }  
  }, [page]);

  useEffect(() => {
    fetchTransations(null, null);
  }, [page, fetchTransations])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <TransationTableFilters fetchResources={fetchTransations} />

        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          { 
            error || loading
            ? 
              <p className={`text-sm mt-2 ${error ? 'text-red-300' : 'text-white'}`}>
                {error ? message : 'Carregando...'}
              </p>
            :
            <div className="overflow-hidden shadow-md sm:rounded-lg">
              <table className="min-w-full text-center">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Nome
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Documento
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Data
                    </th>
                    <th scope="col" className="text-sm font-medium px-6 py-4">
                      Valor
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {transations.map((transation) => (
                    <tr key={transation.id} className="bg-white border-b">
                      <td className="px-6 py-4 text-sm text-gray-900">{transation.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transation.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{transation.doc}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        { new Date(transation.date).toLocaleDateString('pt-BR') }
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        R$ {transation.value.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <TransationTableController 
                total={total}
                itensPerPage={itensPerPage}
                currentPage={page}
                setCurrentPage={setPage}
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default TransationTable;
