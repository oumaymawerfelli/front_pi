import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services-loans/api.service';
import SignaturePad from 'signature_pad';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-loan-application',
  templateUrl: './loan-application.component.html',
  styleUrls: ['./loan-application.component.css']
})
export class LoanApplicationComponent implements OnInit, AfterViewInit {
  applicationForm: FormGroup;
  selectedItem!: any;
  borrower!: any;
  owners: any[] = []; 
  
  isEquipmentLoan: boolean = false;
  maxLoanDuration: number = 12;
  pageTitle: string = 'Loan application';
  messageFromBackend: string = '';

  @ViewChild('canvas', { static: false }) canvasEl!: ElementRef<HTMLCanvasElement>;
  signaturePad!: SignaturePad;
  canvasElement: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private el: ElementRef,
    private renderer: Renderer2,
    private apiService: ApiService,
    private http: HttpClient // ✅ Add this line
  ) {
    this.applicationForm = this.fb.group({
      borrowerName: ['', Validators.required],
      ownerId: [null, Validators.required],
      borrowerContact: ['', [Validators.required, Validators.email]],
      loanPurpose: ['', Validators.required],
      loanDuration: ['', [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      specialRequest: [''],
      termsAccepted: [false, Validators.requiredTrue],
      signature: ['', Validators.required],
      equipmentId: [null],
      landId: [null],
      
      statusReq: ['PENDING']
    });
  }
  
  ngOnInit(): void {
   

    this.apiService.getOwners().subscribe(
      (data: any[]) => {
        this.owners = data;
        console.log('Owners fetched:', this.owners); // Optional: to debug
      },
      (error) => console.error('Error loading owners:', error)
    );
    

    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state) {
      this.selectedItem = navigation.extras.state['selectedItem'];
      this.borrower = navigation.extras.state['borrower'];
      this.isEquipmentLoan = this.isLoanItem(this.selectedItem);
      this.setLoanDurationValidation();

      this.applicationForm.patchValue({
        equipmentId: this.isEquipmentLoan ? this.selectedItem.id : null,
        landId: !this.isEquipmentLoan ? this.selectedItem.id : null,
        

        ownerId: this.selectedItem?.owner?.id || null, // assuming selectedItem contains owner
        
        
        borrowerName: this.borrower?.name,
        borrowerContact: this.borrower?.email
      });
    }
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement, {
      backgroundColor: 'white',
      penColor: 'black'
    });

    this.canvasEl.nativeElement.addEventListener('mouseup', () => {
      const dataURL = this.signaturePad.toDataURL();
      this.applicationForm.get('signature')?.setValue(dataURL);
    });

    this.canvasEl.nativeElement.addEventListener('touchend', () => {
      const dataURL = this.signaturePad.toDataURL();
      this.applicationForm.get('signature')?.setValue(dataURL);
    });
  }

  private isLoanItem(item: any): boolean {
    return 'specifications' in item;
  }

  private setLoanDurationValidation(): void {
    this.maxLoanDuration = this.isEquipmentLoan ?
      parseInt((this.selectedItem.duration as string).split('-')[1], 10) : 60;

    this.applicationForm.get('loanDuration')?.setValidators([
      Validators.required,
      Validators.min(1),
      Validators.max(this.maxLoanDuration)
    ]);
    this.applicationForm.get('loanDuration')?.updateValueAndValidity();
  }

  submitApplication(): void {
    // Ensure signature is saved
    if (!this.signaturePad.isEmpty()) {
      const dataURL = this.signaturePad.toDataURL();
      this.applicationForm.get('signature')?.setValue(dataURL);
      this.applicationForm.get('signature')?.markAsTouched();
    } else {
      this.applicationForm.get('signature')?.setValue('');
    }
  
    // Validate and submit
    if (this.applicationForm.valid) {
      const loanRequest = this.applicationForm.value;
  
      console.log('Submitting loan request:', loanRequest);
  
      this.apiService.createLoanRequest(loanRequest).subscribe({
        next: (response: any) => {
          console.log('Success:', response);
          alert('Loan request submitted successfully!');
          this.router.navigate(['/confirmation'], { state: { applicationData: response } });
        },
        error: (err: { message: any; }) => {
          console.error('Error submitting loan request:', err);
          alert(`Submission failed. Error: ${err.message || 'Unknown error'}`);
        }
      });
      
  
    } else {
      alert('Please complete all required fields.');
    }
    console.log(this.applicationForm.value);
console.log(this.applicationForm.valid);
console.log(this.applicationForm.errors);

  }
  
  
  
  
  cancelApplication(): void {
    this.router.navigate(['/loan-info']);
  }

  navigateToTerms(): void {
    this.router.navigate(['/terms-acceptance']);
  }

  clearSignature(): void {
    this.signaturePad.clear();
    this.applicationForm.get('signature')?.setValue('');
  }

  undoSignature(): void {
    const data = this.signaturePad.toData();
    if (data) {
      data.pop();
      this.signaturePad.fromData(data);
      const updated = this.signaturePad.toDataURL();
      this.applicationForm.get('signature')?.setValue(updated);
    }
  }

  downloadSignature(): void {
    if (this.signaturePad.isEmpty()) {
      alert('Please provide a signature first.');
      return;
    }

    const signatureData = this.signaturePad.toDataURL();
    this.applicationForm.patchValue({ signature: signatureData });

    const link = document.createElement('a');
    link.href = signatureData;
    link.download = 'signature.png';
    link.click();
  }
}
