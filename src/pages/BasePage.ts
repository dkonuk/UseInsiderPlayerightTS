import {type Locator, Page} from "@playwright/test";
//import {NavigationBar} from "./components/NavigationBar";

export class BasePage{
    readonly page: Page;
    readonly cookiesBanner: Locator;
    readonly cookiesAcceptAllButton: Locator;
    readonly navigationBarMenu: Locator;
    constructor(page: Page) {
        this.page = page;
        this.navigationBarMenu = page.locator('#navbarNavDropdown');
        this.cookiesBanner = page.getByRole('heading', { name: 'This website uses cookies' });
        this.cookiesAcceptAllButton = page.locator('text=Accept all')
        }
        async acceptCookiesIfAsked(){
        if (await this.cookiesBanner.isVisible()) {
                await this.cookiesAcceptAllButton.click();
            }

        }
    async waitForNumberOfSeconds(timeInSeconds: number){
        await this.page.waitForTimeout(timeInSeconds * 1000);
    }
    async navBarClick(parentElementLocator: Locator ,childelementLocator: Locator){
        await parentElementLocator.click();
        await childelementLocator.click();
        await this.page.waitForLoadState('domcontentloaded');
        if(!await this.navigationBarMenu.isVisible()){
            await this.page.goBack()
        }
    }
    async navigateUsingNavBar(navBarMenuItem:Locator, linkUnderMenuItem:Locator){
        await navBarMenuItem.hover();
        await linkUnderMenuItem.click();
        await this.page.waitForLoadState('domcontentloaded');
    }
    async checkIfElementLoaded(locator: Locator):Promise<boolean>{
        try {
            await locator.scrollIntoViewIfNeeded()
            await this.page.waitForLoadState('domcontentloaded')
            await locator.waitFor({ state: 'attached', timeout: 5000 }); // 5 second timeout
            return true; // Element was found
        } catch (error) {
            // Element didn't appear within the timeout period
            console.log("Element not found"+ locator.toString())
            return false;
        }

    }



    }
