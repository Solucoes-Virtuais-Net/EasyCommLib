class EC_Navbar {
    navbarRef: string;
    constructor(navbarRef: string) {
        this.navbarRef = navbarRef;
    }

    //Configs
    logoAlignX: alignX = "center";
    toolsAlignX: alignX = "end";
    logoAlignY: alignY = "start";
    toolsAlignY: alignY = "start";

    responsive: IResponsive[];

    Config({ logoAlignX, logoAlignY, toolsAlignX, toolsAlignY, responsive }) {
        if (logoAlignX) this.logoAlignX = logoAlignX;
        if (toolsAlignX) this.toolsAlignX = toolsAlignX;
        if (logoAlignY) this.logoAlignY = logoAlignY;
        if (toolsAlignY) this.toolsAlignY = toolsAlignY;
        if (responsive) this.responsive = responsive;
    }

    Init() {
        const { navbarRef, responsive } = this;
        const containerInit = document.querySelector(navbarRef);
        const logo: HTMLElement = containerInit.querySelector("[ec-logo]")
        const option: HTMLElement = containerInit.querySelector("div[ec-options]")
        const navbarOptions: NodeListOf<HTMLElement> = containerInit.querySelectorAll(`${navbarRef} li[id]`);

        var responsiveInit = { ...this };

        function updateAlignItems(logoAlignX: alignX, logoAlignY: alignY, optionAlignX: alignX, optionAlignY: alignY) {
            function alignHandler(itemAlignX: alignX, itemAlignY: alignY, item: HTMLElement) {
                if (window.innerWidth >= 762) {
                    switch (itemAlignX) {
                        case "center":
                            item.style.gridColumnStart = "4"
                            break;
                        case "end": item.style.gridColumnStart = "7"
                            break;
                        case "start": item.style.gridColumnStart = "1"
                            break;
                    }
                    switch (itemAlignY) {
                        case "start": item.style.gridRowStart = "1"
                            break;
                        case "end": item.style.gridRowStart = "2"
                            break;
                    }
                } else {
                    switch (itemAlignX) {
                        case "center":
                            item.style.gridColumnStart = "2"
                            break;
                        case "end": item.style.gridColumnStart = "3"
                            break;
                        case "start": item.style.gridColumnStart = "1"
                            break;
                    }
                    switch (itemAlignY) {
                        case "start": item.style.gridRowStart = "1"
                            break;
                        case "end": item.style.gridRowStart = "2"
                            break;
                    }
                }
            }
            alignHandler(logoAlignX, logoAlignY, logo);
            alignHandler(optionAlignX, optionAlignY, option)
        }
        updateAlignItems(responsiveInit.logoAlignX, responsiveInit.logoAlignY, responsiveInit.toolsAlignX, responsiveInit.toolsAlignY);

        //Mostrar/Não mostrar as informações
        function toggleContextDrop() {
            function hide(item: HTMLElement, navbar: HTMLElement) {
                item.classList.remove("show");
                item.classList.add("hide");
                navbar.classList.remove("active");
            }
            function show(item: HTMLElement, navbar: HTMLElement) {
                item.classList.add("show");
                item.classList.remove("hide");
                navbar.classList.add("active");
            }

            navbarOptions.forEach(n => {
                const id: string = n.getAttribute("id");
                const divReverent: HTMLElement = containerInit.querySelector(`div[ec-drop-target="${id}"]`);
                if (divReverent) {
                    divReverent.classList.add("hide");
                    n.addEventListener("mouseover", () => show(divReverent, n))
                    n.addEventListener("mouseout", () => hide(divReverent, n))
                    divReverent.addEventListener("mouseover", () => show(divReverent, n));
                    divReverent.addEventListener("mouseout", () => hide(divReverent, n))
                }
            })
        }
        toggleContextDrop();

        function renderResponsive() {
            const windowWidth = window.innerWidth;
            const findPoint = responsive?.filter(e => e.mediaPoint >= windowWidth).pop();
            if (findPoint)
                updateAlignItems(findPoint.logoAlignX, findPoint.logoAlignY, findPoint.toolsAlignX, findPoint.toolsAlignY);
            else
                updateAlignItems(responsiveInit.logoAlignX, responsiveInit.logoAlignY, responsiveInit.toolsAlignX, responsiveInit.toolsAlignY);
        }

       window.addEventListener("resize", renderResponsive)
        document.addEventListener("DOMContentLoaded", renderResponsive)
    }

}