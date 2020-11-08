import puppeteer from "puppeteer";

describe("Google", () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch();
    page = await browser.newPage();
    await page.goto("http://localhost:3000");
  });

  afterAll(async () => {
    await page.close();
    await browser.close();
  });

  it("should display login modal on click", async () => {
    await page.$eval("a#login", (button) => button.click());
    await page.waitForSelector(".container__modal", { visible: true });
  });

  it("should hide modal when click is outside", async () => {
    await page.$eval(".container__modal", (container) => container.click());
    await page.waitForSelector(".container__modal", { visible: false });
  });
});
