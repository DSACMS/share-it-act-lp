document.addEventListener('DOMContentLoaded', function () {
    const feedbackBanner = document.querySelector('.feedback-banner');
    const cmsHeader = document.querySelector('.feedback-banner');

    if (feedbackBanner && cmsHeader) {
        const bannerHeight = feedbackBanner.offsetHeight - 1;
        cmsHeader.style.top = bannerHeight + 'px';
        feedbackBanner.style.width = '100%';
    }

    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainMenu = document.getElementById('main-menu');

    if (menuToggle && mainMenu) {
        menuToggle.addEventListener('click', function () {
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
            mainMenu.classList.toggle('show');
        });

        document.addEventListener('click', function (e) {
            if (!menuToggle.contains(e.target) && !mainMenu.contains(e.target) && mainMenu.classList.contains('show')) {
                mainMenu.classList.remove('show');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // // Add smooth scrolling for anchor links
    // document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    //     anchor.addEventListener('click', function (e) {
    //         e.preventDefault();

    //         console.log("anchor", anchor);

    //         const target = document.querySelector(this.getAttribute('href'));

    //         if (target) {
    //             // Adjust the scroll position to account for the fixed header
    //             const headerHeight = document.querySelector('.cms-header').offsetHeight;
    //             const targetPosition = target.getBoundingClientRect().top + window.scrollY;
    //             const offsetPosition = targetPosition - headerHeight;

    //             window.scrollTo({
    //                 top: offsetPosition,
    //                 behavior: 'smooth'
    //             });
    //         }
    //     });
    // });

    // Keyboard navigation for cards
    const cards = document.querySelectorAll('.feature-card, .doc-card, .tool-card');
    cards.forEach(card => {
        card.setAttribute('tabindex', '0');

        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const link = this.querySelector('a');
                if (link) {
                    link.click();
                }
            }
        });
    });

    // Dynamic nav bar 
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('nav ul li a');

    function setActiveNavItem() {
        const scrollPosition = window.scrollY;
        const viewportHeight = window.innerHeight;
        const headerHeight = document.querySelector('.cms-header').offsetHeight;
        const bannerHeight = feedbackBanner ? feedbackBanner.offsetHeight : 0;
        const totalOffset = headerHeight + bannerHeight;
        const scrollBottom = scrollPosition + viewportHeight;

        // Remove current page indicator from all nav items
        navItems.forEach(item => {
            item.removeAttribute('aria-current');
        });

        // First section special handling (hero)
        const firstSection = document.getElementById('hero');
        if (firstSection && scrollPosition < (document.getElementById('documentation').offsetTop - totalOffset)) {
            navItems.forEach(item => {
                if (item.getAttribute('href') === '#hero') {
                    item.setAttribute('aria-current', 'page');
                }
            });
            return;
        }

        // Check if we're in either CTA or quiz section
        const ctaSection = document.getElementById('cta');
        const quizSection = document.getElementById('quiz-section');
        const quizVisible = quizSection.style.display !== 'none';

        const ctaTop = ctaSection.offsetTop - totalOffset;
        const ctaBottom = ctaTop + ctaSection.offsetHeight;

        const quizTop = quizVisible ? (quizSection.offsetTop - totalOffset) : Number.MAX_VALUE;
        const quizBottom = quizVisible ? (quizTop + quizSection.offsetHeight) : Number.MAX_VALUE;

        const ctaInView =
            (scrollPosition <= ctaTop && scrollBottom >= ctaTop) ||
            (scrollPosition >= ctaTop && scrollPosition < ctaBottom) ||
            (scrollBottom >= document.body.scrollHeight - 100 && !quizVisible);

        const quizInView = quizVisible && (
            (scrollPosition <= quizTop && scrollBottom >= quizTop) ||
            (scrollPosition >= quizTop && scrollPosition < quizBottom)
        );

        if (ctaInView || quizInView) {
            navItems.forEach(item => {
                if (item.getAttribute('href') === '#cta') {
                    item.setAttribute('aria-current', 'page');
                }
            });
            return;
        }

        let currentSection = null;

        sections.forEach(section => {
            if (section.id === 'hero' || section.id === 'cta' || section.id === 'quiz-section') return;

            const sectionTop = section.offsetTop - totalOffset;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                currentSection = section.id;
            }
        });

        if (currentSection) {
            navItems.forEach(item => {
                if (item.getAttribute('href') === '#' + currentSection) {
                    item.setAttribute('aria-current', 'page');
                }
            });
        }
    }

    // Initialize dynamic nav and set up scroll listener
    window.addEventListener('scroll', setActiveNavItem);
    setActiveNavItem();

    // Quiz logic
    const openQuizBtn = document.getElementById('open-quiz-btn');
    const quizSection = document.getElementById('quiz-section');
    const quizForm = document.querySelector('#quiz-section form');
    const resultsDiv = document.querySelector('#quiz-section .results');
    const tierResult = document.querySelector('#quiz-section .tier-result');
    const complianceDetails = document.getElementById('compliance-details');
    const resetBtn = document.getElementById('quiz-reset-btn');

    console.log("main has run");
    console.log("openQuizBtn", openQuizBtn);
    console.log("quizSection", quizSection);

    if (openQuizBtn && quizSection) {
        openQuizBtn.addEventListener('click', function (e) {
            e.preventDefault();
            quizSection.style.display = 'block';

            setActiveNavItem();
        });

        // Handle the quiz submission
        quizForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get the selected values from the form
            const role = document.querySelector('input[name="user-role"]:checked')?.value;
            const familiarity = document.querySelector('input[name="familiarity"]:checked')?.value;
            const repoStatus = document.querySelector('input[name="repo-status"]:checked')?.value;

            // Default guidance if something goes wrong
            let guidanceTitle = "Getting Started with SHARE IT Act";
            let guidanceText = "";
            let resourceLinks = "";

            // Determine guidance based on user selections
            if (role === 'developer') {
                if (familiarity === 'new') {
                    guidanceTitle = "Developer Getting Started Guide";
                    guidanceText = "As a developer new to the SHARE IT Act, your first steps should be to understand the basic requirements and how they apply to your code.";
                    resourceLinks = `
                        <a href="https://github.com/DSACMS/gov-codejson/blob/main/docs/faq.md" target="_blank" class="doc-link">SHARE IT Act FAQ</a> - Start here for an overview<br>
                        <a href="https://github.com/DSACMS/gov-codejson/blob/main/docs/metadata.md" target="_blank" class="doc-link">Metadata Guide</a> - Learn about code.json requirements<br>
                        <a href="https://dsacms.github.io/codejson-generator" target="_blank" class="doc-link">Web Form Generator</a> - Create your first code.json file
                    `;
                } else if (familiarity === 'familiar') {
                    guidanceTitle = "Developer Implementation Guide";
                    guidanceText = "Since you're already familiar with the SHARE IT Act, focus on implementing proper metadata in your repositories and automating the process.";
                    resourceLinks = `
                        <a href="https://github.com/DSACMS/gov-codejson/blob/main/docs/procedures.md" target="_blank" class="doc-link">Implementation Procedures</a> - Follow best practices<br>
                        <a href="https://github.com/DSACMS/automated-codejson-generator" target="_blank" class="doc-link">Automated Generator</a> - Set up CI/CD for your code.json<br>
                        <a href="https://github.com/DSACMS/gov-codejson/blob/main/docs/examples.md" target="_blank" class="doc-link">Example code.json Files</a> - Model your files on these
                    `;
                } else if (familiarity === 'implementing') {
                    guidanceTitle = "Advanced Developer Resources";
                    guidanceText = "Great work on implementing the SHARE IT Act! Now focus on optimizing your workflow and ensuring completeness.";
                    resourceLinks = `
                        <a href="https://github.com/DSACMS/repo-scaffolder" target="_blank" class="doc-link">Repository Scaffolder</a> - Use for new projects<br>
                        <a href="https://github.com/DSACMS/repolinter-actions" target="_blank" class="doc-link">Repolinter Actions</a> - Verify compliance automatically<br>
                        <a href="https://dsacms.github.io/metrics/" target="_blank" class="doc-link">Metrics Dashboard</a> - Monitor your open source impact
                    `;
                }
            } else if (role === 'team-lead') {
                if (repoStatus === 'none' || repoStatus === 'some') {
                    guidanceTitle = "Team Implementation Strategy";
                    guidanceText = "As a team lead, you should focus on establishing processes for your team to follow and ensuring all repositories have proper metadata.";
                    resourceLinks = `
                        <a href="https://github.com/DSACMS/gov-codejson/blob/main/docs/procedures.md" target="_blank" class="doc-link">Implementation Procedures</a> - Team workflow guide<br>
                        <a href="https://github.com/DSACMS/automated-codejson-generator" target="_blank" class="doc-link">Automated Generator</a> - CI/CD integration for teams<br>
                        <a href="https://github.com/DSACMS/repo-scaffolder" target="_blank" class="doc-link">Repository Scaffolder</a> - Standardize new repos
                    `;
                } else {
                    guidanceTitle = "Team Optimization Strategy";
                    guidanceText = "Your team has made excellent progress. Now focus on consistency, quality, and measuring impact.";
                    resourceLinks = `
                        <a href="https://github.com/DSACMS/repolinter-actions" target="_blank" class="doc-link">Repolinter Actions</a> - Quality assurance<br>
                        <a href="https://dsacms.github.io/metrics/" target="_blank" class="doc-link">Metrics Dashboard</a> - Measure team impact<br>
                        <a href="https://github.com/DSACMS/index-generator-website/" target="_blank" class="doc-link">Index Generator</a> - Aggregate team metadata
                    `;
                }
            } else if (role === 'agency') {
                guidanceTitle = "Agency-Wide Implementation";
                guidanceText = "For agency representatives, focus on policy development, comprehensive inventory, and aggregation of metadata across all departments.";
                resourceLinks = `
                    <a href="https://www.congress.gov/118/plaws/publ187/PLAW-118publ187.pdf" target="_blank" class="doc-link">SHARE IT Act Text</a> - Full legislation details<br>
                    <a href="https://github.com/DSACMS/index-generator-website/" target="_blank" class="doc-link">Index Generator</a> - Agency-wide aggregation<br>
                    <a href="https://dsacms.github.io/metrics/" target="_blank" class="doc-link">Metrics Dashboard</a> - Agency-wide metrics
                `;
            } else {
                guidanceTitle = "SHARE IT Act Resources";
                guidanceText = "Here are resources to help you understand and implement the SHARE IT Act requirements:";
                resourceLinks = `
                    <a href="https://github.com/DSACMS/gov-codejson/blob/main/docs/faq.md" target="_blank" class="doc-link">SHARE IT Act FAQ</a><br>
                    <a href="https://github.com/DSACMS/gov-codejson/blob/main/docs/metadata.md" target="_blank" class="doc-link">Metadata Guide</a><br>
                    <a href="https://dsacms.github.io/codejson-generator" target="_blank" class="doc-link">Web Form Generator</a>
                `;
            }

            // Update and show results
            tierResult.textContent = guidanceTitle;
            complianceDetails.innerHTML = `
                <p><strong>${guidanceText}</strong></p>
                <p>Based on your profile, here are the most relevant resources:</p>
                <div class="resource-links">
                    ${resourceLinks}
                </div>
            `;

            quizForm.style.display = 'none';
            resultsDiv.style.display = 'block';
        });

        // Reset the quiz
        if (resetBtn) {
            resetBtn.addEventListener('click', function (e) {
                e.preventDefault();
                quizForm.reset();
                quizForm.style.display = 'block';
                resultsDiv.style.display = 'none';
            });
        }

        // Update the quiz content
        const updateQuizContent = function () {
            const quizContainer = document.querySelector('.quiz .usa-form');
            if (quizContainer) {
                quizContainer.innerHTML = `
                    <fieldset class="usa-fieldset">
                        <legend class="usa-legend">What best describes your role?</legend>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="user-role-developer" type="radio" name="user-role" value="developer" checked>
                            <label class="usa-radio__label" for="user-role-developer">Individual Developer</label>
                        </div>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="user-role-team-lead" type="radio" name="user-role" value="team-lead">
                            <label class="usa-radio__label" for="user-role-team-lead">Team Lead/Manager</label>
                        </div>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="user-role-agency" type="radio" name="user-role" value="agency">
                            <label class="usa-radio__label" for="user-role-agency">Agency Representative</label>
                        </div>
                    </fieldset>

                    <fieldset class="usa-fieldset">
                        <legend class="usa-legend">How familiar are you with the SHARE IT Act?</legend>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="familiarity-new" type="radio" name="familiarity" value="new" checked>
                            <label class="usa-radio__label" for="familiarity-new">I'm new to it</label>
                        </div>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="familiarity-familiar" type="radio" name="familiarity" value="familiar">
                            <label class="usa-radio__label" for="familiarity-familiar">I understand the basics</label>
                        </div>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="familiarity-implementing" type="radio" name="familiarity" value="implementing">
                            <label class="usa-radio__label" for="familiarity-implementing">I'm actively implementing it</label>
                        </div>
                    </fieldset>

                    <fieldset class="usa-fieldset">
                        <legend class="usa-legend">What is your current repository status?</legend>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="repo-status-none" type="radio" name="repo-status" value="none" checked>
                            <label class="usa-radio__label" for="repo-status-none">No repositories with code.json files</label>
                        </div>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="repo-status-some" type="radio" name="repo-status" value="some">
                            <label class="usa-radio__label" for="repo-status-some">Some repositories have code.json files</label>
                        </div>
                        <div class="usa-radio">
                            <input class="usa-radio__input usa-radio__input--tile" id="repo-status-all" type="radio" name="repo-status" value="all">
                            <label class="usa-radio__label" for="repo-status-all">All repositories have code.json files</label>
                        </div>
                    </fieldset>

                    <button type="submit" class="usa-button" id="quiz-submit-btn">
                        Get Guidance
                    </button>
                `;
            }
        };

        setTimeout(updateQuizContent, 100);
    }
});