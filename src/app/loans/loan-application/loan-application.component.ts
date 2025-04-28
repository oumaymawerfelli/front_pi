import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services-loans/api.service';
import SignaturePad from 'signature_pad';
import { LoanRequestResponseDto } from 'src/app/models/loan-request-response.dto';
import { HttpClient } from '@angular/common/http'; // ✅ Add this line
 
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

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
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
      landId: [null]

    });
  }
  
  ngOnInit(): void {
    this.apiService.getOwners().subscribe({
      next: (data: any[]) => {
        this.owners = data;
        console.log('Owners fetched:', this.owners);
      },
      error: (error) => console.error('Error loading owners:', error)
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
        ownerId: this.selectedItem?.owner?.id || null,
        borrowerName: this.borrower?.name,
        borrowerContact: this.borrower?.email,
        startDate: this.formatDate(new Date())
      });
    }
  }

  ngAfterViewInit(): void {
    this.signaturePad = new SignaturePad(this.canvasEl.nativeElement, {
      backgroundColor: 'white',
      penColor: 'black'
    });

    this.canvasEl.nativeElement.addEventListener('mouseup', this.updateSignature.bind(this));
    this.canvasEl.nativeElement.addEventListener('touchend', this.updateSignature.bind(this));
  }

  private isLoanItem(item: any): boolean {
    return 'specifications' in item;
  }

  private setLoanDurationValidation(): void {
    this.maxLoanDuration = this.isEquipmentLoan
      ? parseInt((this.selectedItem.duration as string).split('-')[1], 10)
      : 60;

    const loanDurationControl = this.applicationForm.get('loanDuration');
    if (loanDurationControl) {
      loanDurationControl.setValidators([
        Validators.required,
        Validators.min(1),
        Validators.max(this.maxLoanDuration)
      ]);
      loanDurationControl.updateValueAndValidity();
    }
  }

  private updateSignature(): void {
    const dataURL = this.signaturePad.toDataURL();
    this.applicationForm.get('signature')?.setValue(dataURL);
  }
  
  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // returns 'YYYY-MM-DD'
  }
  
  private isSignatureReallyEmpty(): boolean {
    const canvas = this.canvasEl.nativeElement;
    const context = canvas.getContext('2d');
  
    if (!context) return true;
  
    const pixelBuffer = new Uint32Array(
      context.getImageData(0, 0, canvas.width, canvas.height).data.buffer
    );
  
    return !pixelBuffer.some(color => color !== 0xffffffff);
  }
  
 
  submitApplication(): void {
    if (this.isSignatureReallyEmpty()) {
      alert('Please provide your signature before submitting.');
      return;
    }
  
    this.updateSignature(); // capture the signature again just before sending!
  
    console.log('Form validity:', this.applicationForm.valid);
    console.log('Form errors:', this.applicationForm.errors);
    console.log('Form value:', this.applicationForm.value);
  
    if (this.applicationForm.valid) {
      console.log('Submitting form...');
      this.apiService.createLoanRequest(this.applicationForm.value).subscribe({
        next: (response: LoanRequestResponseDto) => {
          console.log('API Response:', response);
          if (response.requestId) {
            this.router.navigate(['/confirmation'], {
              state: {
                applicationData: response,
                requestId: response.requestId
              }
            });
          }
        },
        error: (err) => {
          console.error('Error:', err);
          this.messageFromBackend = err.message || 'Submission failed';
          alert('Submission failed: ' + err.message);
        }
      });
    } else {
      this.applicationForm.markAllAsTouched();
      alert('Please complete all required fields correctly.');
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
    this.applicationForm.get('signature')?.reset();
  }
  
  undoSignature(): void {
    const data = this.signaturePad.toData();
    if (data.length > 0) {
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
    const link = document.createElement('a');
    link.href = signatureData;
    link.download = 'signature.png';
    link.click();
  }

}
