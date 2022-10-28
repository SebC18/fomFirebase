import { AppComponent } from './app.component';
import { CreateProductsComponent } from './components/create-products/create-products.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path : "", redirectTo: 'list-products', pathMatch: 'full'},
  { path: "list-products", component: ListProductsComponent},
  { path: "create-product", component: CreateProductsComponent},
  { path: "edit-product/:id", component: CreateProductsComponent},
  { path: "**", redirectTo: 'list-products', pathMatch: 'full' },
  { path: "test", component: AppComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
