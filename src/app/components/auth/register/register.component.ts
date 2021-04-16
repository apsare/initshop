import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

registerForm: FormGroup;
errorMessage: string;
successMessage: string;

  constructor(private fb: FormBuilder,
              private userService: UsersService,
              private router: Router,

    ) { }


  ngOnInit(): void {
    this.initRegisterForm()
  }

  initRegisterForm():void{
    this.registerForm = this.fb.group({
      sexe:       this.fb.control(''),
      pseudo:     this.fb.control('',[Validators.required]),
      lastname:   this.fb.control('',[Validators.required]),
      firstname:  this.fb.control('',[Validators.required]),
      email:      this.fb.control('',[Validators.required, Validators.email]),
      password:   this.fb.control('',[Validators.required, Validators.minLength(6)]),
      dateBirth:  this.fb.control('',[Validators.required]),
    });
  }

  onSubmit(){
    const sexe = this.registerForm.get('sexe').value;
    const pseudo = this.registerForm.get('pseudo').value;
    const lastname = this.registerForm.get('lastname').value;
    const firstname = this.registerForm.get('firstname').value;
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value;
    const dateBirth = this.registerForm.get('dateBirth').value;

    const newUser: Users = {
      sexe: sexe,
      pseudo: pseudo,
      lastname: lastname,
      firstname: firstname,
      email: email,
      password: password,
      dateBirth: dateBirth,
    };

    console.log(newUser);

    this.userService.createUser(newUser)
    .then((data) => {
      this.errorMessage = null
      this.successMessage = "Votre compte a bien été créé, vous allez être redirigé.";
      setTimeout(() => {
        this.successMessage = null
        this.router.navigate(['/shop']);
      },2000);

    })
    .catch((error) => {
      this.errorMessage = error;
      setTimeout(()=>{
        this.errorMessage = null;
      },3000)
      console.log(error);
    })

  }

}
