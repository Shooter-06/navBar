WHy is the delete link in the SiteComponent html table not able to remove delete the records in the table
Fix and explain why



// Site cimponent 
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SiteValues } from 'main/app/admin-component/models/SiteDomain.model';
import { PortalSite } from 'main/app/admin-component/models/portal-site.model';
import { SiteServiceService } from 'main/app/admin-component/services/site-service.service';

@Component({
    selector: 'app-site',
    templateUrl: './site.component.html',
    styleUrls: ['./site.component.scss']
})

export class SiteComponent implements OnInit, OnDestroy {
    sites: PortalSite[] = [];
	
	private subscription: subscription = new subscription():
	
	localSiteValues: PortalSite[]=[{	
		portalServiceSiteId:1,  portalServiceSite: 'myReports', portalServiceSiteKey: 'PSS_myReports', groupNames: '',
		userNames: '', isActive: true, contactEmail: '', contactEmailText:'', reportPath:'', reportArchivePath: '', helpUrl: '', 
		manualReportPath: '', manualReportSite: '', manualReportSiteContent: '', usageExtractPath: '', divisionId: 1, defaultSite: true 
	},
	{	
		portalServiceSiteId:2,  portalServiceSite: 'hrReports', portalServiceSiteKey: 'PSS_hrReports', groupNames: '',
		userNames: '', isActive: true, contactEmail: '', contactEmailText:'', reportPath:'', reportArchivePath: '', helpUrl: '', 
		manualReportPath: '', manualReportSite: '', manualReportSiteContent: '', usageExtractPath: '', divisionId: 2, defaultSite: true 
	}];
	
    constructor(private siteService: SiteServiceService, private route: ActivatedRoute) {}

    ngOnInit(): void {
		
		this.loadSite();
		this.subscription.add(this.route.paramMap.subscribe(() => loadSite()));
    }
	
	ngOnDestroy(): void {
		this.subscription.unsubscribe();
    }
	
	loadSite(): void{
	
		this.siteService.getData().subscribe(sites => {
            this.sites = [];
			this.sites.push(...this.localSiteValues, ...sites);
        });
	}

    deleteSite(id: number) {
        this.siteService.deleteData(id).subscribe(() =>{
			this.loadSite();
		});
		
    }
}


<body>
    <div class="main-container">
        <table>
            <tr style="background-color: #BCD2EE;">
                <th style="width: 106px;">ID</th>
                <th style="width: 100px; text-align: right;">Names</th>
                <th>key</th>
                <th style="width: 100px;">Division</th>
                <th>Admin Access Group</th>
                <th style="width: 100px">Active</th>
                <th style="width: 140px">Actions</th>
            </tr>
            <tr *ngFor="let site of sites; let i = index">
                <td style="text-align: right;">{{site.portalServicesiteId}}</td>
                <td> <a [routerLink]="['/content-section']">{{site.portalServicesite}}</a></td>
                <td>{{site.portalServicesiteKey}}</td>
                <td>{{site.divisionId}}</td>
                <td>{{site.groupNames}}</td>
                <td>{{site.isActive ? 'Yes' : 'No'}}</td>
                <td>
                    <a [routerLink]="['/add-edit-site', i]" >EDIT</a> |
                    <a (click)="deleteSite(i); $event.preventDefault()">DELETE</a>
                </td>
            </tr>
        </table>
        <br>
        <button style="background-color: #BCD2EE;" routerLink="/add-edit-site" routerLinkActive="active">Add site</button>
    </div>
</body>



// this is the form component 
import { Component, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PortalSite } from 'main/app/admin-component/models/portal-site.model';
import { SiteServiceService } from 'main/app/admin-component/services/site-service.service';

export interface DropValues {
    id: number;
    descr: string;
}

@Component({
    selector: 'app-add-edit-site',
    templateUrl: './add-edit-site.component.html',
    styleUrls: ['./add-edit-site.component.scss']
})

export class AddEditSiteComponent implements OnInit {
    isValidForm: boolean;
    adminForm: FormGroup;
	isEdit = false;
	
	editIndex?= number;

