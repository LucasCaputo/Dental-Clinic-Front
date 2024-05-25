import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeDialogComponent } from './employee-dialog.component';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [EmployeeDialogComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [EmployeeDialogComponent],
})
export class EmployeeDialogModule {}
