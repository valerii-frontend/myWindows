// icons
let icons = document.querySelectorAll(".icon");
let apps = document.querySelector(".apps");
let tasks = document.querySelector(".taskbar__tasks");
let appsList = [
	{
		name: "Internet Explorer",
		element: document.getElementById(0),
		id: 0,
		title: "Wikipedia, the free encyclopedia",
		icon: "./icons/wikipedia.ico",
		alt: "wikipedia-logo",
		isOpen: false,
	},
	{
		name: "The Fifteen Puzzle game",
		element: document.getElementById(1),
		id: 1,
		title: "The 15 Puzzle game",
		icon: "./icons/fifteen.png",
		alt: "The Fifteen Puzzle Game",
		isOpen: false,
	},
];
// #eal time function
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
// #
// @Close context menu
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
//@
//% Add task in the taskbar
function createTask(src, title, id) {
	let task = document.createElement("div");
	task.classList.add("taskbar__item");
	task.classList.add("btn");
	task.classList.add("current");
	task.setAttribute("data-id", id);
	task.innerHTML = `<img src="${src}" alt="${title}" /> ${title}`;
	tasks.appendChild(task);
	apps.classList.add("active");
	appsList[id].element.classList.add("active");
}
// %
icons.forEach((icon) => {
	// CLOSE ALL CONTEXT
	icon.addEventListener("contextmenu", (e) => {
		let allOpen = document.querySelectorAll(".open");
		if (allOpen.length > 0) allOpen.forEach((menu) => menu.classList.remove("open"));
		let cm = icon.querySelector(".context-menu");
		if (cm) cm.classList.add("open");
	});
	// $APPLICATIONS ICON CLICK
	icon.addEventListener("click", (e) => {
		let findSelected = document.querySelectorAll(".selected");
		findSelected.forEach((element) => element.classList.remove("selected"));
		icon.classList.add("selected");
		let iconID = icon.getAttribute("data-icon");
		if (!appsList[iconID].isOpen) {
			appsList[iconID].isOpen = !appsList[iconID].isOpen;
			createTask(appsList[iconID].icon, appsList[iconID].title, iconID);
			if (iconID == 0) {
				let iframe = appsList[iconID].element.querySelector("iframe");
				let url = iframe.getAttribute("src");
				if (!url) iframe.setAttribute("src", "https://en.wikipedia.com");
			}
			if (iconID == 1) {
				startGame();
			}
		}
	});
});
// !CLOSE WINDOW
document.addEventListener("click", function (e) {
	if (e.target.classList.contains("close")) {
		let windowID = e.target.closest(".window").getAttribute("id");
		if (windowID == "1") {
			clearInterval(time.timerID);
			time.timerID = null;
		}
		let getTasks = document.querySelectorAll(".taskbar__tasks .taskbar__item");
		getTasks.forEach((task) => {
			let taskID = task.getAttribute("data-id");
			if (taskID == windowID) {
				appsList[windowID].isOpen = false;
				appsList[windowID].element.classList.remove("current");
				task.remove();
			}
		});
		e.target.closest(".window").classList.remove("active");
		let getActives = document.querySelectorAll(".window.active");
		if (getActives.length < 1) apps.classList.remove("active");
	}
	// !MINIMIZE WINDOW
	if (e.target.classList.contains("minimize")) {
		let windowID = e.target.closest(".window").getAttribute("id");
		appsList[windowID].element.classList.remove("current");
		appsList[windowID].element.classList.add("minimize");
		let bbb = document.querySelector(`[data-id="${windowID}"]`);
		console.log(bbb);
		bbb.classList.remove("current");
	}
});

// SET CURRENT
tasks.addEventListener("click", function (e) {
	let curt = tasks.querySelectorAll(".taskbar__item");
	curt.forEach((element) => {
		element.classList.remove("current");
		let dt = element.getAttribute("data-id");
		appsList[dt].element.classList.remove("current");
	});
	if (e.target.classList.contains("taskbar__item")) {
		let dt = e.target.getAttribute("data-id");
		if (appsList[dt].isOpen) {
			appsList[dt].element.classList.remove("minimize");
			appsList[dt].element.classList.add("current");
		}
		e.target.classList.add("current");
	}
});

//! OPEN MENU APP OPEN

let openMenus = document.querySelectorAll("open");

openMenus.forEach((open) => {
	open.addEventListener("click", function (e) {
		let iconID = open.getAttribute("data-open-id");
		if (!appsList[iconID].isOpen) {
			appsList[iconID].isOpen = !appsList[iconID].isOpen;
			createTask(appsList[iconID].icon, appsList[iconID].title, iconID);
			if (iconID == 0) {
				let iframe = appsList[iconID].element.querySelector("iframe");
				let url = iframe.getAttribute("src");
				if (!url) iframe.setAttribute("src", "https://en.wikipedia.com");
			}
			if (iconID == 1) {
				startGame();
			}
		}
	});
});
