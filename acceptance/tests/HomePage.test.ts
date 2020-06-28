/// <reference path="../steps.d.ts" />

Feature('Main Page');

Scenario ('should see a main page with hello world', (I) => {
    I.amOnPage('/');
    I.see("Turbine");
    I.see("Current");
    I.see("Projected");
    I.see("Gaining");
    I.see("Losing");
});
