import { Component, OnInit } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Auth } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-test-firebase',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './test-firebase.component.html',
  styleUrl: './test-firebase.component.css'
})
export class TestFirebaseComponent implements OnInit {
  firebaseConnected = false;
  projectId = '';
  authEnabled = false;

  constructor(
    private firestore: Firestore,
    private auth: Auth
  ) {}

  ngOnInit() {
    this.testFirebase();
  }

  testFirebase() {
    try {
      this.projectId = this.firestore.app.options.projectId || 'No encontrado';
      this.firebaseConnected = true;
      this.authEnabled = this.auth !== null;
      
      console.log('🔥 Firebase conectado!');
      console.log('Proyecto:', this.projectId);
    } catch (error) {
      console.error('❌ Error:', error);
      this.firebaseConnected = false;
    }
  }
}