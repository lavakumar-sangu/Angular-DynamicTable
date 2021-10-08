import { Component, OnInit } from '@angular/core';
import { user } from '../datashare.service';

@Component({
  selector: 'app-signin-page',
  templateUrl: './signin-page.component.html',
  styleUrls: ['./signin-page.component.css'],
})
export class SigninPageComponent implements OnInit {
  hide = true;
  constructor() {}
  ngOnInit() {}
}
