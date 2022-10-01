import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthErrorService } from 'src/app/services/auth-error.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  recovery_icon ="https://cdn2.iconfinder.com/data/icons/business-1-colored/100/icon-recover-password-512.png";
  errorIcon = "https://cutt.ly/TVNjRs3";
  
  recoveryPassword: FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private routes: Router,
    private authErrorService: AuthErrorService){
      this.recoveryPassword = this.fb.group({
        email: ['', [Validators.required, Validators.email]]
      })
     }

  ngOnInit(): void {
  }

  recovery(){
    const email = this.recoveryPassword.value.email;
    if(email === ''){
      this.toastr.error('No se ha escrito algun correo', 'Error')
      return;
    }
    this.loading = true;
    this.afAuth.sendPasswordResetEmail(email).then(()=>{
      this.toastr.info('Email enviado para recuperar su contraseña', 'Correo enviado')
      this.routes.navigate(['/login']); 
    }).catch((error) =>{
      this.loading = false;
      this.toastr.error(this.authErrorService.firebaseError(error.code), 'Error');
    })
  }

}
