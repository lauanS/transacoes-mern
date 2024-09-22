'use client'

import React, { useEffect } from 'react';
import axios from 'axios';

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

const TableComponent = () => {
  const [transations, setTransations] = React.useState<Transation[]>([]);

  const fetchTransations = async () => {
    try {
      const response = await axios.get<PaginationResponse[]>("http://localhost:8000/transations/?page=1&pageSize=12");

      const responseData = response.data[0];
      const transations = responseData.data || [];
      
      setTransations(transations)
    } catch (error) {
      console.log('Error', error); 
    }
  }

  useEffect(() => {
    fetchTransations();
  }, [])

  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableComponent;
