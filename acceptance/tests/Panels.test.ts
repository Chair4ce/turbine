/// <reference path="../steps.d.ts" />
Feature('menu function');

Scenario ('should toggle Alpha table', (I) => {
    I.amOnPage('/');
    I.click('#MainSectionBtn');
    I.click('#alpha_roster_toggle_btn');
    I.waitForText('Alpha Roster');
    I.click('#alpha_roster_toggle_btn');
    I.dontSee('Alpha Roster');
});

// Scenario ('should toggle Loss table', (I) => {
//     I.amOnPage('/');
//     I.click('.losing_roster_toggle_btn');
//     I.waitForText('Loss Roster');
//     I.click('.losing_roster_toggle_btn');
//     I.dontSee('Loss Roster');
// });
Scenario ('should toggle Gaining table', (I) => {
    I.amOnPage('/');
    I.click('#MainSectionBtn');
    I.click('#gaining_roster_toggle_btn');
    I.waitForText('Gaining Roster');
    I.click('#gaining_roster_toggle_btn');
    I.dontSee('Gaining Roster');
});
// // Scenario ('should toggle Projected table', (I) => {
// //     I.amOnPage('/');
// //     I.click('.projected_roster_toggle_btn');
// //     I.waitForText('Projected');
// //     I.click('.projected_roster_toggle_btn');
// //     I.dontSee('Projected');
// // });
// Scenario ('should toggle Positions table', (I) => {
//     I.amOnPage('/');
//     I.click('.position_roster_toggle_btn');
//     I.waitForText('Authorized Positions');
//     I.click('.position_roster_toggle_btn');
//     I.dontSee('Authorized Positions');
// });

