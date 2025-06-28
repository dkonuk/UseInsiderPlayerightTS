import {Page, Locator} from "@playwright/test";
import {BasePage} from "../BasePage";

export class NavigationBar extends BasePage{
    readonly page!: Page;
    readonly navigationBarMenu: Locator;
    //WhyInsider
    readonly whyInsiderDropDown: Locator;
    readonly navigationNamesWhyInsider = [
        ' The Insider Difference ',
        'Compare Vendors',
        'Switch To Insider',
    ]
    // Platform
    readonly platformDropDown: Locator;
    readonly platformNames = ['Platform Overview',
        'Capabilities',
        'Sirius AI™',
        'Customer Data Management',
        '360° Customer Profiles',
        'Predict Behavior',
        'Audience Segmentation',
        'Integrations',
        'Personalization',
        'Recommendations',
        'Visual Product Discovery',
        'Pre-Built Templates',
        'Site Search',
        'A/B Testing',
        'Journey Orchestration',
        'Insights and Analytics',
        'Behavioral Analytics',
        'Channels',
        'Web',
        'Email',
        'Site Search',
        'Conversational CX',
        'WhatsApp',
        'Web Push',
        'App',
        'InStory',
        'SMS'
    ]
    // Solutions
    readonly solutionsDropDown : Locator;
    readonly solutionsNames = [
        'Optimize Customer Acquisition',
        'Increase Customer Engagement',
        'Reduce Customer Churn',
        'Retail & Ecommerce',
        'Beauty & Cosmetics',
        'Automotive',
        'Financial Services',
        'Travel & Hospitality',
        'Telecommunications',
        'See how Insider works for yourself'
    ]
    //Customers
    readonly customersDropDown: Locator;
    //Resources
    readonly resourcesDropDown: Locator;
    readonly resourcesNames = [
        'Take a Platform Tour',
        'CDP Explorer',
        'WhatsApp Explorer',
        'SMS Templates Library',
        'Productivity Calculator',
        'Case Studies',
        'Blog',
        'Ebooks & Guides',
        'Glossary'
    ]
    //Company
    readonly companyDropDown: Locator;
    readonly companyNames = [
        'About Us',
        'Careers',
        'Contact Us',
        'Partnerships',
        'Technology Partners',
        'Solution Partners',
        'Newsroom'
    ]

    constructor(page: Page) {
        super(page);
        this.page = page;
        this.navigationBarMenu = page.locator('#navbarNavDropdown');
        //Why Insider
        this.whyInsiderDropDown = page.getByRole('link', { name: 'Why Insider', exact: true });
        //Platform
        this.platformDropDown = page.getByRole('link', { name: 'Platform', exact: true });
        //Solutions
        this.solutionsDropDown = page.getByRole('link', { name: 'Solutions', exact: true });
        //Customers
        this.customersDropDown = page.getByRole('link', { name: 'Customers', exact: true });
        //Resources
        this.resourcesDropDown = page.locator('#navbarNavDropdown').getByRole('link', { name: 'Resources', exact: true });
        //Company
        this.companyDropDown = page.getByRole('link', { name: 'Company', exact: true });
    }
     getNavigationLink(name:string): Locator{
         return  this.page.getByRole('link', { name: name });
    }
    async allNavigationLinksUnderWhyInsider(){
        for(const name of this.navigationNamesWhyInsider){
            const locator = this.getNavigationLink(name)
            await this.navBarClick(this.whyInsiderDropDown ,locator)
        }
    }
    //Locates the first child element if the locator returns multiple Child elements
    getNavigationLinkForMultipleChildren(name:string): Locator{
        return  this.page.getByText(name).first();
    }

    async allNavigationLinksUnderPlatform(){
        for(const name of this.platformNames){
            const locator = this.getNavigationLinkForMultipleChildren(name)
            await this.navBarClick(this.platformDropDown ,locator)
        }
    }
    async allNavigationLinksUnderSolutions(){
        for(const name of this.solutionsNames){
            const locator = this.getNavigationLinkForMultipleChildren(name)
            await this.navBarClick(this.solutionsDropDown ,locator)
        }
    }
    async navigationBarCustomers(){
        await this.navBarClick(this.navigationBarMenu ,this.customersDropDown)
    }
    async allNavigationBarLinksUnderResources(){
        for(const name of this.resourcesNames){
            const locator = this.getNavigationLinkForMultipleChildren(name)
            await this.navBarClick(this.resourcesDropDown ,locator)
        }
    }
    async navBarDropDownLinks(dropDownLocator: Locator, names: string[]){
        for(const name of names){
            const locator = this.getNavigationLinkForMultipleChildren(name)
            await this.navBarClick(dropDownLocator ,locator)
        }
    }





}