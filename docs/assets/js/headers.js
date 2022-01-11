const headers = {
    "spring": [
        "cernunnos.png",
        "djollfulin.png",
        "goat-man.png",
        "goblins.png",
        "knight.png",
        "raven.png",
        "treant.png",
        "wanderer.png",
        "warlock.png",
        "witch.png",
    ],
    "winter": [
        "christmas_magic.png",
        "christmas_tree.png",
        "dragon.png",
        "eagle.png",
        "horses.png",
        "reindeer.png",
        "ruins.png",
        "santa.png",
        "sleigh.png",
        "traveler.png",
        "tree.png",
    ]
};
let theme = null;
let target = null;

(function() {
    defineTheme();
    defineTarget();
    setHeader();
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
    target = typeof targetQuery === "string" ? targetQuery : "banner-header";
}

function setHeader() {
    let image = headers[theme][Math.floor(Math.random() * headers[theme].length)];
    fetch(`https://duralas.github.io/assets/img/headers/${theme}/${image}`)
        .then(function(response) {
            return response.blob();
        })
        .then(function(myBlob) {
            document.querySelector(`#${target}`).src = URL.createObjectURL(myBlob);
        });
}
