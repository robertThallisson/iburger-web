/* eslint-disable @angular-eslint/no-input-rename */
/* eslint-disable @typescript-eslint/no-inferrable-types */
import { Component, OnInit, ElementRef, Input, ViewChild, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-expandable',
  templateUrl: './expandable.component.html',
  styleUrls: ['./expandable.component.scss'],
})
export class ExpandableComponent implements OnInit {

  @ViewChild('expandWrapper', { static: true }) expandWrapper: ElementRef;
  @Input('expanded') expanded: boolean = false;
  @Input('expandHeight') expandHeight: string = '150px';

  constructor(public renderer: Renderer2) {}
  ngOnInit(): void {

  }


}
