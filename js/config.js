// Configuration for external profiles and features
const config = {
    // Show/hide profile sections
    showLC: true,        // LeetCode
    showCF: true,        // Codeforces
    showGitHub: true,    // GitHub
    showLinkedIn: true,  // LinkedIn
    
    // Profile URLs (will be populated from data/about.json)
    profiles: {
        leetcode: "https://leetcode.com/dinesh-kumar-e/",
        codeforces: "https://codeforces.com/profile/dinesh_kumar_e",
        github: "", // Will be set from about.json
        linkedin: "" // Will be set from about.json
    },
    
    // Pagination settings
    itemsPerPage: 3,
    
    // Contact form settings
    enableContactForm: true,
    captchaAnswer: "5" // Answer to "What is 2 + 3?"
};
