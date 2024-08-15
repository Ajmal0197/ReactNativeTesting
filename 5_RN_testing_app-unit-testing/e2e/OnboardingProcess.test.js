import { by } from "detox"; // Import the 'by' function from Detox, used for querying elements in the UI.

describe("Onboarding Process", () => {
  // This block runs once before all tests in this suite, launching the app and waiting for the Onboarding Screen.
  beforeAll(async () => {
    await device.launchApp(); // Launch the app on the device/emulator.
    await waitFor(element(by.id("OnboardingScreen")))
      .toBeVisible()
      .withTimeout(5000); // Wait up to 5 seconds for the Onboarding Screen to be visible.
  });

  // Test case: Checks if the first slide is displayed and navigates to the next slide.
  it("should display the first slide and navigate to next slide", async () => {
    // Verify that the first slide text ("Grab all events now only in your hands") is visible.
    await expect(
      element(by.text("Grab all events now only in your hands"))
    ).toBeVisible();

    // Take a screenshot of the Onboarding Screen for visual verification.
    await element(by.id("OnboardingScreen")).takeScreenshot();

    // Tap the "Next" button to navigate to the next slide.
    await element(by.text("Next")).tap();

    // Verify that the second slide text ("Easy payment & fast event ticket") is visible.
    await expect(
      element(by.text("Easy payment & fast event ticket"))
    ).toBeVisible();
  });

  // Test case: Navigates to the login screen from the third slide.
  it("should navigate to login screen on third slide", async () => {
    // Take a screenshot of the Onboarding Screen before navigating to the next slide.
    await element(by.id("OnboardingScreen")).takeScreenshot();

    // Tap the "Next" button to navigate to the third slide.
    await element(by.text("Next")).tap();

    // Tap the "Login" button to navigate to the Login Screen.
    await element(by.text("Login")).tap();

    // Verify that the Login Screen is visible.
    await expect(element(by.id("LoginScreen"))).toBeVisible();
  });
});
