import { Builder, By, until } from "selenium-webdriver";
import chrome from "selenium-webdriver/chrome";

describe("E2E Login Tests", () => {
    let driver: any;

    beforeAll(async () => {
        const options = new chrome.Options();
        // options.addArguments("--headless"); // rodar sem abrir janela
        options.addArguments("--no-sandbox");

        driver = await new Builder()
            .forBrowser("chrome")
            .setChromeOptions(options)
            .build();
    }, 20000);

    afterAll(async () => {
        if (driver) {
            await driver.quit();
        }
    });

    // =====================================================================
    // TESTE 1 – LOGIN COM SUCESSO
    // =====================================================================
    it("should login successfully and redirect to /ranking", async () => {
        await driver.get("http://localhost:5173/login");

        await driver.findElement(By.id("login")).sendKeys("alice.admin@example.com");

        await driver.findElement(By.id("password")).sendKeys("senhaAdmin123");

        await driver.findElement(By.id("loginBnt")).click();

        await driver.wait(async () => {
            const url = await driver.getCurrentUrl();
            return url.includes("/ranking");
        }, 10000);

        const currentUrl = await driver.getCurrentUrl();
        expect(currentUrl).toContain("/ranking");
    });

    // =====================================================================
    // TESTE 2 – LOGIN COM ERRO (ALERTA)
    // =====================================================================
    it("should show alert when login fails", async () => {
        await driver.get("http://localhost:5173/login");

        await driver.findElement(By.id("login")).sendKeys("usuario@errado.com");
        await driver.findElement(By.id("password")).sendKeys("senhaErrada");

        await driver.findElement(By.id("loginBnt")).click();

        await driver.wait(until.alertIsPresent(), 10000);

        const alert = await driver.switchTo().alert();
        const text = await alert.getText();

        expect(text).toBe("Credenciais inválidas!");

        await alert.accept(); 
    });
});
