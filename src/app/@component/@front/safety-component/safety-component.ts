import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-safety-component',
  imports: [CommonModule, MatIconModule, RouterLink],
  templateUrl: './safety-component.html',
  styleUrl: './safety-component.scss',
})
export class SafetyComponent {}
