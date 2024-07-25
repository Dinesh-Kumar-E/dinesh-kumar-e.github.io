async function readJsonFiles(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const jsonData = await response.json();
        return jsonData;
    } catch (error) {
        console.error('Error reading JSON file:', error);
        return [];
    }
  }
// LeetCode

  function leetcode_failure() {
    return `
        <img id="leetcode-fail" src="Asserts/invalid.png" alt="invalid" srcset="">
        <p id="leetcode-fail-text">Fail to fetch the data</p>
    `;
}

function leetcode_success() {
    return `
        <div class="row no-edge">
            <div class="col-5 no-edge leetstat stat">
                <div id="leetcode-totalsolved" class="no-edge"></div>
                <div id="leetcode-totalquestions" class="no-edge"></div>
                <div id="leetcode-easysolved" class="no-edge"></div>
                <div id="leetcode-mediumsolved" class="no-edge"></div>
                <div id="leetcode-hardsolved" class="no-edge"></div>
                <div id="leetcode-acceptancerate" class="no-edge"></div>
                <div id="leetcode-rank" class="no-edge"></div>
                <div id="leetcode-repuation" class="no-edge"></div>
            </div>
            <div class="col-7 no-edge">
                <canvas id="leetcode-canvas" class="no-edge"></canvas>
        </div>`
}

function processLeetCodeStats(data) {
    document.getElementById("leetcode-totalsolved").innerHTML = `<p class="statparm no-edge"> Total Solved: <span class="statres no-edge">${data.totalSolved}</span></p>`;
    document.getElementById("leetcode-totalquestions").innerHTML = `<p class="statparm no-edge"> Total Questions: <span class="statres no-edge">${data.totalQuestions}</span></p>`;
    document.getElementById("leetcode-easysolved").innerHTML = `<p class="statparm no-edge"> Easy Solved: <span class="statres no-edge">${data.easySolved}</span></p>`;
    document.getElementById("leetcode-mediumsolved").innerHTML = `<p class="statparm no-edge"> Medium Solved: <span class="statres no-edge">${data.mediumSolved}</span></p>`;
    document.getElementById("leetcode-hardsolved").innerHTML = `<p class="statparm no-edge"> Hard Solved: <span class="statres no-edge">${data.hardSolved}</span></p>`;
    document.getElementById("leetcode-acceptancerate").innerHTML = `<p class="statparm no-edge"> Acceptance Rate: <span class="statres no-edge">${data.acceptanceRate}%</span></p>`;
    document.getElementById("leetcode-rank").innerHTML = `<p class="statparm no-edge"> Rank: <span class="statres no-edge">${data.ranking}</span></p>`;
    document.getElementById("leetcode-repuation").innerHTML = `<p class="statparm no-edge"> Reputation: <span class="statres no-edge">${data.reputation}</span></p>`;

    const ctx = document.getElementById('leetcode-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Easy', 'Medium', 'Hard'],
            datasets: [{
                label: 'LeetCode Stats',
                data: [data.easySolved, data.mediumSolved, data.hardSolved],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    });
}

async function fetchLeetCodeStats() {
    var element = document.getElementById("leetcode-title");
    try {
        const response = await fetch("https://leetcode-stats-api.herokuapp.com/dinesh-kumar-e");
        //const response = await fetch("https://bd344e05-8e08-4c42-8cc2-a95f4d005071.mock.pstmn.io");
        console.log("response"+response.status);
        if (response.status == 200) {
            console.log("Success");
            element.insertAdjacentHTML('afterend', leetcode_success());
            const data = await response.json();
            processLeetCodeStats(data);
        } else {
            console.log("Fail");
            element.insertAdjacentHTML('afterend', leetcode_failure());
        }
    } catch (error) {
        console.log("Error:", error);
        element.insertAdjacentHTML('afterend', leetcode_failure());
    }
}

// HackerRank

function hackerrank_failure() {
    return `
        <img id="hackerrank-fail" src="Asserts/invalid.png" alt="invalid" srcset="">
        <p id="hackerrank-fail-text">Failed to fetch the data</p>
    `;
}

