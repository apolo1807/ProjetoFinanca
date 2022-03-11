import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NotificationModel } from './notifications.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {

  urlNotification: string = environment.apiNotifications;

  constructor(private httpClient: HttpClient) { }

  findNotifications():Observable<NotificationModel[]> {
    return this.httpClient.get<NotificationModel[]>(`${this.urlNotification}`);
  }

  findById(id: number):Observable<NotificationModel> {
    return this.httpClient.get<NotificationModel>(`${this.urlNotification}/${id}`);
  }

  saveNotification(notification: NotificationModel):Observable<NotificationModel> {
    return this.httpClient.post<NotificationModel>(`${this.urlNotification}`, notification);
  }

}
