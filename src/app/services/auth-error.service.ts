import { Injectable } from '@angular/core';
import { firebaseErrorEnum } from '../utils/firebase-code-error';

@Injectable({
  providedIn: 'root'
})
export class AuthErrorService {

  constructor() { }
  /* Alets */
  firebaseError(code: string) {
    switch (code) {
                   //Correo existente
      case firebaseErrorEnum.emailExisting: return 'El usuario ya existe'
                 //Contraseña debil
      case firebaseErrorEnum.weakPassword: return 'La contraseña es muy debil'
               //Correo incorrecto
      case firebaseErrorEnum.invalidEmail: return 'El correo es incorrecto'
            //Contraseña Incorrecta
      case firebaseErrorEnum.wrongPassword: return 'La contraseña es incorrecta' 
         //Usuario no registrado
      case firebaseErrorEnum.userNotRegistered: return 'El usuario aun no ha sido registrado' 
      default: return 'Error desconocido'
    }
  }
}
