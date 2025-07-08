import {test, expect} from "@playwright/test";
import {BasePage} from "../../src/pages/BasePage";
import {OpenPositionsPage} from "../../src/pages/components/OpenPositionsPage";

test.beforeEach(async ({page}) => {
    const basePage = new BasePage(page);
    await page.goto("/careers/open-positions/");
    await basePage.waitForNumberOfSeconds(1);
    await basePage.acceptCookiesIfAsked()
})
test("Filter by Location", async ({page}) => {
    const openPositionsPage = new OpenPositionsPage(page)
    await openPositionsPage.scrollToBottomAndTop()
    await openPositionsPage.waitForNumberOfSeconds(2)
    await openPositionsPage.locationFilter.click()
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.locationFilter.click()
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.locationFilter.click()
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.CheckIfSelectedLocationJobsLoad()

})
test("Filter by Department", async ({page}) => {
    const openPositionsPage = new OpenPositionsPage(page)
    await openPositionsPage.scrollToBottomAndTop()
    await openPositionsPage.waitForNumberOfSeconds(2)
    await openPositionsPage.departmentFilter.click()
    await openPositionsPage.departmentFilter.click()
    await openPositionsPage.departmentFilter.click()
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.CheckIfSelectedDepartmentJobsLoadV2()
})
test("Filter by both Location and Department", async ({page}) => {
    // @ts-ignore
    test.skip(process.env.CI, "Manual test - skipped in CI");
    const openPositionsPage = new OpenPositionsPage(page);
    await openPositionsPage.scrollToBottomAndTop();
    await openPositionsPage.waitForNumberOfSeconds(2);
    await openPositionsPage.checkIfSelectingBothLocationAndDepartmentLoadsCorrectJobs()
    //await openPositionsPage.selectLocation(openPositionsPage.istanbulTurkey);
    //await openPositionsPage.selectDepartment(openPositionsPage.qualityAssurance);
    await openPositionsPage.waitForNumberOfSeconds(2)
})

