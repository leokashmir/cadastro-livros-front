import {Autor} from './autor.model';
import {Assunto} from './assunto.model';

export interface Livro {
  id: number | null;
  titulo: string;
  edicao: number;
  valor: number;
  editora: string;
  anoPublicacao: number;
  autores: Autor[];
  assuntos: Assunto[];
}
