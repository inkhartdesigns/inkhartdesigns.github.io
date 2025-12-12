document.addEventListener("DOMContentLoaded", (event) => {
	const nextBtn = document.querySelector(".next");
	const sections = document.querySelectorAll(".section");
	const nav = document.querySelector(".nav");
	const navItems = document.querySelectorAll(".nav li button");
	let nextPage = 0;
	let currPage = 0;

	const sectionIds = Array.from(sections).map((s) => s.getAttribute("id"));
	const navIds = Array.from(navItems).map((item) => item.dataset.href.replace("#", ""));

	sections.forEach((section, index) => {
		section.style.transform = `translateY(${100 * (index - nextPage)}%)`;
	});

	navItems.forEach((item) => {
		item.classList.remove("active");
	});
	navItems[currPage].classList.add("active");

	if (sections.length > 0) {
		nextBtn.addEventListener("click", (e) => {
			e.preventDefault();
			currPage = nextPage;

			if (currPage >= sections.length - 1) {
				nextPage = -1;
			}
			nextPage++;

			sections.forEach((section, index) => {
				section.style.transform = `translateY(${100 * (index - nextPage)}%)`;
			});
			navItems.forEach((item) => {
				item.classList.remove("active");
			});
			const nextTabName = sectionIds[nextPage];

			navItems[navIds.indexOf(nextTabName)]?.classList.add("active");
		});

		/**
		 * When Menu Item is clicked
		 */
		nav.addEventListener("click", (e) => {
			if (e.target.classList.contains("link-item")) {
				const tabName = e.target.dataset.href.replace("#", "");
				const tabId = sectionIds.indexOf(tabName);
				sections.forEach((section, index) => {
					section.style.transform = `translateY(${100 * (index - tabId)}%)`;
				});
				navItems.forEach((item) => {
					item.classList.remove("active");
				});
				navItems[navIds.indexOf(tabName)].classList.add("active");
				currPage = tabId;
				nextPage = tabId;
			}
		});
	}
});
