class EC_Navbar {
    constructor(navbarRef) {
        //Configs
        this.navbarFixed = false;
        this.scrollyOnlyNavbar = false;
        this.logoAlignX = "center";
        this.toolsAlignX = "end";
        this.logoAlignY = "start";
        this.toolsAlignY = "start";
        this.scrollyOnlyNavbarPositionX_logo = "center";
        this.scrollyOnlyNavbarPositionX_options = "start";
        this.scrollyOnlyNavbarPositionX_bottomOptions = "end";
        this.navbarRef = navbarRef;
    }
    Config({ logoAlignX, logoAlignY, toolsAlignX, toolsAlignY, responsive, navbarFixed, scrollyOnlyNavbar, scrollyOnlyNavbarPositionX_logo, scrollyOnlyNavbarPositionX_options, scrollyOnlyNavbarPositionX_bottomOptions, scrollyBackground, scrollyBackgroundTop }) {
        if (logoAlignX)
            this.logoAlignX = logoAlignX;
        if (toolsAlignX)
            this.toolsAlignX = toolsAlignX;
        if (logoAlignY)
            this.logoAlignY = logoAlignY;
        if (toolsAlignY)
            this.toolsAlignY = toolsAlignY;
        if (responsive)
            this.responsive = responsive;
        if (navbarFixed)
            this.navbarFixed = navbarFixed;
        if (scrollyOnlyNavbar)
            this.scrollyOnlyNavbar = scrollyOnlyNavbar;
        if (scrollyBackground)
            this.scrollyBackground = scrollyBackground;
        if (scrollyBackgroundTop)
            this.scrollyBackgroundTop = scrollyBackgroundTop;
        if (scrollyOnlyNavbarPositionX_logo)
            this.scrollyOnlyNavbarPositionX_logo = scrollyOnlyNavbarPositionX_logo;
        if (scrollyOnlyNavbarPositionX_options)
            this.scrollyOnlyNavbarPositionX_options = scrollyOnlyNavbarPositionX_options;
        if (scrollyOnlyNavbarPositionX_bottomOptions)
            this.scrollyOnlyNavbarPositionX_bottomOptions = scrollyOnlyNavbarPositionX_bottomOptions;
    }
    Init() {
        const { navbarRef, responsive } = this;
        const containerInit = document.querySelector(navbarRef);
        const logo = containerInit.querySelector("[ec-logo]");
        const option = containerInit.querySelector("div[ec-options]");
        const navbarOptions = containerInit.querySelectorAll(`${navbarRef} li[id]`);
        var responsiveInit = { ...this };
        function alignHandler(itemAlignX, itemAlignY, item) {
            if (window.innerWidth >= 762) {
                switch (itemAlignX) {
                    case "center":
                        item.style.gridColumnStart = "4";
                        break;
                    case "end":
                        item.style.gridColumnStart = "7";
                        break;
                    case "start":
                        item.style.gridColumnStart = "1";
                        break;
                }
                switch (itemAlignY) {
                    case "start":
                        item.style.gridRowStart = "1";
                        break;
                    case "end":
                        item.style.gridRowStart = "2";
                        break;
                }
            }
            else {
                switch (itemAlignX) {
                    case "center":
                        item.style.gridColumnStart = "2";
                        break;
                    case "end":
                        item.style.gridColumnStart = "3";
                        break;
                    case "start":
                        item.style.gridColumnStart = "1";
                        break;
                }
                switch (itemAlignY) {
                    case "start":
                        item.style.gridRowStart = "1";
                        break;
                    case "end":
                        item.style.gridRowStart = "2";
                        break;
                }
            }
        }
        function updateAlignItems(logoAlignX, logoAlignY, optionAlignX, optionAlignY) {
            alignHandler(logoAlignX, logoAlignY, logo);
            alignHandler(optionAlignX, optionAlignY, option);
        }
        updateAlignItems(responsiveInit.logoAlignX, responsiveInit.logoAlignY, responsiveInit.toolsAlignX, responsiveInit.toolsAlignY);
        //Mostrar/Não mostrar as informações
        function toggleContextDrop() {
            function hide(item, navbar) {
                item.classList.remove("show");
                item.classList.add("hide");
                navbar.classList.remove("active");
            }
            function show(item, navbar) {
                item.classList.add("show");
                item.classList.remove("hide");
                navbar.classList.add("active");
            }
            navbarOptions.forEach(n => {
                const id = n.getAttribute("id");
                const divReverent = containerInit.querySelector(`div[ec-drop-target="${id}"]`);
                if (divReverent) {
                    divReverent.classList.add("hide");
                    n.addEventListener("mouseover", () => show(divReverent, n));
                    n.addEventListener("touchstart", () => show(divReverent, n));
                    n.addEventListener("mouseout", () => hide(divReverent, n));
                    divReverent.addEventListener("mouseover", () => show(divReverent, n));
                    divReverent.addEventListener("mouseout", () => hide(divReverent, n));
                }
            });
        }
        toggleContextDrop();
        function valiableFixedNavbar() {
            if (responsiveInit.navbarFixed) {
                const windowScroll = window.scrollY;
                if (windowScroll > 0) {
                    containerInit.style.cssText = `position: fixed; width: 100%; `;
                }
                else {
                    containerInit.style.cssText = `position: relative; width: 100%; `;
                }
            }
            else {
                containerInit.style.cssText = `position: relative; width: 100%; `;
            }
        }
        function variableBackgroundNavbar() {
            const { scrollyBackground, scrollyBackgroundTop } = responsiveInit;
            const windowScroll = window.scrollY;
            if (windowScroll > 0) {
                if (scrollyBackground)
                    containerInit.style.background = scrollyBackground;
                else
                    containerInit.style.background = "#fff";
            }
            else {
                if (scrollyBackgroundTop)
                    containerInit.style.background = scrollyBackgroundTop;
                else
                    containerInit.style.background = "#fff";
            }
        }
        window.addEventListener("scroll", () => {
            valiableFixedNavbar();
            variableBackgroundNavbar();
        });
        window.addEventListener("DOMContentLoaded", () => {
            valiableFixedNavbar();
            variableBackgroundNavbar();
        });
        function valiablePositionScrollOnly() {
            const isTop = window.scrollY === 0;
            if (!isTop) {
                alignHandler(responsiveInit.scrollyOnlyNavbarPositionX_logo, "start", logo);
                alignHandler(responsiveInit.scrollyOnlyNavbarPositionX_options, "start", option);
            }
            else {
                alignHandler(responsiveInit.logoAlignX, "start", logo);
                alignHandler(responsiveInit.toolsAlignX, "start", option);
            }
        }
        if (responsiveInit.scrollyOnlyNavbar)
            window.addEventListener("scroll", valiablePositionScrollOnly);
        function onlyNavbarScrolling() {
            const navbar = containerInit.querySelector("[ec-navbar]");
            console.log({ navbar });
            const bottomOption = containerInit.querySelector("[ec-bottom-options]");
            function movingBottomOptions() {
                const isTop = window.scrollY === 0;
                const navbarScroll = document.querySelector(`${navbarRef} [ec-navbar] [ec-bottom-options]`);
                if (!isTop) {
                    if (!navbarScroll) {
                        navbar.appendChild(bottomOption);
                        const divSaved = document.createElement("div");
                        divSaved.setAttribute("ec-save-local", "");
                        navbar.parentNode.insertBefore(divSaved, navbar.nextSibling);
                        // alignHandler("center", "start", navbarScroll)
                    }
                }
                else {
                    if (navbarScroll) {
                        const savedLocalBottom = containerInit.querySelector("[ec-save-local]");
                        savedLocalBottom.after(bottomOption);
                        savedLocalBottom.remove();
                    }
                }
            }
            function positionStylingBottomOption() {
                const isTop = window.scrollY === 0;
                const navbarScroll = document.querySelector(`${navbarRef} [ec-navbar] [ec-bottom-options]`);
                const drops = containerInit.querySelectorAll("[ec-drop-target]");
                if (!isTop) {
                    if (navbarScroll) {
                        navbarScroll.style.gridColumnEnd = "span 5";
                        navbarScroll.style.gridRowStart = "1";
                        drops.forEach(d => d.style.top = `${containerInit.clientHeight}px`);
                    }
                }
                else {
                    if (!navbarScroll) {
                        bottomOption.removeAttribute("style");
                        drops.forEach(d => d.removeAttribute("style"));
                    }
                }
            }
            if (bottomOption) {
                window.addEventListener("scroll", () => {
                    movingBottomOptions();
                    positionStylingBottomOption();
                });
            }
        }
        if (responsiveInit.scrollyOnlyNavbar)
            onlyNavbarScrolling();
        function toggleMobile() {
            const btnMobile = containerInit.querySelector("[ec-mobile-button]");
            const contextMobile = containerInit.querySelector("[ec-context-menu-mobile]");
            let isShowing = false;
            btnMobile.addEventListener("click", () => {
                if (isShowing) {
                    isShowing = !isShowing;
                    contextMobile.classList.remove("show");
                    btnMobile.setAttribute("ec-mobile-button", "false");
                }
                else {
                    isShowing = !isShowing;
                    contextMobile.classList.add("show");
                    btnMobile.setAttribute("ec-mobile-button", "true");
                }
            });
        }
        toggleMobile();
        function renderResponsive() {
            const windowWidth = window.innerWidth;
            const findPoint = responsive?.filter(e => e.mediaPoint >= windowWidth).pop();
            if (findPoint)
                updateAlignItems(findPoint.logoAlignX, findPoint.logoAlignY, findPoint.toolsAlignX, findPoint.toolsAlignY);
            else
                updateAlignItems(responsiveInit.logoAlignX, responsiveInit.logoAlignY, responsiveInit.toolsAlignX, responsiveInit.toolsAlignY);
        }
        document.addEventListener("DOMContentLoaded", () => {
            renderResponsive();
            onlyNavbarScrolling();
        });
        document.addEventListener("DOMContentLoaded", renderResponsive);
    }
}