    portalServiceSiteId?: FormControl;
    portalServiceSite?: FormControl;
    portalServiceSiteKey?: FormControl;
    groupNames?: FormControl;
    userNames?: FormControl;
    isActive?: FormControl;
    contactEmail?: FormControl;
    contactEmailText?: FormControl;
    reportPath?: FormControl;
    reportArchivePath?: FormControl;
    helpUrl?: FormControl;
    manualReportPath?: FormControl;
    manualReportSite?: FormControl;
    manualReportSiteContent?: FormControl;
    usageExtractPath?: FormControl;
    divisionId?: FormControl;
    defaultSite?: FormControl;
    selectedValues: DropValues[] = [];
    portalSite?: PortalSite;

    constructor(private formBuilder: FormBuilder, private siteService: SiteServiceService, private router: Router,  private route: ActivatedRoute) {

    this.isValidForm = false;

    this.adminForm = this.formBuilder.group({});

    if (this.adminForm) {

        this.adminForm.addControl('portalServicesiteId', 
        this.formBuilder.control('', Validators.required));

        this.adminForm.addControl('portalServicesite', 
        this.formBuilder.control('', Validators.required));

        this.adminForm.addControl('portalServicesiteKey', 
        this.formBuilder.control('', Validators.required));

        this.adminForm.addControl('groupNames', 
        this.formBuilder.control(''));

        this.adminForm.addControl('userNames', 
        this.formBuilder.control(''));

        this.adminForm.addControl('isActive', 
        this.formBuilder.control('', Validators.required));

        this.adminForm.addControl('contactEmail', 
        this.formBuilder.control(''));

        this.adminForm.addControl('contactEmailText', 
        this.formBuilder.control(''));

        this.adminForm.addControl('reportPath', 
        this.formBuilder.control(''));

        this.adminForm.addControl('reportArchivePath', 
        this.formBuilder.control(''));

        this.adminForm.addControl('helpUrl', 
        this.formBuilder.control(''));

        this.adminForm.addControl('manualReportPath', 
        this.formBuilder.control(''));

        this.adminForm.addControl('manualReportsite', 
        this.formBuilder.control(''));

        this.adminForm.addControl('manualReportsiteContent', 
        this.formBuilder.control(''));

        this.adminForm.addControl('usageExtractPath', 
        this.formBuilder.control(''));

        this.adminForm.addControl('divisionId', 
        this.formBuilder.control(''));

        this.adminForm.addControl('defaultsite', 
        this.formBuilder.control('', Validators.required));
    }
	
	this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.editIndex = +params['id'];  // "+" is used to convert string to number
        this.adminForm.patchValue(this.siteService.getSingleData(this.editIndex));
      }
    });
  }
	
	
}



    dataValues: Array<string> = [];
    modelValue?: string = undefined;
    data: DropValues[] = [
        { id: 0, descr: 'This is the first Option' },
        { id: 1, descr: 'This is the second option' },
        { id: 2, descr: 'This is the third option' },
        { id: 3, descr: 'This is the fourth option' },
        { id: 4, descr: 'This is the fifth Option' },
        { id: 5, descr: 'This is the sixth Option' }
    ];

    ngOnInit() {
        this.dataValues = this.data.slice(0, 30).map((item, index) => `${index}: ${item.descr}`);
		ngOnInit() {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isEdit = true;
        this.editIndex = +params['id'];  // "+" is used to convert string to number
        this.siteService.getSingleData(this.editIndex).subscribe(site => {
          this.adminForm.patchValue(site);
        });
      }
    });
  }
    }

    onSelectionChange(event: any) {
        console.log(event);
    }

	onSubmit() {
		if (this.isEdit) {
		  this.siteService.updateData(this.editIndex, this.adminForm.value).subscribe(() => {
			this.router.navigate(['/site']); 
		  });
		} else {
		  this.siteService.saveData(this.adminForm.value).subscribe(() => {
			this.router.navigate(['/site']); 
		  });
		}
		this.adminForm.reset();
	}

    cancel() {
        console.log('form is resetted');
        this.adminForm.reset();
		this.router.navigate(['/site']); // Add this line
    }
}



