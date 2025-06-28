import {test, expect} from "@playwright/test";
import {BasePage} from "../src/pages/BasePage";
import {HomePage} from "../src/pages/HomePage";
import {CareersPage} from "../src/pages/components/CareersPage";
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

test("Careers Page", async ({page}) => {
    const careersPage = new CareersPage(page);
    await careersPage.navigateToCareersPage()
})
