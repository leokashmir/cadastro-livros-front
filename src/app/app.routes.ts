import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Assunto } from './components/assunto/assunto';
import { Autor } from './components/autor/autor';
import { Livro } from './components/livro/livro';
import { Relatorio } from './components/relatorio/relatorio';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'assuntos', component: Assunto },
  { path: 'autores', component: Autor },
  { path: 'livros', component: Livro },
  { path: 'relatorios', component: Relatorio }
];
