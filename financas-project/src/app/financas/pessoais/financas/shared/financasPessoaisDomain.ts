import { Valores } from "src/app/shared/model/valores.model";

export class FinancasPessoais {
  id: number;
  gasto: string;
  descricao: string;
  valores: Valores;
  dataInicio: Date;
  dataFim: Date;
  tipoEstadoGasto: string;
}

export class Page {
  content: Array<FinancasPessoais>;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort?: any;
  numberOfElements: number;
  first: boolean;
}
