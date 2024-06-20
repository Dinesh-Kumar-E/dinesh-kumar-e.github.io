async function fetchGitHubRepos() {
    const url = 'https://api.github.com/search/repositories?q=org:dinesh-kumar-e&sort=updated&order=desc';
    const repos = [];

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const items = data.items.slice(0, 5);

        items.forEach((repo) => {
            if (repo.name !== 'portfolio') {
                repos.push(repo.name);
            }
        });

        console.log(repos);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

fetchGitHubRepos();