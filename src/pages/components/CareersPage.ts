import {Page, Locator} from "@playwright/test";
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
        this.peopleAndCulcutre = page.getByText('People and Culture');
        this.businessIntelligence = page.getByText('Business Intelligence');
        this.secuirtyEngineering = page.getByText('Security Engineering');
        this.partnerships = page.getByText('Partnerships');
        this.qualityAssistance = page.getByText('Quality Assistance');
        this.mobileBussinessUnit = page.getByText('Mobile Bussiness Unit');
        this.partnerSupportDevelopment = page.getByText('Partner Support & Development');
        this.productDesign = page.getByText('Product Design');


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
}