import { Component, OnInit } from '@angular/core';
import { Visual } from '../../model/auxi/Visual';

@Component({
  selector: 'app-visualizacao',
  templateUrl: './visualizacao.page.html',
  styleUrls: ['./visualizacao.page.scss'],
})

export class VisualizacaoPage implements OnInit {


  visual: Visual;

  constructor() { }

  ngOnInit() {
  }

}
