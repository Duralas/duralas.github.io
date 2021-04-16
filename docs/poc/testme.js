const headers = {
    "spring": [
        "witch.png",
        "cernunnos.png",
        "goat-man.png",
    ]
};
let theme = null;
let target = null;

(function() {
    defineTheme();
    defineTarget();
    setHeader();

    document.querySelector("#testme").addEventListener("click", function () {
        setHeader();
    });
})();

function defineTheme() {
    if (typeof theme === "string") {
        return;
    }

    let themeQuery = (new URLSearchParams(window.location.search)).get("theme");
    if (Object.keys(headers).includes(themeQuery) === false) {
        const month = (new Date()).getMonth() + 1;
        if (month < 3) {
            themeQuery = "winter";
        } else if (month < 6) {
            themeQuery = "spring";
        } else if (month < 9) {
            themeQuery = "summer";
        } else if (month < 12) {
            themeQuery = "autumn";
        } else {
            themeQuery = "winter";
        }
    }

    theme = themeQuery;
}

function defineTarget() {
    if (typeof target === "string") {
        return;
    }

    let targetQuery = (new URLSearchParams(window.location.search)).get("target");
    target = typeof targetQuery === "string" ? targetQuery : "banner";
}

function setHeader() {
    let image = headers[theme][Math.floor(Math.random() * headers[theme].length)];
    fetch(`/assets/img/headers/${theme}/${image}`)
        .then(function(response) {
            return response.blob();
        })
        .then(function(myBlob) {
            document.querySelector(`#${target}`).src = URL.createObjectURL(myBlob);
        });
}
