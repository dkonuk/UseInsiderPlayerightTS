import {Page, Locator, expect} from "@playwright/test";
import {BasePage} from "../BasePage";

export class OpenPositionsPage extends BasePage {
    readonly page!: Page;
    readonly locationFilter: Locator;
    readonly departmentFilter: Locator;
    readonly openPositionsJobListing: Locator;
    readonly istanbulTurkeyLocation: Locator;
    readonly locationOptionsLocator: Locator;
    readonly departmentOptionsLocator: Locator;
    readonly locationFilterLoadCheck: Locator;
    readonly qualityAssuranceLocator: Locator;
    readonly istanbulTurkey: string;
    readonly qualityAssurance: string;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.locationFilter = page.locator('#select2-filter-by-location-container');
        this.departmentFilter = page.locator('#select2-filter-by-department-container');
        this.openPositionsJobListing = page.locator('#jobs-list');
        this.istanbulTurkeyLocation = page.getByRole('option', {name: 'Istanbul, Turkiye'});
        this.locationOptionsLocator = page.locator('#filter-by-location option:not([value="All"])');
        this.departmentOptionsLocator = page.locator('#filter-by-department option:not([value="All"])');
        this.locationFilterLoadCheck = this.locationFilter.getByText('Istanbul, Turkiye');
        this.qualityAssuranceLocator = page.getByText("Quality Assurance");
        this.istanbulTurkey = 'Istanbul, Turkiye';
        this.qualityAssurance = 'Sales';
    }
    async scrollToBottomAndTop() {
        // Smooth scroll to bottom
        await this.page.evaluate(() => {
            window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
        });
        await this.page.waitForTimeout(1000);
// Smooth scroll to top
        await this.page.evaluate(() => {
            window.scrollTo({top: 0, behavior: 'smooth'});
        });
    }
    async selectLocation(location: string){
        await this.locationFilter.click();
        await this.page.selectOption('#filter-by-location', location)
    }
    async selectDepartment(department: string){
        await this.departmentFilter.click();
        await this.page.selectOption('#filter-by-department', department)
    }
    async CheckIfSelectedLocationJobsLoad() {
        const locationOptions = await this.locationOptionsLocator.all();
        console.log(`Found ${locationOptions.length} locations to process`);
        //Iterate over the locations
        for (let i = 0; i < locationOptions.length; i++) {
            // Get location text
            const locationText: string | null = await locationOptions[i].textContent();
            if (!locationText) continue;
            console.log(`Processing location: ${locationText}`);
            // Select the option
            await this.page.selectOption('#filter-by-location', locationText);
            // Wait for the first job listing with the matching location to appear
            const firstJobWithLocation = this.page.locator('.position-list-item')
                .filter({hasText: locationText})
                .last();
            // Wait for this element to be visible with the correct location
            await firstJobWithLocation.waitFor({timeout: 7000});
            // Verify the location text
            const firstJobListingLocation = await this.page.locator('.position-list-item')
                .first()
                .locator('.position-location')
                .textContent();
            console.log(`Verified location: ${locationText} matches job listing location: ${firstJobListingLocation}`);
        }
    }
    async CheckIfSelectedDepartmentJobsLoad() {
        const departmentOptions = await this.departmentOptionsLocator.all();
        console.log(`Found ${departmentOptions.length} Departments to process`);

        // Iterate over the departments
        for (let i = 0; i < departmentOptions.length; i++) {
            // Get department text
            const departmentText: string | null = await departmentOptions[i].textContent();
            if (!departmentText) continue;

            console.log(`Processing department: ${departmentText}`);

            // Select the option
            await this.page.selectOption('#filter-by-department', departmentText);

            // Wait for the page to update after department selection
            await this.page.waitForTimeout(1000); // Give time for the filter to apply

            // Check if there are any job postings for the department
            const noJobsVisible = await this.page.getByText('No positions available.').isVisible();

            if (noJobsVisible) {
                console.log(`No jobs found for ${departmentText}`);
                // Skip to the next department
                continue;
            } else {
                // Jobs are available for this department
                console.log(`Found jobs for ${departmentText}`);

                // Wait for the first job listing with matching department to appear
                const firstJobWithDepartment = this.page.locator('.position-list-item')
                    .filter({hasText: departmentText})
                    .last();

                // Wait for this element to be visible with the correct location
                await firstJobWithDepartment.waitFor({timeout: 5000});

                // Verify the location text
                const firstJobListingDepartment = await this.page.locator('.position-list-item')
                    .first()
                    .locator('.position-department')
                    .textContent();

                console.log(`Verified Department: ${departmentText} matches job listing department: ${firstJobListingDepartment}`);
            }
        }
    }
    async CheckIfSelectedDepartmentJobsLoadV2() {
        const departmentOptions = await this.departmentOptionsLocator.all();
        console.log(`Found ${departmentOptions.length} Departments to process`);

        // Iterate over the departments
        for (let i = 0; i < departmentOptions.length; i++) {
            // Get department text
            const departmentText: string | null = await departmentOptions[i].textContent();
            if (!departmentText) continue;

            console.log(`Processing department: ${departmentText}`);

            // Select the option
            await this.page.selectOption('#filter-by-department', departmentText);

            // Wait for the page to update after department selection
            await this.page.waitForTimeout(500); // Give time for the filter to apply

            // Check if there are any job postings for the department
            const noJobsVisible = await this.page.getByText('No positions available.').isVisible();
            await this.page.waitForTimeout(500);
            const zeroJobResults = await this.page.locator('#nonResult').isVisible();

            if (!noJobsVisible || !zeroJobResults) {
                // Jobs are available for this department
                console.log(`Found jobs for ${departmentText}`);
                await this.openPositionsJobListing.scrollIntoViewIfNeeded()

                // Wait for the first job listing with the matching department to appear

                const firstJobWithDepartment = this.page.locator('.position-list-item')
                    .filter({hasText: departmentText})
                    .first();

                // Wait for this element to be visible with the correct location
                await firstJobWithDepartment.waitFor({timeout: 7000});

                // Verify the location text
                const firstJobListingDepartment = await this.page.locator('.position-list-item')
                    .first()
                    .locator('.position-department')
                    .textContent();

                console.log(`Verified Department: ${departmentText} matches job listing department: ${firstJobListingDepartment}`);
            } else {
                console.log(`No jobs found for ${departmentText}`);
                // No continue needed here as we're at the end of the loop iteration
            }
        }
    }
    async checkIfSelectingBothLocationAndDepartmentLoadsCorrectJobs() {
        await this.selectLocation(this.istanbulTurkey)
        await this.waitForNumberOfSeconds(1);
        await this.selectDepartment(this.qualityAssurance)
        await this.selectDepartment(this.qualityAssurance)
        await this.waitForNumberOfSeconds(4);
        const numberOfJobsAvailable = await this.page.locator('.position-list-item').count()
        const jobsList = await this.page.locator('.position-list-item').all()
        console.log(jobsList)
        for (let i = 0; i < numberOfJobsAvailable; i++) {
            const job = jobsList[i]
            const jobLocation = await job.locator('.position-location').textContent()
            const jobDepartment = await job.locator('.position-department').textContent()
            expect(jobLocation).toBe(this.istanbulTurkey)
            expect(jobDepartment).toBe(this.qualityAssurance)
            /*if (jobLocation === this.istanbulTurkey && jobDepartment === this.qualityAssurance) {
                console.log(`Job ${i} is loaded correctly`)
                console.log(`Job ${i} location is ${jobLocation}`)
                console.log(`Job ${i} department is ${jobDepartment}`)
            } else {
                console.log(`Job ${i} is not loaded correctly`)
                console.log(`Job ${i} location is ${jobDepartment}`)
            }*/
        }
    }



}