function hackerrank_success() {
    return `
        <div class="row no-edge">
            <div class="col-5 no-edge hackerrankstat stat">
                <div id="hackerrank-totalsolved" class="no-edge"></div>
                <div id="hackerrank-totalquestions" class="no-edge"></div>
                <div id="hackerrank-mathematics" class="no-edge"></div>
                <div id="hackerrank-python" class="no-edge"></div>
                <div id="hackerrank-problemsolving" class="no-edge"></div>
                <div id="hackerrank-hackos" class="no-edge"></div>
            </div>
            <div class="col-7 no-edge">
                <canvas id="hackerrank-canvas" class="no-edge"></canvas>
            </div>
        </div>`;
}
function processHackerRankStats(data) {
    document.getElementById("hackerrank-totalsolved").innerHTML = `<p class="statparm no-edge">Total Solved: <span class="statres no-edge">${data.totalsolved}</span></p>`;
    document.getElementById("hackerrank-totalquestions").innerHTML = `<p class="statparm no-edge">Total Questions: <span class="statres no-edge">${data.totalquestions}</span></p>`;
    document.getElementById("hackerrank-mathematics").innerHTML = `<p class="statparm no-edge">Mathematics: <span class="statres no-edge">${data.mathematics}</span></p>`;
    document.getElementById("hackerrank-python").innerHTML = `<p class="statparm no-edge">Python: <span class="statres no-edge">${data.python}</span></p>`;
    document.getElementById("hackerrank-problemsolving").innerHTML = `<p class="statparm no-edge">Problem Solving: <span class="statres no-edge">${data.problemsolving}</span></p>`;
    document.getElementById("hackerrank-hackos").innerHTML = `<p class="statparm no-edge">Hackos: <span class="statres no-edge">${data.hackos}</span></p>`;

    const ctx = document.getElementById('hackerrank-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Mathematics', 'Python', 'Problem Solving'],
            datasets: [{
                label: 'HackerRank Stats',
                data: [data.mathematics, data.python, data.problemsolving],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                    'rgb(255, 205, 86)'
                ],
                hoverOffset: 4
            }]
        }
    });
}

async function fetchHackerRankStats(){
    try{
        var strings = await readJsonFiles("Data/hackerrank.json");
        element = document.getElementById("hackerrank-title");
        element.insertAdjacentHTML('afterend', hackerrank_success());
        processHackerRankStats(strings);
    }
    catch(error){
        console.log("Error:", error);}
}


// Code Chef

function codechef_failure() {
    return `
        <img id="codechef-fail" src="Asserts/invalid.png" alt="invalid" srcset="">
        <p id="codechef-fail-text">Fail to fetch the data</p>
    `;
}

function codechef_success() {
    return `
        <div class="row no-edge">
            <div class="col-5 no-edge codechefstat stat">
                <div id="codechef-problemsolver-begining" class="no-edge"></div>
                <div id="codechef-rating" class="no-edge"></div>
                <div id="codechef-totalproblemsolved" class="no-edge"></div>
                <div id="codechef-rating" class="no-edge"></div>
                <div id="codechef-rank" class="no-edge"></div>

            </div>
            <div class="col-7 no-edge">
                <canvas id="codechef-canvas" class="no-edge"></canvas>
        </div>`
}

function processCodechefStats(data) {
    document.getElementById("codechef-problemsolver-begining").innerHTML = `<p class="statparm no-edge"> Problems Solved: <span class="statres no-edge">${data.problemsolved}</span></p>`;
    document.getElementById("codechef-rating").innerHTML = `<p class="statparm no-edge"> Rating: <span class="statres no-edge">${data.rating}</span></p>`;
    document.getElementById("codechef-totalproblemsolved").innerHTML = `<p class="statparm no-edge"> Total Problems Solved: <span class="statres no-edge">${data.totalproblemsolved}</span></p>`;
    document.getElementById("codechef-rank").innerHTML = `<p class="statparm no-edge"> Rank: <span class="statres no-edge">${data.rank}</span></p>`;

    const ctx = document.getElementById('codechef-canvas').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['problemsolved','totalproblemsolved'],
            datasets: [{
                label: 'Codechef Stats',
                data: [data.problemsolved, data.totalproblemsolved],
                backgroundColor: [
                    'rgb(255, 99, 132)',
                    'rgb(54, 162, 235)',
                ],
                hoverOffset: 4
            }]
        }
    });
}

async function fetchCodechefStats() {
    try{
        var strings = await readJsonFiles("Data/codechef.json");
        element = document.getElementById("codechef-title");
        element.insertAdjacentHTML('afterend', codechef_success());
        processCodechefStats(strings);
    }
    catch(error){
        console.log("Error:", error);}
}




fetchLeetCodeStats();
fetchHackerRankStats();
fetchCodechefStats();