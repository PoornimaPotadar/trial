import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InfyAirlinesService } from '../infy-airlines.service';

@Component({
  selector: 'app-airlines-list',
  templateUrl: './airlines-list.component.html',
  styleUrls: ['./airlines-list.component.css'],
})
export class AirlinesListComponent implements OnInit {
  constructor(
    private infyAirlinesService: InfyAirlinesService,
    private router: Router
  ) {}

  public airlinesArray: any[] = [];
  public errorMessage: string = '';

  ngOnInit(): void {
    this.getAirlines();
  }

  getAirlines() {
    /*
      1. Invoke the getAirlines() method of InfyAirlinesService which returns an observable as a response
      2. In success case, assign the response value to airlinesArray property
      3. In error case, set the errorMessage as "Something went wrong"
      4. This method should be invoked on load of the component
    */
    this.infyAirlinesService.getAirlines().subscribe((data) => {
      data.subscribe((data) => {
        this.airlinesArray = data;
        console.log(this.airlinesArray);
      });
    });
  }

  showBookingForm(airlinesId: any) {
    /* Code here to navigate to the URL /book-ticket/:airlinesId page */
    this.router.navigate(['/book-ticket/', airlinesId]);
  }
}
