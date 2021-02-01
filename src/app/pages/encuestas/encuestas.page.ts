import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-encuestas',
  templateUrl: './encuestas.page.html',
  styleUrls: ['./encuestas.page.scss'],
})
export class EncuestasPage implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {}

  salir(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
