import { Component } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { HeaderComponent } from 'src/app/shared/components/header/header.component';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [SharedModule, HeaderComponent, MatTabsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}

