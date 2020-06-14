/// <reference path="../steps.d.ts" />

Feature('Home Page');

Scenario ('should see a home page', (I) => {
    I.amOnPage('/');
    I.see("Hello World");
});
