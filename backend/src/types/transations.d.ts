export type Transation = {
  id: string,
  date: Date,
  value: number,
  doc: string
};

export type TransationFilled = {
  id: string,
  name: string,
  doc: string, // CPF or CNPJ
  date: Date,
  value: number
};
