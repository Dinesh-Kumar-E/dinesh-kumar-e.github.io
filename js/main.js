// Main JavaScript file for the portfolio
class Portfolio {
    constructor() {
        this.currentPage = {
            projects: 1,
            research: 1,
            achievements: 1,
            certifications: 1
        };
        this.allData = {};
        this.init();
    }

    async init() {
        await this.loadAllData();
        this.setupNavigation();
        this.setupSmoothScrolling();
        this.setupContactForm();
        this.renderAllSections();
    }

    // Helper function to fetch JSON data
    async fetchJSON(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            console.error(`Error fetching ${path}:`, error);
            return null;
        }
    }

    // Load all JSON data at initialization
    async loadAllData() {
        const dataFiles = [
            'about', 'techstack', 'projects', 'research', 
            'achievements', 'certifications', 'experience', 'education'
        ];

        // Show loading state initially
        this.showSkeletonLoaders();

        for (const file of dataFiles) {
            this.allData[file] = await this.fetchJSON(`data/${file}.json`);
        }

        // Set profile URLs in config from about.json
        if (this.allData.about && this.allData.about.socials) {
            config.profiles.github = this.allData.about.socials.github || '';
            config.profiles.linkedin = this.allData.about.socials.linkedin || '';
        }

        // Hide skeleton loaders after data is loaded
        this.hideSkeletonLoaders();
    }

    // Show skeleton loaders
    showSkeletonLoaders() {
        const skeletonElements = [
            'hero-skeleton', 'about-skeleton', 'techstack-skeleton', 
            'projects-skeleton', 'research-skeleton', 'achievements-skeleton',
            'experience-skeleton', 'certifications-skeleton', 'profiles-skeleton',
            'education-skeleton'
        ];

        skeletonElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('skeleton-hidden');
            }
        });

        const contentElements = [
            'hero-content', 'about-content', 'techstack-content',
            'projects-content', 'research-content', 'achievements-content',
            'experience-content', 'certifications-content', 'profiles-content',
            'education-content', 'projects-pagination', 'research-pagination',
            'achievements-pagination', 'certifications-pagination', 'google-scholar-link'
        ];

        contentElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('skeleton-hidden');
            }
        });
    }

    // Hide skeleton loaders and show actual content
    hideSkeletonLoaders() {
        const skeletonElements = [
            'hero-skeleton', 'about-skeleton', 'techstack-skeleton', 
            'projects-skeleton', 'research-skeleton', 'achievements-skeleton',
            'experience-skeleton', 'certifications-skeleton', 'profiles-skeleton',
            'education-skeleton'
        ];

        skeletonElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('skeleton-hidden');
            }
        });

        const contentElements = [
            'hero-content', 'about-content', 'techstack-content',
            'projects-content', 'research-content', 'achievements-content',
            'experience-content', 'certifications-content', 'profiles-content',
            'education-content', 'projects-pagination', 'research-pagination',
            'achievements-pagination', 'certifications-pagination', 'google-scholar-link'
        ];

        contentElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.remove('skeleton-hidden');
            }
        });
    }

    // Setup smooth scrolling navigation
    setupNavigation() {
        // Enhanced smooth scroll function
        const smoothScrollTo = (targetElement) => {
            const navbarHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20; // 20px extra padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        };

        // Desktop navigation links
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    smoothScrollTo(targetSection);
                }
            });
        });

        // Mobile navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetSection = document.getElementById(targetId);
                if (targetSection) {
                    smoothScrollTo(targetSection);
                    // Close mobile menu after navigation
                    this.closeMobileMenu();
                }
            });
        });

        // Hamburger menu functionality
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileOverlay = document.getElementById('mobile-nav-overlay');
        
        if (hamburgerBtn && mobileOverlay) {
            hamburgerBtn.addEventListener('click', () => {
                this.toggleMobileMenu();
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!hamburgerBtn.contains(e.target) && !mobileOverlay.contains(e.target)) {
                    this.closeMobileMenu();
                }
            });
        }

        // Set resume link
        if (this.allData.about && this.allData.about.resume) {
            document.getElementById('resume-link').href = this.allData.about.resume;
        }
    }

    // Setup enhanced smooth scrolling for the entire website
    setupSmoothScrolling() {
        // Enhanced smooth scroll function with better offset calculation
        const smoothScrollTo = (targetElement) => {
            const navbar = document.getElementById('navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 60;
            const targetPosition = targetElement.offsetTop - navbarHeight - 20;
            
            window.scrollTo({
                top: Math.max(0, targetPosition),
                behavior: 'smooth'
            });
        };

        // Add smooth scrolling to all internal anchor links
        document.addEventListener('click', (e) => {
            // Check if clicked element is an anchor link
            const link = e.target.closest('a[href^="#"]');
            if (!link) return;

            const href = link.getAttribute('href');
            if (!href || href === '#') return;

            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                e.preventDefault();
                smoothScrollTo(targetElement);
            }
        });
    }

    // Mobile menu toggle functions
    toggleMobileMenu() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileOverlay = document.getElementById('mobile-nav-overlay');
        
        hamburgerBtn.classList.toggle('active');
        mobileOverlay.classList.toggle('active');
    }

    closeMobileMenu() {
        const hamburgerBtn = document.getElementById('hamburger-btn');
        const mobileOverlay = document.getElementById('mobile-nav-overlay');
        
        hamburgerBtn.classList.remove('active');
        mobileOverlay.classList.remove('active');
    }

    // Setup contact form
    setupContactForm() {
        const form = document.getElementById('contact-form');
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');

        if (!form) return;

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            formStatus.className = 'form-status loading';
            formStatus.textContent = 'Sending your message...';

            try {
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.className = 'form-status success';
                    formStatus.textContent = 'Thank you! Your message has been sent successfully.';
                    form.reset();
                } else {
                    throw new Error('Network response was not ok');
                }
            } catch (error) {
                // Error
                formStatus.className = 'form-status error';
                formStatus.textContent = 'Sorry, there was an error sending your message. Please try again.';
                console.error('Form submission error:', error);
            } finally {
                // Reset button state
                submitBtn.disabled = false;
                submitBtn.textContent = 'Send Message';
                
                // Hide status after 5 seconds
                setTimeout(() => {
                    formStatus.style.display = 'none';
                    formStatus.className = 'form-status';
                }, 5000);
            }
        });
    }

    // Render all sections
    renderAllSections() {
        this.renderHero();
        this.renderAbout();
        this.renderTechStack();
        this.renderProjects();
        this.renderResearch();
        this.renderAchievements();
        this.renderExperience();
        this.renderCertifications();
        this.renderProfiles();
        this.renderEducation();
        this.renderContact();
        this.renderFooter();
        this.addSectionLinkIcons();
        this.setupTimelineAnimation();
    }

    // Add link icons to section headings
    addSectionLinkIcons() {
        const sections = ['about', 'techstack', 'projects', 'research', 'achievements', 'experience', 'certifications', 'profiles', 'education', 'contact'];
        
        sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                const heading = section.querySelector('h2');
                if (heading && !heading.querySelector('.section-link-icon')) {
                    const linkIcon = document.createElement('span');
                    linkIcon.className = 'section-link-icon material-symbols-outlined';
                    linkIcon.textContent = 'link';
                    linkIcon.title = `Link to ${heading.textContent} section`;
                    linkIcon.style.cursor = 'pointer';
                    linkIcon.addEventListener('click', (e) => {
                        e.preventDefault();
                        // Copy link to clipboard
                        const url = window.location.origin + window.location.pathname + `#${sectionId}`;
                        navigator.clipboard.writeText(url).then(() => {
                            // Visual feedback
                            linkIcon.textContent = 'check';
                            setTimeout(() => {
                                linkIcon.textContent = 'link';
                            }, 1000);
                        }).catch(() => {
                            // Fallback: scroll to section
                            section.scrollIntoView({ behavior: 'smooth' });
                        });
                    });
                    heading.appendChild(linkIcon);
                }
            }
        });
    }

    // Render hero section
    renderHero() {
        const data = this.allData.about;
        if (!data) return;

        document.getElementById('hero-name').textContent = data.name || '';
        document.getElementById('hero-tagline').textContent = data.tagline || '';
        
        // Create mailto link for hero email
        const heroEmailElement = document.getElementById('hero-email');
        if (data.email) {
            heroEmailElement.innerHTML = `<a href="mailto:${data.email}" class="hero-email-link">${data.email}</a>`;
            
            // Setup copy email functionality
            this.setupCopyEmail(data.email);
        }
    }

    // Setup copy email functionality
    setupCopyEmail(email) {
        const copyBtn = document.getElementById('copy-email-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(email);
                    this.showTooltip('Email copied to clipboard!');
                    
                    // Visual feedback - change icon temporarily
                    const icon = copyBtn.querySelector('i');
                    const originalClass = icon.className;
                    icon.className = 'fa-solid fa-check';
                    
                    setTimeout(() => {
                        icon.className = originalClass;
                    }, 2000);
                } catch (err) {
                    // Fallback for browsers that don't support clipboard API
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    this.showTooltip('Email copied to clipboard!');
                }
            });
        }
    }

    // Setup copy email functionality for contact section
    setupContactCopyEmail(email) {
        const copyBtn = document.getElementById('copy-contact-email-btn');
        if (copyBtn) {
            copyBtn.addEventListener('click', async () => {
                try {
                    await navigator.clipboard.writeText(email);
                    this.showTooltip('Email copied to clipboard!');
                    
                    // Visual feedback - change icon temporarily
                    const icon = copyBtn.querySelector('i');
                    const originalClass = icon.className;
                    icon.className = 'fa-solid fa-check';
                    
                    setTimeout(() => {
                        icon.className = originalClass;
                    }, 2000);
                } catch (err) {
                    // Fallback for browsers that don't support clipboard API
                    const textArea = document.createElement('textarea');
                    textArea.value = email;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    this.showTooltip('Email copied to clipboard!');
                }
            });
        }
    }

    // Render about section
    renderAbout() {
        const data = this.allData.about;
        if (!data) return;

        const profilePhoto = document.getElementById('profile-photo');
        if (data.photo) {
            profilePhoto.src = data.photo;
            profilePhoto.alt = `${data.name} Profile Photo`;
        }

        document.getElementById('bio-text').textContent = data.bio || '';
        const notToDisplay = ["discord","instagram"];
        
        // Render social links
        const socialContainer = document.getElementById('social-links');
        socialContainer.innerHTML = ''; // Clear any existing content
        
        if (data.socials) {
            // Define icon mapping for each platform
            const iconMap = {
                github: 'fa-brands fa-github',
                linkedin: 'fa-brands fa-linkedin',
                twitter: 'fa-brands fa-x-twitter'
            };

            // Define display names for platforms
            const nameMap = {
                github: 'Github',
                linkedin: 'Linkedin',
                twitter: 'Twitter'
            };

            Object.entries(data.socials).forEach(([platform, url]) => {
                if (url && !notToDisplay.includes(platform)) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'social-link';
                    
                    // Add icon if available
                    if (iconMap[platform]) {
                        const icon = document.createElement('i');
                        icon.className = iconMap[platform];
                        link.appendChild(icon);
                        
                        const text = document.createElement('span');
                        text.textContent = nameMap[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
                        link.appendChild(text);
                    } else {
                        // Fallback for platforms without icons
                        link.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
                    }
                    
                    socialContainer.appendChild(link);
                }
            });
        }
    }

    // Render tech stack
    renderTechStack() {
        const data = this.allData.techstack;
        if (!data) return;

        const container = document.getElementById('techstack-content');
        container.innerHTML = ''; // Clear any existing content
        
        data.forEach(category => {
            const categoryDiv = document.createElement('div');
            categoryDiv.className = 'tech-category';

            const title = document.createElement('h3');
            title.textContent = category.category;
            categoryDiv.appendChild(title);

            const skillsContainer = document.createElement('div');
            skillsContainer.className = 'tech-skills';

            category.skills.forEach(skill => {
                const skillSpan = document.createElement('span');
                skillSpan.className = 'tech-skill';
                skillSpan.textContent = skill;
                skillsContainer.appendChild(skillSpan);
            });

            categoryDiv.appendChild(skillsContainer);
            container.appendChild(categoryDiv);
        });
    }

    // Render projects with pagination
    renderProjects() {
        this.loadPaginatedList('projects', 'projects', (item) => {
            return this.createProjectCard(item);
        });
    }

    createProjectCard(project) {
        const card = document.createElement('div');
        card.className = 'card';
        card.id = project.id;

        const copyBtn = document.createElement('button');
        copyBtn.className = 'copy-link material-symbols-outlined';
        copyBtn.textContent = 'link';
        copyBtn.title = 'Copy link';
        copyBtn.onclick = () => this.copyLink(project.id);

        const title = document.createElement('h3');
        title.textContent = project.title;

        const techContainer = document.createElement('div');
        techContainer.className = 'card-tech';
        project.tech.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'tech-tag';
            tag.textContent = tech;
            techContainer.appendChild(tag);
        });

        const summary = document.createElement('div');
        summary.className = 'card-summary';
        summary.innerHTML = this.renderMarkdown(project.summary);

        const linksContainer = document.createElement('div');
        linksContainer.className = 'card-links';

        if (project.links) {
            Object.entries(project.links).forEach(([platform, url]) => {
                const link = document.createElement('a');
                link.href = url;
                link.textContent = platform.charAt(0).toUpperCase() + platform.slice(1);
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                linksContainer.appendChild(link);
            });
        }

        if (project.detail) {
            const expandBtn = document.createElement('button');
            expandBtn.className = 'expand-btn';
            expandBtn.textContent = 'Show Details';
            expandBtn.onclick = () => this.toggleDetails(card, project.detail, expandBtn);
            linksContainer.appendChild(expandBtn);
        }

        card.appendChild(copyBtn);
        card.appendChild(title);
        card.appendChild(techContainer);
        card.appendChild(summary);
        card.appendChild(linksContainer);

        return card;
    }

    // Generic paginated list renderer
    loadPaginatedList(sectionId, dataPath, renderFn) {
        const data = this.allData[dataPath];
        if (!data) return;

        const container = document.getElementById(`${sectionId}-content`);
        const paginationContainer = document.getElementById(`${sectionId}-pagination`);
        const currentPage = this.currentPage[sectionId] || 1;
        const itemsPerPage = config.itemsPerPage;
        const totalPages = Math.ceil(data.length / itemsPerPage);

        // Render current page items
        const startIdx = (currentPage - 1) * itemsPerPage;
        const endIdx = startIdx + itemsPerPage;
        const pageItems = data.slice(startIdx, endIdx);

        container.innerHTML = '';
        pageItems.forEach(item => {
            const element = renderFn(item);
            container.appendChild(element);
        });

        // Render pagination
        this.renderPagination(paginationContainer, currentPage, totalPages, (page) => {
            this.currentPage[sectionId] = page;
            this.loadPaginatedList(sectionId, dataPath, renderFn);
            // Scroll to the top of the section
            this.scrollToSection(sectionId);
        });
    }

    renderPagination(container, currentPage, totalPages, onPageChange) {
        container.innerHTML = '';

        if (totalPages <= 1) return;

        // Previous button
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '← Previous';
        prevBtn.disabled = currentPage === 1;
        prevBtn.onclick = () => onPageChange(currentPage - 1);
        container.appendChild(prevBtn);

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            pageBtn.className = i === currentPage ? 'active' : '';
            pageBtn.onclick = () => onPageChange(i);
            container.appendChild(pageBtn);
        }

        // Next button
        const nextBtn = document.createElement('button');
        nextBtn.textContent = 'Next →';
        nextBtn.disabled = currentPage === totalPages;
        nextBtn.onclick = () => onPageChange(currentPage + 1);
        container.appendChild(nextBtn);
    }

    // Render research section
    renderResearch() {
        // Populate Google Scholar link
        const aboutData = this.allData.about;
        if (aboutData && aboutData.googleScholar) {
            const scholarLink = document.getElementById('google-scholar-link');
            if (scholarLink) {
                scholarLink.href = aboutData.googleScholar;
            }
        }

        this.loadPaginatedList('research', 'research', (item) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = item.id;

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-link material-symbols-outlined';
            copyBtn.textContent = 'link';
            copyBtn.title = 'Copy link';
            copyBtn.onclick = () => this.copyLink(item.id);

            const title = document.createElement('h3');
            title.textContent = item.title;

            const meta = document.createElement('div');
            meta.className = 'card-meta';
            meta.textContent = `${item.publisher} • ${item.year}`;

            const summary = document.createElement('div');
            summary.className = 'card-summary';
            summary.innerHTML = this.renderMarkdown(item.summary);

            const linksContainer = document.createElement('div');
            linksContainer.className = 'card-links';

            if (item.doi) {
                const doiLink = document.createElement('a');
                doiLink.href = `https://doi.org/${item.doi}`;
                doiLink.textContent = 'DOI';
                doiLink.target = '_blank';
                doiLink.rel = 'noopener noreferrer';
                linksContainer.appendChild(doiLink);
            }

            if (item.link) {
                const paperLink = document.createElement('a');
                paperLink.href = item.link;
                paperLink.textContent = 'Paper';
                paperLink.target = '_blank';
                paperLink.rel = 'noopener noreferrer';
                linksContainer.appendChild(paperLink);
            }

            card.appendChild(copyBtn);
            card.appendChild(title);
            card.appendChild(meta);
            card.appendChild(summary);
            card.appendChild(linksContainer);

            return card;
        });
    }

    // Render achievements section
    renderAchievements() {
        this.loadPaginatedList('achievements', 'achievements', (item) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = item.id;

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-link material-symbols-outlined';
            copyBtn.textContent = 'link';
            copyBtn.title = 'Copy link';
            copyBtn.onclick = () => this.copyLink(item.id);

            const title = document.createElement('h3');
            title.textContent = item.title;

            const meta = document.createElement('div');
            meta.className = 'card-meta';
            meta.textContent = new Date(item.date).toLocaleDateString();

            const summary = document.createElement('div');
            summary.className = 'card-summary';
            summary.innerHTML = this.renderMarkdown(item.summary);

            const linksContainer = document.createElement('div');
            linksContainer.className = 'card-links';

            if (item.link) {
                const link = document.createElement('a');
                link.href = item.link;
                link.textContent = 'View';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                linksContainer.appendChild(link);
            }

            if (item.detail) {
                const expandBtn = document.createElement('button');
                expandBtn.className = 'expand-btn';
                expandBtn.textContent = 'Show Details';
                expandBtn.onclick = () => this.toggleDetails(card, item.detail, expandBtn);
                linksContainer.appendChild(expandBtn);
            }

            card.appendChild(copyBtn);
            card.appendChild(title);
            card.appendChild(meta);
            card.appendChild(summary);
            card.appendChild(linksContainer);

            return card;
        });
    }

    // Render experience section (timeline)
    renderExperience() {
        const data = this.allData.experience;
        if (!data) return;

        const container = document.getElementById('experience-content');
        container.innerHTML = ''; // Clear any existing content
        
        data.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';

            const title = document.createElement('h3');
            title.textContent = item.role;

            const meta = document.createElement('div');
            meta.className = 'timeline-meta';
            meta.textContent = `${item.company} • ${item.duration}`;

            const description = document.createElement('div');
            description.className = 'timeline-description';
            description.textContent = item.description;

            timelineItem.appendChild(title);
            timelineItem.appendChild(meta);
            timelineItem.appendChild(description);
            container.appendChild(timelineItem);
        });
    }

    // Render certifications section
    renderCertifications() {
        this.loadPaginatedList('certifications', 'certifications', (item) => {
            const card = document.createElement('div');
            card.className = 'card';
            card.id = item.id;

            const copyBtn = document.createElement('button');
            copyBtn.className = 'copy-link material-symbols-outlined';
            copyBtn.textContent = 'link';
            copyBtn.title = 'Copy link';
            copyBtn.onclick = () => this.copyLink(item.id);

            const title = document.createElement('h3');
            title.textContent = item.title;

            const meta = document.createElement('div');
            meta.className = 'card-meta';
            meta.textContent = `${item.issuer} • ${item.date}`;

            const linksContainer = document.createElement('div');
            linksContainer.className = 'card-links';

            if (item.link) {
                const link = document.createElement('a');
                link.href = item.link;
                link.textContent = 'View Certificate';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                linksContainer.appendChild(link);
            }

            card.appendChild(copyBtn);
            card.appendChild(title);
            card.appendChild(meta);
            card.appendChild(linksContainer);

            return card;
        });
    }

    // Render profiles & stats section
    renderProfiles() {
        const container = document.getElementById('profiles-content');
        container.innerHTML = ''; // Clear any existing content
        
        const data = this.allData.about;
        
        if (!data || !data.codingProfiles) return;

        const profiles = [
            { name: 'LeetCode', key: 'leetcode' },
            { name: 'Codeforces', key: 'codeforces' },
            { name: 'CodeChef', key: 'codechef' }
        ];

        profiles.forEach(profile => {
            const url = data.codingProfiles[profile.key];
            if (url) {
                const card = document.createElement('div');
                card.className = 'profile-card';

                const title = document.createElement('h3');
                title.textContent = profile.name;

                const link = document.createElement('a');
                link.href = url;
                link.textContent = 'View Profile';
                link.target = '_blank';
                link.rel = 'noopener noreferrer';

                card.appendChild(title);
                card.appendChild(link);
                container.appendChild(card);
            }
        });
    }

    // Render education section (timeline)
    renderEducation() {
        const data = this.allData.education;
        if (!data) return;

        const container = document.getElementById('education-content');
        container.innerHTML = ''; // Clear any existing content
        
        data.forEach(item => {
            const timelineItem = document.createElement('div');
            timelineItem.className = 'timeline-item';

            const title = document.createElement('h3');
            title.textContent = item.degree;

            const meta = document.createElement('div');
            meta.className = 'timeline-meta';
            meta.textContent = `${item.institution} • ${item.year}`;

            const grade = document.createElement('div');
            grade.className = 'timeline-description';
            grade.textContent = `Grade: ${item.grade}`;

            timelineItem.appendChild(title);
            timelineItem.appendChild(meta);
            timelineItem.appendChild(grade);
            container.appendChild(timelineItem);
        });
    }

    // Render contact section
    renderContact() {
        const data = this.allData.about;
        if (!data) return;

        // Create mailto link for email
        const emailElement = document.getElementById('contact-email');
        if (data.email) {
            emailElement.innerHTML = `<a href="mailto:${data.email}" class="email-link">${data.email}</a>`;
            
            // Setup copy email functionality for contact section
            this.setupContactCopyEmail(data.email);
        }

        const socialContainer = document.getElementById('contact-social');
        socialContainer.innerHTML = ''; // Clear any existing content
        
        if (data.socials) {
            // Define icon mapping for each platform
            const iconMap = {
                github: 'fa-brands fa-github',
                linkedin: 'fa-brands fa-linkedin',
                twitter: 'fa-brands fa-x-twitter',
                instagram: 'fa-brands fa-instagram',
                discord: 'fa-brands fa-discord'
            };

            // Define display names for platforms
            const nameMap = {
                github: 'Github',
                linkedin: 'Linkedin',
                twitter: 'Twitter',
                instagram: 'Instagram',
                discord: 'Discord'
            };

            Object.entries(data.socials).forEach(([platform, url]) => {
                if (url && iconMap[platform]) {
                    const link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    link.className = 'contact-social-link';
                    
                    // Create icon element
                    const icon = document.createElement('i');
                    icon.className = iconMap[platform];
                    
                    // Create text span
                    const text = document.createElement('span');
                    text.textContent = nameMap[platform] || platform.charAt(0).toUpperCase() + platform.slice(1);
                    
                    link.appendChild(icon);
                    link.appendChild(text);
                    socialContainer.appendChild(link);
                }
            });
        }
    }

    // Utility functions
    renderMarkdown(text) {
        if (typeof marked !== 'undefined' && typeof DOMPurify !== 'undefined') {
            const rawMarkup = marked.parse(text);
            return DOMPurify.sanitize(rawMarkup);
        }
        return text; // Fallback to plain text if libraries not loaded
    }

    async toggleDetails(card, detailPath, button) {
        const existingDetail = card.querySelector('.detail-content');
        
        if (existingDetail) {
            existingDetail.remove();
            button.textContent = 'Show Details';
            return;
        }

        button.textContent = 'Loading...';
        
        try {
            const response = await fetch(detailPath);
            if (response.ok) {
                const markdown = await response.text();
                const detailDiv = document.createElement('div');
                detailDiv.className = 'detail-content';
                detailDiv.innerHTML = this.renderMarkdown(markdown);
                card.appendChild(detailDiv);
                button.textContent = 'Hide Details';
            } else {
                button.textContent = 'Details Unavailable';
            }
        } catch (error) {
            console.error('Error loading details:', error);
            button.textContent = 'Error Loading Details';
        }
    }

    copyLink(id) {
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        const copyBtn = document.querySelector(`#${id} .copy-link`);
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(url).then(() => {
                this.showTooltip('Link copied!');
                // Visual feedback
                if (copyBtn) {
                    copyBtn.textContent = 'check';
                    setTimeout(() => {
                        copyBtn.textContent = 'link';
                    }, 1000);
                }
            });
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = url;
            document.body.appendChild(textArea);
            textArea.select();
            try {
                document.execCommand('copy');
                this.showTooltip('Link copied!');
                // Visual feedback
                if (copyBtn) {
                    copyBtn.textContent = 'check';
                    setTimeout(() => {
                        copyBtn.textContent = 'link';
                    }, 1000);
                }
            } catch (err) {
                console.error('Could not copy link');
            }
            document.body.removeChild(textArea);
        }
    }

    scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            // Scroll to the section with some offset for the fixed navbar
            const sectionTop = section.offsetTop - 100; // 100px offset for navbar + spacing
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth'
            });
        }
    }

    // Render footer
    renderFooter() {
        const data = this.allData.about;
        if (data && data.name) {
            const footerName = document.getElementById('footer-name');
            if (footerName) {
                footerName.textContent = data.name;
            }
        }
        
        // Populate social links
        if (data && data.socials) {
            const socialLinks = {
                'github-link': data.socials.github,
                'linkedin-link': data.socials.linkedin,
                'twitter-link': data.socials.twitter,
                'instagram-link': data.socials.instagram,
                'discord-link': data.socials.discord
            };
            
            Object.entries(socialLinks).forEach(([id, url]) => {
                const element = document.getElementById(id);
                if (element && url) {
                    element.href = url;
                }
            });
        }
    }

    showTooltip(message) {
        const tooltip = document.createElement('div');
        tooltip.textContent = message;
        tooltip.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #333;
            color: white;
            padding: 8px 16px;
            border-radius: 4px;
            z-index: 10000;
            font-size: 14px;
        `;
        document.body.appendChild(tooltip);

        setTimeout(() => {
            document.body.removeChild(tooltip);
        }, 2000);
    }

    // Setup timeline scroll animation
    setupTimelineAnimation() {
        const timelineItems = document.querySelectorAll('.timeline-item');
        
        if (timelineItems.length === 0) return;

        const observerOptions = {
            threshold: 0.5,
            rootMargin: '-20% 0px -20% 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-active');
                } else {
                    entry.target.classList.remove('timeline-active');
                }
            });
        }, observerOptions);

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});
