let star_url = "https://github-readme-stats.vercel.app/api?username=dinesh-kumar-e&show=reviews,discussions_started,discussions_answered,prs_merged,prs_merged_percentage&theme="
let lang_url = "https://github-readme-stats.vercel.app/api/top-langs/?username=dinesh-kumar-e&layout=donut-vertical&theme="
let getrepo_url = "https://api.github.com/search/repositories?q=org:dinesh-kumar-e&sort=updated&order=desc"
let getrepo_details = "https://github-readme-stats.vercel.app/api/pin/?username=dinesh-kumar-e&repo="
let contributionMap_url = "https://ssr-contributions-svg.vercel.app/_/dinesh-kumar-e?chart=calendar&format=png&quality=7&weeks=50&theme="
// let contributionMap_url = "https://f0821970-ba4b-4605-afe3-138d476a9106.mock.pstmn.io"


function update_elements(theme) {
    let profile = document.getElementById("github-profile-details");
    let lang = document.getElementById("github-lang-details");
    let contribution = document.getElementById("github-contribution-chart");

    if (theme == "dark") {
        profile.src = star_url + "transparent";
        lang.src = lang_url + "transparent";
        //contribution.src = contributionMap_url + "sunset";
    }
    else {
        profile.src = star_url + "transparent";
        lang.src = lang_url + "transparent";
        //contribution.src = contributionMap_url + "default";
    }
}

async function fetchGitHubRepos() {
    const url = getrepo_url;
    const repos = [];
    let r = [document.getElementById("repimg1"), document.getElementById("repimg2"), document.getElementById("repimg3"), document.getElementById("repimg4")]

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const items = data.items.slice(0, 5);
        let counter = 0;

        items.forEach((repo) => {
            if (repo.name !== 'dinesh-kumar-e.github.io') {
                r[counter].src = getrepo_details + repo.name + "&theme=transparent";
                console.log(r[counter].src);
                counter++;
            }
        });
        console.log(repos);
        return repos;
    } catch (error) {
        console.error('Error fetching data:', error);
        r[0].src = "Asserts/warning.png"
        r[1].src = "Asserts/warning.png"
        r[2].src = "Asserts/warning.png"
        r[3].src = "Asserts/warning.png"
    }
}

recent_repos = fetchGitHubRepos();
// fetchGitHubRepoDetails(recent_repos);




update_elements("light");
function update_height() {
    let div_height = document.getElementById("github-section").offsetHeight;
    let particle_div = document.getElementById("particles-js");

    particle_div.style.height = div_height + "px";
    console.log("Height Updated");
}
let contribution = document.getElementById("github-contribution-chart");

// contribution.onload = update_height;
