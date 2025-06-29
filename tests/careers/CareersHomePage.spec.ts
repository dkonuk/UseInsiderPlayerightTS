import {test, expect} from "@playwright/test";
import {BasePage} from "../../src/pages/BasePage";
import {CareersPage} from "../../src/pages/components/CareersPage";


test.beforeEach(async ({page}) => {
    const basePage = new BasePage(page);
    await page.goto("/");
    await basePage.waitForNumberOfSeconds(1);
    await basePage.acceptCookiesIfAsked()
})

test("Careers Page", async ({page}) => {
    const basePage = new BasePage(page);
    const careersPage = new CareersPage(page);
    await careersPage.navigateToCareersPage()
    const isLoaded = await basePage.checkIfElementLoaded(careersPage.findYourDreamJob)
    expect(isLoaded).toBe(true)
})
test("Check If Teams Are Loaded", async ({page}) => {
    const careersPage = new CareersPage(page)
    await careersPage.navigateToCareersPage()
    await careersPage.seeAllTeamsButton.click()
    await careersPage.checkIfAllTeamsAreLoaded()

})
test("Check if all locations are loaded", async ({page}) => {
    const careersPage = new CareersPage(page)
    await careersPage.navigateToCareersPage()
    await careersPage.checkIfAllLocationsAreLoaded()
})
test("Check if All Teams Pages Load", async ({page}) => {
    const careersPage = new CareersPage(page)
    await careersPage.navigateToCareersPage()
    await careersPage.checkIfDepartmentPagesLoad()
})

