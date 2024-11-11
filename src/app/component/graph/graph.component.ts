import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardModule } from 'primeng/card';
import { Product } from '../interface';

@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [CommonModule, NgxChartsModule, CardModule],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  @Input() products: Product[] = [];
  chartData: { name: string; value: number }[] = [];
  arcWidth: number = 0.4;
  ngOnChanges() {
    this.chartData = this.products.map(product => ({
      name: product.name,
      value: product.price,
    }));

  }
}
