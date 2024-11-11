import { Component, Input } from '@angular/core';
import { TableComponent } from '../table/table.component';
import { GraphComponent } from '../graph/graph.component';
import { CardModule } from 'primeng/card';
import { Product } from '../interface';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TableComponent, GraphComponent, CardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  parentData: Product[] = [];
  
  
    onDataChanged(data: Product[]) {
    this.parentData = data;
  }
 
  constructor(){
  
}

}
