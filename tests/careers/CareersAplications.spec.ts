import {test, expect} from "@playwright/test";
import {BasePage} from "../../src/pages/BasePage";
import {CareersPage} from "../../src/pages/components/CareersPage";
import {OpenPositionsPage} from "../../src/pages/components/OpenPositionsPage";

test.beforeEach(async ({page}) => {
    const basePage = new BasePage(page);
    await page.goto("/open-positions");
    await basePage.waitForNumberOfSeconds(1);
    await basePage.acceptCookiesIfAsked()
})
test("Check if Quality Assurance in Istanbul can be applied", async ({page}) => {
    const basePage = new BasePage(page);
    const openPositionsPage = new OpenPositionsPage(page)
    await openPositionsPage.selectLocation(openPositionsPage.istanbulTurkey)
    await openPositionsPage.selectDepartment(openPositionsPage.qualityAssurance)
    await openPositionsPage.waitForNumberOfSeconds(3)


})
