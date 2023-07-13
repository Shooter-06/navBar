Fix this code by making this siteComponent html an active row table respecting its format and incase you make changes, comment and explain


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
	
		this.subscription(this.siteService.getData().subscribe(sites => {
            this.sites = [];
			this.sites.push(...this.localSiteValues, ...sites);
        }));
	}

    deleteSite(id: number) {
        this.siteService.deleteData(id).subscribe(() =>{
			this.loadSite();
		});
		console.log('here');
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
                <th style="width: 160px">Actions</th>
            </tr>
            <tr *ngFor="let site of sites; let i = index">
                <td style="text-align: right;">{{site.portalServicesiteId}}</td>
                <td> <a [routerLink]="['/content-section']">{{site.portalServicesite}}</a></td>
                <td>{{site.portalServicesiteKey}}</td>
                <td>{{site.divisionId}}</td>
                <td>{{site.groupNames}}</td>
                <td>{{site.isActive ? 'Yes' : 'No'}}</td>
                <td>
                    <a [routerLink]="['/add-edit-site', i]" >
					<span class="ss-icon ss-pencil-down"></span> EDIT</a> |
                    <a (click)="deleteSite(site.portalServiceSiteId); $event.preventDefault()">
					<span class="ss-icon ss-trash"></span>DELETE</a>
                </td>
            </tr>
        </table>
        <br>
        <button style="background-color: #BCD2EE;" routerLink="/add-edit-site" routerLinkActive="active">Add site</button>
    </div>
</body>


// use this one

<div class="main-container">
    <table>
        <tr style="background-color: #BCD2EE;">
            <th style="width: 106px;">ID</th>
            <th style="width: 100px; text-align: right;">Names</th>
            <th>key</th>
            <th style="width: 100px;">Division</th>
            <th>Admin Access Group</th>
            <th style="width: 100px">Active</th>
            <th style="width: 160px">Actions</th>
        </tr>
        <tr *ngFor="let site of sites; let i = index"
            [class.active-row]="selectedSiteId === site.portalServiceSiteId">
            <td style="text-align: right;">{{site.portalServicesiteId}}</td>
            <td> <a [routerLink]="['/content-section']" 
                       (click)="selectedSiteId = site.portalServiceSiteId">{{site.portalServicesite}}</a></td>
            <td>{{site.portalServicesiteKey}}</td>
            <td>{{site.divisionId}}</td>
            <td>{{site.groupNames}}</td>
            <td>{{site.isActive ? 'Yes' : 'No'}}</td>
            <td>
                <a [routerLink]="['/add-edit-site', i]" >
                <span class="ss-icon ss-pencil-down"></span> EDIT</a> |
                <a (click)="deleteSite(site.portalServiceSiteId); $event.preventDefault()">
                <span class="ss-icon ss-trash"></span>DELETE</a>
            </td>
        </tr>
    </table>
    <br>
    <button style="background-color: #BCD2EE;" routerLink="/add-edit-site" routerLinkActive="active">Add site</button>
</div>

<!-- And include the CSS for the active row -->
<style>
.active-row {
    background-color: #BCD2EE;  /* or whatever color you want */
}
</style>





