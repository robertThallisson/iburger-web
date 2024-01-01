import { Notificacao } from './../../model/objetc/notificacao';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NotificaoService } from '../../service/pop-farma/notificao.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  constructor(
    public notificaoService: NotificaoService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  click(item: Notificacao) {


  }

}
