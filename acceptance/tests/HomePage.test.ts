/// <reference path="../steps.d.ts" />

Feature('Main Page');

Scenario ('should see a main page with hello world', (I) => {
    I.amOnPage('/');
    I.see("Hello World");
});
