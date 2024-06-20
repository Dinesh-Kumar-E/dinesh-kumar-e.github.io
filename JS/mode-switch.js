let modebutton = document.getElementById("mode-switch");

let Mode = localStorage.getItem("mode");
if (!Mode) {
    Mode = 'dark';
    localStorage.setItem("mode", Mode);
}

setMode(Mode);

modebutton.addEventListener("click", function () {
    let currentMode = localStorage.getItem("mode"); // Retrieve current mode
    toggleMode(currentMode);
});

function toggleMode(mode) {
    if (mode === 'dark') {
        mode = 'light';
    } else {
        mode = 'dark';
    }
    localStorage.setItem("mode", mode);
    setMode(mode);
}

function setModeImage(mode) {
    let modeimg = document.getElementById("mode-switch-img");
    if (mode === 'dark') {
        modeimg.src = "Asserts/sun.png";
    } else {
        modeimg.src = "Asserts/moon.png";
    }
}

function setvanta(mode) {

    if (mode == 'dark') {
        VANTA.DOTS({
            el: "#hero-section",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0xff7100,
            color2: 0xff7100,
            backgroundColor: 0x000000,
            size: 4,
            spacing: 40,
            showLines: false
        })
    }
    else {
        VANTA.DOTS({
            el: "#hero-section",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            color: 0x4d18ae,
            color2: 0x4d00d9,
            backgroundColor: 0xffffff,
            size: 4,
            spacing: 40,
            showLines: false
        })
    }
}

function setnavbar(mode) {
    let navItems = document.querySelectorAll("#menu a");
    if (mode === 'dark') {
        navItems.forEach(function (navItem) {
            navItem.style.color = 'white';
        });
    } else {
        navItems.forEach(function (navItem) {
            navItem.style.color = 'black';
        });
    }

    navItems = document.querySelectorAll("#menu ul.sub-menus");
    if (mode === 'dark') {
        navItems.forEach(function (navItem) {
            navItem.style.backgroundColor = 'black';
        });
    } else {
        navItems.forEach(function (navItem) {
            navItem.style.backgroundColor = 'white';
        });
    }

    let homeicon = document.getElementById("home");

    if (mode == 'dark') {
        homeicon.src = "Asserts/home-d.png";
    }
    else {
        homeicon.src = "Asserts/home-l.png";
    }

}

function setprename(mode) {
    let prename = document.getElementById("pre-name");
    if (mode === 'dark') {
        prename.style.color = 'white';
    } else {
        prename.style.color = 'black';
    }

}

function setabout(mode) {
    let about1 = document.getElementById("about-section");
    let about2 = document.getElementById("about-heading");
    let about3 = document.getElementById("about-para");
    if (mode === 'dark') {
        about1.style.backgroundColor = 'black';
        about2.style.color = 'white';
        about3.style.color = 'white';

    } else {
        about1.style.backgroundColor = 'white';
        about2.style.color = 'black';
        about3.style.color = 'black';
    }


}

function setcodeprofile(mode) {
    try {
        let id1 = document.getElementById("code-profile-title-head");
        let class1 = document.getElementsByClassName("code-profiles");
        let id2 = document.getElementById("code-profile-section");
        let class2 = document.getElementsByClassName("statparm");
        let class3 = document.getElementsByClassName("statres");

        if (mode === 'dark') {
            id1.style.color = 'white';
            id2.style.backgroundColor = 'black';
            for (let i = 0; i < class1.length; i++) {
                class1[i].style.color = 'white';
            }
            for (let i = 0; i < class2.length; i++) {
                class2[i].style.color = 'white';
            }
            for (let i = 0; i < class3.length; i++) {
                class3[i].style.color = '00dd42';
            }
        } else {
            id1.style.color = 'black';
            id2.style.backgroundColor = 'white';
            for (let i = 0; i < class1.length; i++) {
                class1[i].style.color = 'black';
            }
            for (let i = 0; i < class2.length; i++) {
                class2[i].style.color = 'blueviolet';
            }
            for (let i = 0; i < class3.length; i++) {
                class3[i].style.color = '00dd42';
            }
        }

    }
    catch (err) {
        console.log("Code Profile not loaded yet");

    }
}

function github_profile(mode){
    let bg = document.getElementById("github-section");
    let title = document.getElementById("github-title");
    let recent = document.getElementById("recent-rep-title");
    if (mode === 'dark') {
        bg.style.backgroundColor = 'transparent';
        //bg.style.backgroundColor = 'black';
        title.style.color = 'white';
        recent.style.color = 'white';
    } else {
        // bg.style.backgroundColor = 'transparent';
        bg.style.backgroundColor = 'white';
        title.style.color = 'black';
        recent.style.color = 'black';
    }
}

function setMode(mode) {
    setModeImage(mode);
    setvanta(mode);
    setnavbar(mode);
    setprename(mode);
    setabout(mode);
    setcodeprofile(mode);
    github_profile(mode);
}
