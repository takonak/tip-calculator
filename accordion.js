export default class accordion {
    parentElement;
    contentArray;
    baseColor;
    animationTime;
    autoClose;

    accordionInfos = [];

    constructor(htmlElement, contentArray, baseColor, animationTime, autoClose) {
        this.parentElement = htmlElement;
        this.contentArray = contentArray;
        this.baseColor = baseColor;
        this.animationTime = animationTime;
        this.autoClose = autoClose;

        this.createAccordionElements();
        this.styleAccordionElements();
        this.draw();
    }

    createAccordionElements() {
        for (let i = 0; i < this.contentArray.length; i++) {
            let mainContainer = document.createElement("div");
            let headerContainer = document.createElement("div");
            let contentContainer = document.createElement("div");

            headerContainer.innerText = this.contentArray[i].header;
            contentContainer.innerText = this.contentArray[i].content;

            mainContainer.appendChild(headerContainer);
            mainContainer.appendChild(contentContainer);

            headerContainer.addEventListener("click", () => {this.toggleAccordion(i)});

            this.accordionInfos.push({
                mainContainer: mainContainer,
                contentContainer: contentContainer,
                headerContainer: headerContainer,
                isOpen: false
            });
        }
    }

    styleAccordionElements() {
        for (let i = 0; i < this.accordionInfos.length; i++) {
            let headerContainer = this.accordionInfos[i].headerContainer;
            let contentContainer = this.accordionInfos[i].contentContainer;
            headerContainer.style.border = "1px solid black";
            headerContainer.style.backgroundColor = this.baseColor;
            headerContainer.style.cursor = "pointer";

            contentContainer.style.transition = "all " + this.animationTime;
            contentContainer.style.overflow = "hidden";
        }
    }

    toggleAccordion(index) {
        if (this.accordionInfos[index].isOpen) {
            this.closeAccordion(index);
        } else {
            if (this.autoClose) {
                for (let i = 0; i < this.accordionInfos.length; i++) {
                    this.closeAccordion(i);
                }
            }
            this.openAccordion(index);
        }
    }

    closeAccordion(index) {
        this.accordionInfos[index].contentContainer.style.height = "0px";
        this.accordionInfos[index].isOpen = false;
    }

    openAccordion(index) {
        this.accordionInfos[index].contentContainer.style.height = this.accordionInfos[index].baseHeight + "px";
        this.accordionInfos[index].isOpen = true;
    }

    getElementHeight(element) {
        return element.getClientRects()[0].height;
    }

    draw() {
        for (let i = 0; i < this.accordionInfos.length; i++) {
            this.parentElement.appendChild(this.accordionInfos[i].mainContainer);
            this.accordionInfos[i].baseHeight = this.getElementHeight(this.accordionInfos[i].contentContainer);
            this.closeAccordion(i);
        }
    }
}


// function main (){
//     showAlert.addEventListener("click", alert(),{
//         this:contentElement.innerHTML.alert = "You clicked Successfully!",
//     })
//     const showAlert = document.getElementById('info');

//     positionElement.style.animationTime = 5000;
//     positionElement.style.position = center;
// }
