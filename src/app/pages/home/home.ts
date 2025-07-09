import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from '../../services/product';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.html',
  imports: [CommonModule, RouterModule],
})
export class HomeComponent implements OnInit, OnDestroy {
  products: any[] = [];
  sliderImages: string[] = [];
  currentSlide = 0;
  sliderInterval: any;
  loading = true;

  constructor(private productService: ProductService, public router: Router) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((res) => {
      this.products = res.products;
      this.sliderImages = this.products.slice(0, 5).map((p) => p.images[0]);
      this.startAutoSlide();
      this.loading = false;
    });
  }

  ngOnDestroy() {
    clearInterval(this.sliderInterval);
  }

  startAutoSlide() {
    this.sliderInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  resetAutoSlide() {
    clearInterval(this.sliderInterval);
    this.startAutoSlide();
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.sliderImages.length;
  }

  prevSlide() {
    this.currentSlide =
      (this.currentSlide - 1 + this.sliderImages.length) %
      this.sliderImages.length;
  }
}
