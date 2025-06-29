import {test, expect} from "@playwright/test";
import {NavigationBar} from "../src/pages/components/NavigationBar";
import {BasePage} from "../src/pages/BasePage";
import {CareersPage} from "../src/pages/components/CareersPage";

test.beforeEach(async ({page}) => {
    const basePage = new BasePage(page);
    await page.goto("/");
    await basePage.waitForNumberOfSeconds(1);
    await basePage.acceptCookiesIfAsked()
})

test("HomePage Navbar Why Insider", async ({page}) => {
    const navigationBar = new NavigationBar(page);
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    await navigationBar.navBarDropDownLinks(navigationBar.whyInsiderDropDown, navigationBar.navigationNamesWhyInsider);
})
test("Homepage Navbar Platform", async ({page}) => {
    const navigationBar = new NavigationBar(page);
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    await navigationBar.navBarDropDownLinks(navigationBar.platformDropDown, navigationBar.platformNames);
})

test("HomePage Navbar Solutions", async ({page}) => {
    const navigationBar = new NavigationBar(page);
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    await navigationBar.navBarDropDownLinks(navigationBar.solutionsDropDown, navigationBar.solutionsNames);
})

test("HomePage Navbar Customers", async ({page}) => {
    const navigationBar = new NavigationBar(page);
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    await navigationBar.navigationBarCustomers();
})
test("Homepage NavBar Resources", async ({page}) => {
    const navigationBar = new NavigationBar(page)
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    //await navigationBar.allNavigationBarLinksUnderResources()
    await navigationBar.navBarDropDownLinks(navigationBar.resourcesDropDown, navigationBar.resourcesNames)
})

test("HomePage NavBar Company", async ({page}) => {
    const navigationBar = new NavigationBar(page)
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    await navigationBar.navBarDropDownLinks(navigationBar.companyDropDown, navigationBar.companyNames)
})
test("HomePage NavBar Careers", async ({page}) => {
    const basePage = new BasePage(page);
    const careersPage = new CareersPage(page);
    await careersPage.navigateToCareersPage()
    const isLoaded = await basePage.checkIfElementLoaded(careersPage.findYourDreamJob)
    expect(isLoaded).toBe(true)
})