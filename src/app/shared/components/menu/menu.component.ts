import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { CustomerService } from '../../services/customer/customer.service';
import { HelpDialogComponent } from '../dialogs/help-dialog/help-dialog.component';
import { PaymentsDialogComponent } from '../dialogs/payments-dialog/payments-dialog.component';
import { UserDialogComponent } from '../dialogs/user-dialog/user-dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatDividerModule,
    MatSidenavModule,
    MatButtonModule,
  ],
})
export class MenuComponent {
  user$ = this.auth.getUserObservable();

  public menuData = [
    {
      redirect: 'agenda',
      label: 'Agenda',
      icon: 'date_range',
    },
    {
      redirect: 'clientes',
      label: 'Clientes',
      icon: 'account_circle',
    },
    {
      redirect: 'prestador',
      label: 'Prestador',
      icon: 'badge',
    },
  ];

  public menuConfig = [
    {
      redirect: '',
      label: 'Ajuda',
      icon: 'help',
      key: 'help',
    },
    {
      redirect: '',
      label: 'Configurações',
      icon: 'settings',
      key: 'settings',
    },
    {
      redirect: '',
      label: 'Pagamentos',
      icon: 'payments',
      key: 'payments',
    },
  ];

  constructor(
    public auth: AuthService,
    public router: Router,
    private customerService: CustomerService,
    private dialog: MatDialog,
  ) {}

  /** Faz logout do sistema */
  public logout(): void {
    this.customerService.customers = [];
    this.customerService.$customers.next([]);
    this.customerService.formattedCustomerList = [];

    this.auth.logout();
    this.router.navigate(['login']);
  }

  /** Redireciona para rota selecionada */
  public redirect(router: string): void {
    this.router.navigate([router]);
  }

  public openModal(modal: string) {
    switch (modal) {
      case 'help':
        this.openHelpModal();
        break;

      case 'settings':
        this.openUserSettingsModal();
        break;

    
      case 'payments':
        this.openPaymentsModal();
        break;
    
      default:
        break;
    }
  }

  public openHelpModal(): void {
    const dialogRef = this.dialog.open(HelpDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      position: {
        top: '70px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
    });
  }

  public openUserSettingsModal(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      position: {
        top: '70px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
    });
  }

  public openPaymentsModal(): void {
    const dialogRef = this.dialog.open(PaymentsDialogComponent, {
      width: '500px',
      maxWidth: '100vw',
      position: {
        top: '70px',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
    });
  }
}
