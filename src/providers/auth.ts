import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import AuthProvider = firebase.auth.AuthProvider;

@Injectable()
export class AuthService {
	private user: firebase.User;

	constructor(public afAuth: AngularFireAuth,  public db: AngularFireDatabase) {
		afAuth.authState.subscribe(user => {
			this.user = user;
		});
	}

	getUid(): string {
		return this.user.uid;
	}

	getUserdata(){
		return firebase.database().ref('/userdata/' + this.user.uid);		
	}

	getUserstates() {
		console.log('/userdata/' + this.user.uid + '/userstates/');
		return firebase.database().ref('/userdata/' + this.user.uid + '/userstates/');
	}

	updateUserStates(userstates: string[]) {
        const userstatesRef = this.db.object('/userdata/' + this.user.uid + '/userstates');
        userstatesRef.set(userstates);
    }

	signInWithEmail(credentials) {
		console.log('Sign in with email');
		return this.afAuth.auth.signInWithEmailAndPassword(credentials.email,
			credentials.password);
	}

	signUp(credentials) {
		return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email, credentials.password);
	}

	get authenticated(): boolean {
		return this.user !== null;
	}

	getEmail() {
		return this.user && this.user.email;
	}

	signOut(): Promise<void> {
		return this.afAuth.auth.signOut();
	}

	signInWithGoogle() {
		console.log('Sign in with google');
		return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
	}

	signInWithFB() {
		console.log('Sign in with facebook');
		return this.oauthSignIn(new firebase.auth.FacebookAuthProvider);
	}

	private oauthSignIn(provider: AuthProvider) {
		if (!(<any>window).cordova) {
			return this.afAuth.auth.signInWithPopup(provider);
		} else {
			return this.afAuth.auth.signInWithRedirect(provider)
				.then(() => {
					return this.afAuth.auth.getRedirectResult().then(result => {
						// This gives you a Google Access Token.
						// You can use it to access the Google API.
						let token = result.credential.accessToken;
						// The signed-in user info.
						let user = result.user;
						console.log(token, user);
					}).catch(function (error) {
						// Handle Errors here.
						alert(error.message);
					});
				});
		}
	}

}
