import { Component, Input, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  apiKey: String = '';
  accountId: String = '';

  @Input() musicianName: string | undefined;
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.apiKey = 'b9DY8defNeWJUwO66YvKGLh47v34NvyQxIxdHhJJ';
    this.accountId = '2a43fa5f-566f-40a2-9ab4-56963bacd6ce';
  }

  ngOnInit(): void {}
}
