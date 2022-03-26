// real time function
function getTime() {
	let date = new Date();
	let time = document.querySelector(".time");
	time.innerHTML = `${date.getHours()}:${date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()}:${
		date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()
	}`;
}
// Start the time
setInterval(() => {
	getTime();
}, 1000);
// Close context menu
function closeOpenMenu() {
	let allOpen = document.querySelectorAll(".open");
	if (allOpen.length > 0) allOpen.forEach((menu) => menu.classList.remove("open"));
}
// Global windows listener
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("click", (e) => {
	e.preventDefault();
	closeOpenMenu();
});
// icons
let icons = document.querySelectorAll(".icon");
let apps = document.querySelector(".apps");

icons.forEach((icon) => {
	icon.addEventListener("contextmenu", (e) => {
		let allOpen = document.querySelectorAll(".open");
		if (allOpen.length > 0) allOpen.forEach((menu) => menu.classList.remove("open"));
		let cm = icon.querySelector(".context-menu");
		if (cm) cm.classList.add("open");
	});
	icon.addEventListener("click", (e) => {
		let findSelected = document.querySelectorAll(".selected");
		findSelected.forEach((element) => element.classList.remove("selected"));
		icon.classList.add("selected");
		if (icon.classList.contains("app-ie")) {
			let ie = document.querySelector(".internet-explorer-window");
			let iframe = ie.querySelector("iframe");
			let url = iframe.getAttribute("src");
			if (!url) iframe.setAttribute("src", "https://en.wikipedia.com");
			apps.classList.add("active");
			ie.classList.add("active");
		} else if (icon.classList.contains("app-fifteen")) {
			let fifteenGame = document.querySelector(".the-fifteen-game-window");
			apps.classList.add("active");
			fifteenGame.classList.add("active");
			startGame();
		}
	});
});
// CLOSE WINDOW
document.addEventListener("click", function (e) {
	if (e.target.classList.contains("close")) {
		e.target.closest(".window").classList.remove("active");
		apps.classList.remove("active");
		clearInterval(time.timerID);
		time.timerID = null;
	}
});

let pages = {
	wikiEn: { link: "https://en.wikipedia.com", icon: "wikipedia", title: "Wikipedia, the free encyclopedia" },
	wikiPl: { link: "https://pl.wikipedia.com", icon: "wikipedia", title: "Wikipedia, wolna encyklopedia" },
};
