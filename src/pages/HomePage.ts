import {type Page, type Locator} from "@playwright/test";
import {BasePage} from "./BasePage";

export class HomePage extends BasePage {
    readonly page!: Page;

    constructor(page: Page) {
        super(page);


    }
}