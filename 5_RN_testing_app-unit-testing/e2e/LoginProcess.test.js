describe("Login Process", () => {
  // This block runs once before all tests in this suite, setting up the login scenario.
  beforeAll(async () => {
    await device.launchApp(); // Launch the app on the device/emulator.

    // Wait up to 5 seconds for the Onboarding Screen to be visible.
    await waitFor(element(by.id("OnboardingScreen")))
      .toBeVisible()
      .withTimeout(5000);

    // Navigate through the onboarding slides.
    await element(by.text("Next")).tap(); // Tap "Next" on the first slide.
    await element(by.text("Next")).tap(); // Tap "Next" on the second slide.

    // Tap the "Login" button to navigate to the login screen.
    await element(by.text("Login")).tap();

    // Enter email and password on the login screen.
    await element(by.id("email")).typeText("ritik@gmail.com"); // Type the email into the email field.
    await element(by.id("password")).typeText("12345678"); // Type the password into the password field.

    // Dismiss the keyboard by pressing the back button (useful on mobile devices).
    await device.pressBack();
  });

  // Test case: Verifies the login process and navigation to the home screen.
  it("Should fill email and password and navigate to home screen", async () => {
    // Check that the "Login" button is visible on the screen.
    await expect(element(by.id("Login"))).toBeVisible();

    // Tap the "Login" button to attempt login.
    await element(by.id("Login")).tap();

    // Verify that the text "Testing Complete" is visible on the home screen, indicating successful login and navigation.
    await expect(element(by.text("Testing Complete"))).toBeVisible();
  });
});
