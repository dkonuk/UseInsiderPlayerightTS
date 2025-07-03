import {test, expect} from "@playwright/test";
import {BasePage} from "../../src/pages/BasePage";
import {CareersPage} from "../../src/pages/components/CareersPage";
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
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.locationFilter.click()
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.CheckIfSelectedLocationJobsLoad()

})
test("Filter by Department", async ({page}) => {
    const openPositionsPage = new OpenPositionsPage(page)
    await openPositionsPage.scrollToBottomAndTop()
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.departmentFilter.click()
    await openPositionsPage.departmentFilter.click()
    await openPositionsPage.departmentFilter.click()
    await openPositionsPage.waitForNumberOfSeconds(1)
    await openPositionsPage.CheckIfSelectedDepartmentJobsLoad()
})


