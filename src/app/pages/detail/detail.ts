import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.html',
})
export class DetailComponent implements OnInit {
  product: any;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.productService.getProductById(id).subscribe(res => {
      this.product = res;
      this.loading = false;
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
