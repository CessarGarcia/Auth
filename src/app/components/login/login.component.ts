import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import{AuthErrorService} from 'src/app/services/auth-error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login_img = "https://cdn-icons-png.flaticon.com/512/2250/2250207.png";
  errorIcon = "https://cutt.ly/TVNjRs3";
  
  loginUsuario : FormGroup;
  loading: boolean = false;

  constructor(private fb: FormBuilder,
    private afAuth: AngularFireAuth,
    private toastr: ToastrService,
    private routes: Router,
    private authErrorService: AuthErrorService){ 
      this.loginUsuario = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
      })
    }

  ngOnInit(): void {
  }

  login(){
    const email = this.loginUsuario.value.email;
    const password = this.loginUsuario.value.password;
    this.loading = true;

    //console.log(email, password);
    this.afAuth.signInWithEmailAndPassword(email, password).then((user)=>{
      console.log(user);
      if(user.user?.emailVerified){
        this.routes.navigate(['/dashboard'])
      }else{
        this.routes.navigate(['/verificar-correo'])
      }
    }).catch((error)=>{
      this.loading = false;
      this.toastr.error(this.authErrorService.firebaseError(error.code), 'Error');
    }) 
  }
}
