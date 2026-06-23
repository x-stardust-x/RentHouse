import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";
import { PageHero } from '../../../@layouts/page-hero/page-hero';

@Component({
  selector: 'app-safety-component',
  imports: [CommonModule, MatIconModule, RouterLink, PageHero],
  templateUrl: './safety-component.html',
  styleUrl: './safety-component.scss',
})
export class SafetyComponent {}
