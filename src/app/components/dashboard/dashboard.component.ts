import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  dataUser: any;
  constructor(private afAuth: AngularFireAuth,
              private routes: Router,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.afAuth.currentUser.then(user => {
      if(user && user.emailVerified){
        this.dataUser = user;
      }else{
        this.routes.navigate(['/login']);
        this.toastr.error('Favor de registrar una cuenta', 'Error');
      }
    })
  }

  logOut(){
    this.afAuth.signOut().then(() => this.routes.navigate(['/login']));
  }
}
