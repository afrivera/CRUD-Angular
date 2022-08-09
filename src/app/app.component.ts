import {  Component, OnInit, ViewChild } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { ApiService } from './services/api.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'crud-angular';

  displayedColumns: string[] = ['productName', 'category', 'date', 'freshness', 'price', 'comment', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog, private api: ApiService) {}
  
  ngOnInit(): void {
    this.getAllProducts();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe( val => {
      if( val === 'save'){
        this.getAllProducts();
      }
    })
  }

  getAllProducts(){
    this.api.getProduct()
      .subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      })
  }

  editProduct( row: any){
    this.dialog.open(DialogComponent,{
      width: '30%',
      data: row
    }).afterClosed().subscribe( val => {
      if( val === 'update'){
        this.getAllProducts();
      }
    })
  }

  deleteProduct( id: number ){
    this.api.deleteProduct( id )
      .subscribe( {
        next: (res) => {
          alert('Product deleted Succesfully');
          this.getAllProducts();
        },
        error: ()=> {
          alert('Error while deleting the Product')
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
