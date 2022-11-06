import {Component, OnInit} from '@angular/core';

import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from "../../core/Client";


@Component({
  selector: 'app-authorize',
  templateUrl: './authorize.component.html',
  styleUrls: ['./authorize.component.css']
})
export class AuthorizeComponent implements OnInit {
  loginForm: FormGroup;
  showPassword: boolean = true;

  constructor(private formBuilder: FormBuilder, private client: Client) {
  }

  ngOnInit(): void {
    this.createLoginForm();
  }

  createLoginForm(): void {
    // Форма для создания новости
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  submit(): void {
    console.log(this.loginForm.value)
  }
}


