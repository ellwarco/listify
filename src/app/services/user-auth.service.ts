import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserAuth, UserProfile, User } from '../models';
import * as firebase from "firebase";
import { Http, Headers } from '@angular/http';

var BASE_URL: string ='http://127.0.0.1:3000/api'
/**
 * @class UserAuthService:
 * 
 * Auth Service
 * Used to Login, Logout, Retrive User details and etc..
 * operation that can be carried out on provider API.
 */
@Injectable()
export class UserAuthService {
  
  /**
   * @constructor
   */
  constructor(private http: Http) {
    var config = {
      apiKey: "AIzaSyB_0Z6nSJSdCLY7CbjvcLKAFBLJ45Nb3_Y",
      authDomain: "istalk-5ec3f.firebaseapp.com",
      databaseURL: "https://istalk-5ec3f.firebaseio.com",
      storageBucket: "istalk-5ec3f.appspot.com",
      messagingSenderId: "211546852493",
    };
    firebase.initializeApp(config);
  }
  
  getUserInfo(serverToken){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.http.post("http://127.0.0.1:3000/api/tweets/get_user_info", 
        JSON.stringify({ token: serverToken }),
        { headers: headers })
      .subscribe((response) => {
        console.log(response)
      })
  }



  login(): Observable<any> {
    var provider = new firebase.auth.TwitterAuthProvider();
    
    return Observable.create(observer => {
      firebase.auth().signInWithPopup(provider).then(result => {
        console.log("user is:", result.user)
        const userAuth = new UserAuth(
          result.credential.accessToken,
          result.credential.secret)
        
        observer.next(userAuth);
      })
    });
  }

  logout(): Observable<any> {
      return Observable.of(localStorage.removeItem('access_token'));
  }

  storeUsertoBackend(payload){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post("http://127.0.0.1:3000/api/auth/create_new_user",
                          JSON.stringify(payload),
                          {headers: headers})
            .map(response =>{
              var token = response.json().token
              var userAuth = payload.userAuth
              var newUserAuth = new UserAuth(userAuth.access_token, userAuth.secret_token, token)
              return newUserAuth;
            } )
  }

}