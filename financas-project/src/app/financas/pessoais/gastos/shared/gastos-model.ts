import { Valores } from "src/app/shared/model/valores.model";
import { GastosComponent } from "../gastos-list/gastos.component";

export class GastosModel {
  id: number;
  descricao: string;
  tipoGasto: string;
  fidelidade: boolean;
  valores: Valores;
  dataInicio: Date;
  tempoFidelidade: Date;
  dataFim: Date;
}

export class Page {
  content: Array<GastosModel>;
  totalPages: number;
  totalElements: number;
  last: boolean;
  size: number;
  number: number;
  sort?: any;
  numberOfElements: number;
  first: boolean;
}
