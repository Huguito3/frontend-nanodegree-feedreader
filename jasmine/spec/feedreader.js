/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {

        beforeEach(function () {
            expect(allFeeds).toBeDefined();
        });
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        for (var i = 0; i < allFeeds.length; i++) {

            (function (testSpec) {
                it(i + ' - Url is defined and has a value', function () {
                    expect(testSpec.url).toBeDefined();
                    expect(testSpec.url).not.toBe('');
                });
            })(allFeeds[i]);

        };

        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        for (var i = 0; i < allFeeds.length; i++) {

            (function (testSpec) {
                it(i + ' - name is defined and has a value: ' + testSpec.name, function () {
                    expect(testSpec.name).toBeDefined();
                    expect(testSpec.name).not.toBe('');
                });
            })(allFeeds[i]);

        };
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function () {
        let menuClass = document.getElementsByClassName("menu-hidden");
        let hasValue = menuClass.length;
        /* TODO: Write a test that ensures the menu element is
             * hidden by default. You'll have to analyze the HTML and
             * the CSS to determine how we're performing the
             * hiding/showing of the menu element.
             */

        it('should be hidden', function () {
            expect(menuClass.length).toBe(1);
        });
        /* TODO: Write a test that ensures the menu changes
             * visibility when the menu icon is clicked. This test
             * should have two expectations: does the menu display when
             * clicked and does it hide when clicked again.
             */
        var menuIcon = $('.menu-icon-link');

        it('the menu changes visibility when the menu icon is clicked', function () {

            let spyClick, sideMenu;
            spyClick = spyOnEvent('.menu-icon-link', 'click');
            $(".menu-icon-link").trigger("click");
            sideMenu = $('body').attr('class');
            expect(sideMenu).toBe('');

            spyClick = spyOnEvent('.menu-icon-link', 'click');
            $(".menu-icon-link").trigger("click");
            sideMenu = $('body').attr('class');
            expect(sideMenu).toBe('menu-hidden');
        });
    });




    /* TODO: Write a new test suite named "Initial Entries" */
    describe('Initial Entries', function () {
        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        var entry;
        beforeEach(function (done) {
            loadFeed(0, done)
        });

        it('It Should have load the feed', function () {
            entry = document.querySelector('.feed .entry');
            expect(entry.length).not.toBe(0);
        });

    });



    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /* TODO: Write a test that ensures when a new feed is loaded
             * by the loadFeed function that the content actually changes.
             * Remember, loadFeed() is asynchronous.
             */

            var contIni;
            var newFeed;

            beforeEach(function(done) {
                loadFeed(0, function() {
                    contIni = document.querySelector('.feed').innerHTML;
    
                    loadFeed(1, function() {
                        done();
                    });
                });
            });
    
            it('New feed had to be load', function() {
                newFeed = document.querySelector('.feed').innerHTML;
                expect(newFeed).not.toBe(contIni);
            });
    });

}());
