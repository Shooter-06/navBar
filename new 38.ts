import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo, ResponseOptions, ParsedRequestUrl } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { CostCenter, FudPerson } from './models'; // Import necessary models

// Interface representing our InMemory database
export interface InMemoryDb {
    portalServiceSiteId: number;
    portalServiceSite: string;
    portalServicesiteKey: string;
    divisionId: number;
}

// Service which will act as an in memory web api for the front end
@Injectable({
    providedIn: 'root', // Available for the whole app
})
export class MemoryDataService implements InMemoryDbService {
    // Create a mapping to help in request routing
    pathOverrides: Map<string, keyof InMemoryDb> = new Map();

    constructor() {
        // Initialize the pathOverrides map with mappings
        this.pathOverrides.set('admin/add-Edit-Site', 'portalServiceSiteId');
        this.pathOverrides.set('admin/add-Edit-Site', 'portalServiceSite');
        this.pathOverrides.set('admin/add-Edit-site', 'portalServicesiteKey');
        this.pathOverrides.set('admin/add-Edit-Site', 'divisionId');
    }

    // Creates an instance of the InMemoryDb
    createDb(): Promise<InMemoryDb> {
        return Promise.all([
            this.fetchJson('Fake-data/Site.json')
        ]).then(({
            portalServiceSiteId,
            portalServiceSite,
            portalServicesiteKey,
            divisionId
        }) => ({
            portalServiceSiteId,
            portalServiceSite,
            portalServicesiteKey,
            divisionId
        }));
    }
	
	
	createDb(): Promise<InMemoryDb> {
    return Promise.all([
        this.fetchJson('Fake-data/Site.json')
    ]).then((data) => {
        console.log(data); // Log the fetched data
        const {
            portalServiceSiteId,
            portalServiceSite,
            portalServicesiteKey,
            divisionId
        } = data;
        return {
            portalServiceSiteId,
            portalServiceSite,
            portalServicesiteKey,
            divisionId
        };
    });
}


    // Parses the request URL for query parameters
    parseRequestUrl(url: string, utils: RequestInfo): ParsedRequestUrl {
        const apiBase = utils.getConfig().apiBase ?? '';

        // Adjust URL if it matches a path in the pathOverrides map
        for (const [path, pathOverrides] of this.pathOverrides) {
            const pathPrefix = `${apiBase}${path}`;

            if (url.startsWith(pathPrefix)) {
                url = `${apiBase}${pathOverrides}${url.substring(pathPrefix.length)}`;
                break;
            }
        }

        // Parse the URL for query parameters
        const parsedUrl = utils.parseRequestUrl(url);
        const parsedQuery = parsedUrl.query;

        return parsedUrl;
    }

    // Handle GET requests
    get(requestInfo: RequestInfo): Observable<any> | undefined {
        const query = requestInfo.query;

        // Handle the request based on the collection name
        switch (requestInfo.collectionName) {
            default:
                return undefined;
        }
    }

    // Helper function to fetch JSON from a URL
        private fetchJson<T = any>(url: string): Promise<T> {
        return fetch(url)
            .then(response => response.json())
            .then(value => value as T)
            .catch(error => console.error('Error in fetchJson:', error));
    }


    // Create a custom response based on the request info and data
    private createCustomResponse(requestInfo: RequestInfo, data: any): Observable<any> {
        const dataEncapsulation = requestInfo.utils.getConfig().dataEncapsulation;

        // Create the response
        return requestInfo.utils.createResponse(() => {
            const options: ResponseOptions = {
                body: dataEncapsulation ? { data } : data,
                status: 200,
            };
            return this.finishOptions(options, requestInfo);
        });
    }

    // Finish the response options and return
    private finishOptions(options: ResponseOptions, requestInfo: RequestInfo) {
        options.statusText = options.status ? 'OK' : undefined;
        options.headers = requestInfo.headers;
        options.url = requestInfo.url;
        return options;
    }
}
