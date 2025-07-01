import {Page, Locator, expect} from "@playwright/test";
import {BasePage} from "../BasePage";

export class OpenPositionsPage extends BasePage {
    readonly page!: Page;
    readonly locationFilter: Locator;
    readonly departmentFilter: Locator;
    readonly openPositionsJobListing: Locator;
    readonly istanbulTurkeyLocation: Locator;
    readonly locationOptionsLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.locationFilter = page.locator('#select2-filter-by-location-container');
        this.departmentFilter = page.locator('#filter-by-department');
        this.openPositionsJobListing = page.locator('#jobs-list');
        this.istanbulTurkeyLocation = page.getByRole('option', {name: 'Istanbul, Turkiye'});
        this.locationOptionsLocator = page.locator('#filter-by-location option:not([value="All"])');


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

            // Wait for the first job listing with matching location to appear
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
}
