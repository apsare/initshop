import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UsersService,
              private fb: FormBuilder,
    ) { }

  loginForm: FormGroup;


  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void{
    this.loginForm = this.fb.group({
      email: this.fb.control('',[Validators.email,Validators.required]),
      password: this.fb.control('',[Validators.minLength(6),Validators.required]),
    })
  }

  onSubmit():void{
    const email = this.loginForm.get('email').value;
    const password = this.loginForm.get('password').value;
    console.log({email: email, password: password});
  }

}
