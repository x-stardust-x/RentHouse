import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export type PageHeroBreadcrumb = {
  label: string;
  link?: string;
};

@Component({
  selector: 'app-page-hero',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './page-hero.html',
  styleUrl: './page-hero.scss',
})
export class PageHero {
  @Input() eyebrow = '';
  @Input() title = '';
  @Input() breadcrumbs: PageHeroBreadcrumb[] = [];
}
