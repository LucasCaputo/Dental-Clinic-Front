import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth/auth.service';
import { getCurrentDate, getDate30DaysAgo, getEmployee } from 'src/app/shared/services/utils/utils.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ScheduleRepository {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  public postScheduling(scheduling: any): Observable<any> {
    return this.httpClient.post<any>(
      environment.baseURL + '/agenda',
      scheduling,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }
  
  /** Busca lista de todos os agendamentos */
  public getSchedule(): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.baseURL}/agenda/prestador?login=${this.authService.getUser()?.login}&dataInicio=${getDate30DaysAgo()}&dataFim=${getCurrentDate()}&prestadorId=${getEmployee()}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  deleteScheduling(customerId: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.baseURL}/agenda/${customerId}`,
      {
        headers: {
          Authorization: this.authService.getToken()!,
        },
      }
    );
  }

  updateScheduling(body:any, id: number) {
    return this.httpClient.put(environment.baseURL + '/agenda/' + id, body, {
      headers: {
        Authorization: this.authService.getToken()!,
        PacienteID: `${body.paciente_id}`,
        PrestadorID: `${body.prestador_id}`
      },
    });
  }
}
