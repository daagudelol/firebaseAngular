import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirestorageService } from 'src/app/firestorage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  constructor(private router: Router, public firestorage: FirestorageService) { }

  ngOnInit() {
  }

}
