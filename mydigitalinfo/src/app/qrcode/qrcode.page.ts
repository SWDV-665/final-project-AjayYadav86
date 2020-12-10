import { Component, OnInit, NgZone } from '@angular/core';
import { CustomerService } from './../shared/customer.service';
import { Router ,NavigationExtras} from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})

export class QrcodePage implements OnInit {

  customerForm: FormGroup;

  fever: boolean;
  cough: boolean;
  travel: boolean;
  virusExposed: boolean;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private zone: NgZone,
    private customerService: CustomerService

  ) { }

  ngOnInit() {
    this.customerForm = this.formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      address1: new FormControl('', Validators.required),
      address2: new FormControl(''),
      city: new FormControl('', Validators.required),
      state: new FormControl('', Validators.required),
      zipcode: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', Validators.required),
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      fever: this.fever !== null ? this.fever : false,
      cough: this.cough !== null ? this.fever : false,
      travel: this.travel !== null ? this.travel : false,
      virusExposed: this.virusExposed !== null ? this.virusExposed : false
    });
  }
  /* Validation Messages*/
  validation_messages = {
    'firstName': [
      { type: 'required', message: 'First Name is required.' }
    ],
    'lastName': [
      { type: 'required', message: 'Last Name is required.' }
    ],
    'address1': [
      { type: 'required', message: 'Address Line is required.' }
    ],
    'city': [
      { type: 'required', message: 'City is required.' }
    ],
    'state': [
      { type: 'required', message: 'State is required.' }
    ],
    'zipcode': [
      { type: 'required', message: 'Zip Code  is required.' }
    ],
    'email': [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    'phone': [
      { type: 'required', message: 'Phone is required.' },
      { type: 'validCountryPhone', message: 'The phone is incorrect for the selected country.' }
    ]
  };
  /* Returns the Current Date*/
  getCurrentDay() {
    const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    var myCurrentDate = new Date();
    myCurrentDate.setDate(myCurrentDate.getDate() + 3);
    return myCurrentDate.toLocaleString('en-US', DATE_OPTIONS).toString();
  }

  onFormSubmit() {
    const customerInfo = {
      firstName: this.customerForm.value.firstName,
      lastName: this.customerForm.value.lastName,
      address1: this.customerForm.value.address1,
      address2: '',
      city: this.customerForm.value.city,
      state: this.customerForm.value.state,
      zipcode: this.customerForm.value.zipcode,
      phoneNumber: this.customerForm.value.phoneNumber,
      emailAddress: this.customerForm.value.email,
      fever: this.customerForm.value.fever !== null ? this.customerForm.value.fever : false,
      cough: this.customerForm.value.cough !== null ? this.customerForm.value.cough : false,
      travel: false,
      virusExposed: false,
      customerId: uuidv4(),
      currentDateTime: this.getCurrentDay(),
    }

    const navigationExtras: NavigationExtras = {
      state: {
        id: customerInfo.customerId
      }
    };

    console.log(customerInfo.currentDateTime);

    this.customerService.addCustomerInfo(customerInfo)
      .subscribe((res) => {
        this.zone.run(() => {
          console.log(res)
          this.customerForm.reset();
          this.router.navigate(['newComponent'], );
          this.router.navigate(['/qrshow'],navigationExtras);
        })
      });
  }
}
