import {test, expect} from "@playwright/test";
import {BasePage} from "../src/pages/BasePage";
import {HomePage} from "../src/pages/HomePage";
import {NavigationBar} from "../src/pages/components/NavigationBar";

test.beforeEach(async ({page}) => {
    const basePage = new BasePage(page);
    await page.goto("/");
    await basePage.waitForNumberOfSeconds(1);
    await basePage.acceptCookiesIfAsked()
})

test("Homepage loaded succesfully", async ({page}) => {
    const navigationBar = new NavigationBar(page);
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    await navigationBar.navBarDropDownLinks(navigationBar.platformDropDown, navigationBar.platformNames);
})

test("HomePage Navbar Why ınsider", async ({page}) => {
    const navigationBar = new NavigationBar(page);
    await expect(page).toHaveTitle('#1 Leader in Individualized, Cross-Channel CX — Insider');
    await navigationBar.navBarDropDownLinks(navigationBar.whyInsiderDropDown, navigationBar.navigationNamesWhyInsider);
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