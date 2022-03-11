import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationsService } from './shared/notification.service';
import { NotificationModel } from './shared/notifications.model';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {

  form: FormGroup;
  ativadoDolar: boolean = false;
  notification: NotificationModel[] = [];
  notificationInitialize: NotificationModel;

  constructor(
    private service: NotificationsService,
    private _builder: FormBuilder
  ) {
    this.notificationInitialize = new NotificationModel();
  }

  ngOnInit() {
    this.form = this.createForm();
    this.notificationDolar();
  }

  createForm(): FormGroup {

    const form = this._builder.group({
      id: [''],
      nome: [''],
      activated: ['']
    })

    return form;
  }

  notificationDolar() {
    this.service.findNotifications().subscribe(response => {
      this.ativadoDolar = response[0].activated;
      this.notification = response;
    })
  }

  ativarDolar() {
    this.service.findById(1).subscribe(notification => {
      notification.activated = !notification.activated;
      this.service.saveNotification(notification).subscribe(response => {
        this.ativadoDolar = response.activated;
      });
    })
  }

}
