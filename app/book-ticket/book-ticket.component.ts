import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InfyAirlinesService } from '../infy-airlines.service';

@Component({
  selector: 'app-book-ticket',
  templateUrl: './book-ticket.component.html',
  styleUrls: ['./book-ticket.component.css'],
})
export class BookTicketComponent implements OnInit {
  constructor(
    private _aRoute: ActivatedRoute,
    private fb: FormBuilder,
    private ias: InfyAirlinesService
  ) {}

  public airlinesId: string = '';
  public bookingForm: FormGroup = new FormGroup({});
  public successMessage: string = '';
  public errorMessage: string = '';

  ngOnInit(): void {
    /* DONE ADD THE CODE HERE TO FETCH THE airlinesId from ROUTE PARAMETER and set to airlinesId property*/
    this._aRoute.params.subscribe((data) => {
      this.airlinesId = data.airlinesId;
    });
    /*  DONE
      Add the following form controls to the bookingForm reactive form instance
      with the given default values and validators for each form control
        1. airlinesId:- default: airlinesId property, should be disabled, Validators: required
        2. customerName:- default: '', Validators: required, pattern - should have only alphabets and space
        3. noOfTickets:- default: '', Validators: required, minimum 1 and maximum 6
        4. dateOfJourney:- default: '', Validators: required, validateDate custom validation
    */
    this.bookingForm = this.fb.group({
      airlinesId: new FormControl({ value: this.airlinesId, disabled: true }, [
        Validators.required,
      ]),
      customerName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      noOfTickets: new FormControl('', [
        Validators.required,
        Validators.min(1),
        Validators.max(6),
      ]),
      dateOfJourney: new FormControl('', [
        Validators.required,
        this.validateDate,
      ]),
    });
  }

  validateDate(c: FormControl) {
    /*DONE
      1. it should take the dateOfJourney value and validate it
      2. if the date is from past, it should return { dateError: { message: "Journey Date cant be a past date" } }
      3. else it should return null
    */
    let mydate = new Date(c.value);
    let todaysDate = new Date();
    if (mydate < todaysDate) {
      return { dateError: { message: 'Journey Date cant be a past date' } };
    } else {
      return null;
    }
  }

  bookTicket() {
    /* DONE
      1. reset successMessage and errorMessage to "" => empty string
      2. invoke the bookTicket method of InfyAirlinesService class by passing 
         the bookingForm value, this returns an observable as response
      3. In success case, populate successMessage as You ticket is successfully Booked. Booking id is <<response id>>
      4. In error case, populate errorMessage as 'Booking Failed' 
    */
    let postBody = {
      airlinesId: this.bookingForm.get('airlinesId').value,
      customerName: this.bookingForm.get('customerName').value,
      dateOfJourney: this.bookingForm.get('dateOfJourney').value,
      noOfTickets: this.bookingForm.get('noOfTickets').value,
    };
    this.successMessage = '';
    this.errorMessage = '';
    this.ias.bookTicket(postBody).subscribe({
      next: (data) => {
        data.subscribe((passedData) => {
          this.successMessage = `You ticket is successfully Booked. Booking id is ${passedData.id}`;
        });
      },
      error: (error) => {
        error.subscribe((passederror) => {
          this.errorMessage = 'Booking Failed ';
        });
      },
    });
  }
}
