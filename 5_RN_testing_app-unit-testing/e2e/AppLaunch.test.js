// to run particular file:
// `detox test --configuration android.emu.debug e2e/AppLaunch.test.js`

describe("App Launch", () => {
  // This block runs once before all tests in this suite, launching the app.
  beforeAll(async () => {
    await device.launchApp();
  });

  // This block runs before each test in this suite, ensuring a fresh start by reloading React Native.
  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // Test case: checks if the logo image and loading indicator are visible on app launch.
  it("should have logo image", async () => {
    await expect(element(by.id("logo-image"))).toBeVisible(); // Checks if the logo image is visible.
    await expect(element(by.id("loading-indicator"))).toBeVisible(); // Checks if the loading indicator is visible.
  });

  // Test case: verifies that the app navigates to the Onboarding Screen within 5 seconds.
  it("should navigate to Onboarding Screen", async () => {
    await waitFor(element(by.id("OnboardingScreen")))
      .toBeVisible()
      .withTimeout(5000); // Waits for the Onboarding Screen to be visible within 5 seconds.
    await expect(element(by.id("OnboardingScreen"))).toBeVisible(); // Confirms that the Onboarding Screen is visible.
  });
});
