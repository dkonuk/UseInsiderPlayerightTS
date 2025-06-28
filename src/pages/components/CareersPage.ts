import {Page, Locator} from "@playwright/test";
import {BasePage} from "../BasePage";
import {NavigationBar} from "./NavigationBar";

export class CareersPage extends BasePage{
    readonly page!: Page;
    readonly careersPage: Locator;
    readonly navigationBar: NavigationBar;


    constructor(page: Page) {
        super(page);
        this.page = page;
        this.navigationBar = new NavigationBar(page)
        this.careersPage = page.locator('#careers');
    }

    async navigateToCareersPage() {
        await this.navigateUsingNavBar(this.navigationBar.companyDropDown, this.navigationBar.getNavigationLink('Careers'))

    }
}