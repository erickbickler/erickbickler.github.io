import { Component, OnInit } from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private viewportScroller: ViewportScroller
  ) { }

  ngOnInit(): void {
  }

  isScrolled:boolean = false;
  
  onWindowScroll() {
    if (window.pageYOffset >= 142) {
      this.isScrolled = true;
    } else {
      this.isScrolled = false;
    }
  }

  scroll() {
    if(this.router.url == '/projects') {
      this.viewportScroller.scrollToAnchor('projects');
    }
  }

}
