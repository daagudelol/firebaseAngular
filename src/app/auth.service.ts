import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators'
import { auth } from 'firebase';
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { FireDbService } from './fire-db.service';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  email = '';
  pass = '';
  authUser = null;

  constructor(public auth: AngularFireAuth, private router: Router, private db: FireDbService) { }

  user = this.auth.authState.pipe ( map( authState =>{
    console.log('aitState: ', authState);
    if (authState){
      this.authUser = authState;
      return authState;
    } else{
      return null;
    }

  } ))

  login(){
    console.log('login!' );
    this.auth.auth.signInWithEmailAndPassword(this.email, this.pass)
    .then( user =>{
      console.log('user logueado con email: ', user);
      this.email = '';
      this.pass = '';
      this.authUser = user.user;
      this.db.updateUserData(user.user);
    })
    .catch( error =>{
       //console.log('error en email login:', error);
       console.log('error code: ', error.code);
       if(error.code === 'auth/wrong-password'){
         alert('error de contraseña')
       }else if(error.code==='auth/invalid-email'){
         alert('El correo no es valido')
       }


    })
  }

  glogin(){
    console.log('Google login!' );
    this.auth.auth.signInWithPopup( new auth.GoogleAuthProvider())
    .then( user =>{
      console.log('user logueado: ', user);
      this.email= '';
      this.pass= '';
      this.authUser = user.user;
      this.db.updateUserData(user.user);
    })
    .catch( error =>{
       console.log('error en google login:', error);
    })
  }

  logout(){
    console.log('logout!' );
    this.auth.auth.signOut();
    this.email = '';
    this.pass = '';
    this.router.navigate(['/']);
  }



}
