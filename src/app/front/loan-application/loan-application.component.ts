import { Component, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit {
scrollToTop() {
throw new Error('Method not implemented.');
}
  applicationForm: FormGroup;
  selectedItem!: any;
  borrower!: any;
  isEquipmentLoan: boolean = false;
  maxLoanDuration: number = 12;
  pageTitle: string = 'Loan application';  // Initialize pageTitle here

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2
  ) {
    this.applicationForm = this.fb.group({
      borrowerName: ['', Validators.required],
      borrowerContact: ['', [Validators.required, Validators.email]],
      loanPurpose: ['', Validators.required],
      loanDuration: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      specialRequest: [''],
      termsAccepted: [false, Validators.requiredTrue], // ✅ Must be required
    });
    
  }

  ngOnInit(): void {


   

    // Set the dynamic background on the nav element
    const navElement = this.el.nativeElement.querySelector('nav');
    this.renderer.setStyle(navElement, 'background', 'url("assets/img/page-title-bg.jpg") no-repeat center center');
    this.renderer.setStyle(navElement, 'background-size', 'cover');
    this.renderer.setStyle(navElement, 'text-align', 'center');
    this.renderer.setStyle(navElement, 'padding', '150px 0');

    // Update pageTitle based on the route
    this.route.url.subscribe(url => {
      this.pageTitle = url[0]?.path === 'loan-management' ? 'Loan Management' : 'Loan application';
    });

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.selectedItem = navigation.extras.state['selectedItem'];
      this.borrower = navigation.extras.state['borrower'];
      this.isEquipmentLoan = this.isLoanItem(this.selectedItem);
      this.setLoanDurationValidation();

      this.applicationForm.patchValue({
        equipmentId: this.isEquipmentLoan ? this.selectedItem.id : null,
        landId: !this.isEquipmentLoan ? this.selectedItem.id : null,
        borrowerId: this.borrower?.id,
        borrowerName: this.borrower?.name,
        borrowerContact: this.borrower?.email
      });
    }
  }

  private isLoanItem(item: any): boolean {
    return 'specifications' in item;
  }

  private setLoanDurationValidation(): void {
    this.maxLoanDuration = this.isEquipmentLoan ? 
      parseInt((this.selectedItem.duration as string).split('-')[1], 10) : 60;

    this.applicationForm.get('loanDuration')?.setValidators([Validators.required, Validators.min(1), Validators.max(this.maxLoanDuration)]);
    this.applicationForm.get('loanDuration')?.updateValueAndValidity();
  }

  submitApplication(): void {
    if (this.applicationForm.valid) {
      const loanRequest = this.applicationForm.value;
      console.log('Submitting Loan Request:', loanRequest);
      alert('Your loan application has been submitted successfully!');
      this.router.navigate(['/confirmation'], {
        state: { applicationData: loanRequest }
      });
    } else {
      alert('Please fill out the form correctly before submitting.');
    }
  }

  cancelApplication(): void {
    this.router.navigate(['/loan-info']);
  }
  navigateToTerms(): void {
    this.router.navigate(['/terms-acceptance']);
  }

}
