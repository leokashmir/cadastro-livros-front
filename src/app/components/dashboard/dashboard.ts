import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    NzCardModule,
    NzGridModule,
    NzIconModule,
    NzButtonModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  constructor(private router: Router) {}

  menuItems = [
    {
      title: 'Livros',
      description: 'Gerenciar cadastro de livros',
      icon: 'book',
      route: '/livros',
      color: '#1890ff'
    },
    {
      title: 'Autores',
      description: 'Gerenciar cadastro de autores',
      icon: 'user',
      route: '/autores',
      color: '#52c41a'
    },
    {
      title: 'Assuntos',
      description: 'Gerenciar cadastro de assuntos',
      icon: 'tags',
      route: '/assuntos',
      color: '#faad14'
    },
    {
      title: 'Relatórios',
      description: 'Visualizar relatórios e estatísticas',
      icon: 'bar-chart',
      route: '/relatorios',
      color: '#722ed1'
    }
  ];

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
