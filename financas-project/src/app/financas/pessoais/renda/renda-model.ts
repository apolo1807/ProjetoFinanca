export class Renda {
  id: number;
  descricao: string;
  tipoRenda: string;
  ativa: string;
  passiva: string;
  valor: any;
}

export class Page {
  content: Array<Renda>;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort?: any;
  numberOfElements: number;
  first: boolean;
}