<form [formGroup]="adminForm"  (ngSubmit)="onSubmit()"  class="main-container">

  <div class="form-container">
    <div class="left">

      <div class="form-group">
        <label>Portal Site Service Site ID</label>
        <input type="text" formControlName="portalServicesiteId">
        <div class="errorEdit" *ngIf="adminForm.get('portalServicesiteId')?.touched && adminForm.get('portalServicesiteId')?.invalid">
          Portal Site Service Site ID is required.
        </div>
      </div>

      <div class="form-group">
        <label>Portal Service Site</label>
        <input type="text" formControlName="portalServicesite">
        <div class="errorEdit" *ngIf="adminForm.get('portalServicesite')?.touched && adminForm.get('portalServicesite')?.invalid">
          Portal Service Site is required.
        </div>
      </div>

      <div class="form-group">
        <label>Portal Service Site Key</label>
        <input type="text" formControlName="portalServicesiteKey">
        <div class="errorEdit" *ngIf="adminForm.get('portalServicesiteKey')?.touched && adminForm.get('portalServicesiteKey')?.invalid">
          Portal Service Site Key is required.
        </div>
      </div>

      <div class="form-group">
        <label>Contact Email</label>
        <input type="text" formControlName="contactEmail">
      </div>

      <div class="form-group">
        <label>Contact Email Text</label>
        <input type="text" formControlName="contactEmailText">
      </div>

      <div class="form-group">
        <label>Report Path</label>
        <textarea formControlName="reportPath"></textarea>
      </div>

      <div class="form-group">
        <label>Report Archive Path</label>
        <textarea type="text" formControlName="reportArchivePath"></textarea>
      </div>

      <div class="form-group">
        <label>Division ID</label>
        <msui-single-select formControlName="divisionId" customClass="drp-exa" [Items]="datavalues" [(ngModel)]="modelValue" name="values" (select)="onSelectionChange($event)"></msui-single-select>
      </div>

      <div class="form-group">
        <label>Default Site</label>
        <input type="checkbox" formControlName="defaultsite">{{portalServicesite?.value}}
      </div>

      <div class="form-group">
        <label>
          <input type="checkbox" formControlName="IsActive">Active Site
        </label>
      </div>

    </div>

    <div class="right">

      <div class="form-group">
        <label>Manual Report Full URL</label>
        <textarea formControlName="manualReportPath"></textarea>
      </div>

      <div class="form-group">
        <label>Manual Report Site</label>
        <textarea formControlName="manualReportsite"></textarea>
      </div>

      <div class="form-group">
        <label>Manual Report Site Content</label>
        <textarea formControlName="manualReportsiteContent"></textarea>
      </div>

      <div class="form-group">
        <label>Help Url</label>
        <textarea formControlName="helpUrl"></textarea>
      </div>

      <div class="form-group">
        <label>Usage Extract Path</label>
        <msui-multi-select formControlName="usageExtractPath" [Items]="datavalues" [(ngModel)]="selectedValues" name="dropValues" (select)="onSelectionChange($event)"></msui-multi-select>
      </div>

      <div class="form-group">
        <label>Group Names</label>
        <input type="text" formControlName="groupNames">
      </div>

      <div class="form-group">
        <label>User Names</label>
        <input type="text" formControlName="userNames">
      </div>

    </div>
  </div>

  <div class="button-container">
    <button type="submit" [disabled]="!adminForm.valid" class="button save">Save</button>
    <button routerLink="/site" routerLinkActive="active" (click)="cancel()" class="button cancel">Cancel</button>
  </div>

  <br> <br>

</form>
<br>



// this is the service

import { Injectable } from '@angular/core';
import { PortalSite } from '../admin-component/models/portal-site.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteServiceService {
  private portalSiteData: PortalSite[] = [];
  private portalSiteData$ = new BehaviorSubject<PortalSite[]>([]);

  saveData(data: PortalSite): Observable<PortalSite[]> {
    this.portalSiteData.push(data);
    this.portalSiteData$.next(this.portalSiteData);
    return this.portalSiteData$.asObservable();
  }

  updateData(index: number, data: PortalSite): Observable<PortalSite[]> {
    this.portalSiteData[index] = data;
    this.portalSiteData$.next(this.portalSiteData);
    return this.portalSiteData$.asObservable();
  }

  getData(): Observable<PortalSite[]> {
    return this.portalSiteData$.asObservable();
  }

  // Method to get single site data by index
  getSingleData(index: number): Observable<PortalSite[]> {
    return of(this.portalSiteData[index]);
  } 
  
  deleteData(index: number) : Observable<PortalSite[]> {
    this.portalSiteData.splice(index, 1);
    this.portalSiteData$.next(this.portalSiteData);
	return this.portalSiteData$.asObservable();
  }
}