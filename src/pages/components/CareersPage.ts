import {Page, Locator, expect} from "@playwright/test";
import {BasePage} from "../BasePage";
import {NavigationBar} from "./NavigationBar";

export class CareersPage extends BasePage{
    readonly page!: Page;
    readonly careersPage: Locator;
    readonly navigationBar: NavigationBar;
    readonly findYourDreamJob: Locator;
    readonly seeAllTeamsButton: Locator;
    //Teams

    readonly customerSuccess: Locator;
    readonly sales: Locator;
    readonly productAndEngineering: Locator;
    readonly financeAndBussinessSupport: Locator;
    readonly marketing: Locator;
    readonly ceoExecutiveOfficer: Locator;
    readonly purchasingAndOperations: Locator;
    readonly peopleAndCulcutre: Locator;
    readonly businessIntelligence: Locator;
    readonly secuirtyEngineering: Locator;
    readonly partnerships: Locator;
    readonly qualityAssistance: Locator;
    readonly mobileBussinessUnit: Locator;
    readonly partnerSupportDevelopment: Locator;
    readonly productDesign: Locator;
    readonly teams:string[]= [
        'Customer Success',
        'Sales',
        'Product & Engineering',
        'Finance & Business Support',
        'Marketing',
        'CEO’s Executive Office',
        'Purchasing & Operations',
        'People and Culture',
        'Business Intelligence',
        'Security Engineering',
        'Partnership',
        'Quality Assurance',
        'Mobile Business Unit',
        'Partner Support Development',
        'Product Design'
    ]
    //Locations
    readonly locationsCarousel: Locator;
    readonly locationsCarouselLocator: Locator;
    readonly locationsCarouselRightArrow: Locator;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.navigationBar = new NavigationBar(page)
        this.careersPage = page.locator('#careers');
        this.findYourDreamJob = page.getByText('Find your dream job').first();
        this.seeAllTeamsButton = page.getByText('See all teams');
        //Teams
        this.customerSuccess = page.getByText('Customer Success');
        this.sales = page.getByText('Sales');
        this.productAndEngineering = page.getByText('Product and Engineering');
        this.financeAndBussinessSupport = page.getByText('Finance & Business Support');
        this.marketing = page.locator('h3.text-center.mb-4.mb-xl-5').getByText('Marketing');
        this.ceoExecutiveOfficer = page.getByText('CEO’s Executive Office');
        this.purchasingAndOperations = page.getByText('Purchasing & Operations');
        this.peopleAndCulcutre = page.getByText('People $ Culture');
        this.businessIntelligence = page.getByText('Business Intelligence');
        this.secuirtyEngineering = page.getByText('Security Engineering');
        this.partnerships = page.getByText('Partnerships');
        this.qualityAssistance = page.getByText('Quality Assistance');
        this.mobileBussinessUnit = page.getByText('Mobile Bussiness Unit');
        this.partnerSupportDevelopment = page.getByText('Partner Support & Development');
        this.productDesign = page.getByText('Product Design');
        //Locations
        this.locationsCarousel = page.locator('.glide__slide')
        this.locationsCarouselLocator = page.locator('#location-slider')
        this.locationsCarouselRightArrow = page.locator('i.icon-arrow-right.location-slider-next.ml-4')


    }
    async navigateToCareersPage() {
        await this.navigateUsingNavBar(this.navigationBar.companyDropDown, this.navigationBar.getNavigationLink('Careers'))
    }
    async checkIfAllTeamsAreLoaded(){
        for(const team of this.teams){
             const isTeamLoaded = await this.checkIfElementLoaded(this.page.locator('h3.text-center.mb-4.mb-xl-5').getByText(`${team}`))
            if(!isTeamLoaded){
                console.log(`${team} is not loaded`)
                return false
            }
        }return true
    }
    async checkIfAllLocationsAreLoaded(){
        await this.locationsCarouselLocator.scrollIntoViewIfNeeded()
        const locationCitiesLocators = await this.locationsCarousel.locator('.location-info p').all();
        const locationCities:String[] = []
        for(const locator of locationCitiesLocators){
            locationCities.push(await locator.innerText())
        }
        for(const locationCity of locationCities){
            await this.locationsCarouselRightArrow.click()
            const isLocationLoaded = await this.checkIfElementLoaded(this.page.locator('.location-info p').getByText(`${locationCity}`))
            if(!isLocationLoaded){
                console.log(`${locationCity} is not loaded`)
                return false
            }
        }
    }
    async checkIfDepartmentPagesLoad(){
        await this.waitForNumberOfSeconds(1)
        await this.seeAllTeamsButton.click()
        await this.waitForNumberOfSeconds(1)
        for(const team of this.teams){
            if(await this.seeAllTeamsButton.isVisible()){
                await this.seeAllTeamsButton.click()
            }
            const teamLocator = this.page.locator('h3.text-center.mb-4.mb-xl-5').getByText(`${team}`)
            await teamLocator.scrollIntoViewIfNeeded()
            await teamLocator.click()
            await this.page.waitForLoadState('domcontentloaded')
            await expect(this.page.getByText(this.normalizeText(team)).first()).toBeVisible()
            await this.page.goBack()

        }
    }
    /**
     * Normalizes text by handling common variations like "and" vs "&"
     */
    private normalizeText(text: string): RegExp {
        // Replace "and" with a pattern that matches both "and" and "&"
        const pattern = text
            .replace(/\s+and\s+/g, '\\s+(?:and|&)\\s+')
            .replace(/\s+&\s+/g, '\\s+(?:and|&)\\s+');

        // Create a case-insensitive regex that allows for flexible whitespace
        return new RegExp(`^\\s*${pattern}\\s*$`, 'i');
    }

    /**
     * Checks if a team element is visible with text normalization
     */
    async checkIfTeamIsVisible(team: string): Promise<void> {
        // Create a regex pattern that matches both "and" and "&" variations
        const pattern = this.normalizeText(team);

        // Use the regex pattern instead of exact text matching
        await expect(this.page
            .getByText(pattern)
            .first()
        ).toBeVisible();
    }
}