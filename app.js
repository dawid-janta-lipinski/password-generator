class PasswordGenerator{
    constructor(){
        this.resultPassword = document.querySelector("#result");
        this.clipboardButton = document.querySelector("#clipboard");
        this.passwordLength = document.querySelector("#length");
        this.uppercaseCheckbox = document.querySelector("#uppercase");
        this.lowercaseCheckbox = document.querySelector("#lowercase");
        this.numbersCheckbox = document.querySelector("#numbers");
        this.symbolsCheckbox = document.querySelector("#symbols");
        this.generateButton = document.querySelector("#generate-password");

        this.init();
    }
    init(){
        document.querySelectorAll(".options input[type='checkbox']")
        .forEach((checkbox) => {
            checkbox.addEventListener("click", this.updateOptions)
        });

        this.generateButton.addEventListener("click", this.generatePassword);
        
        this.updateOptions();
        this.clipboardButton.addEventListener("click", this.copyToClipboard);
    }
    updateOptions = () => {
        const optionMethods = [];
        if(this.uppercaseCheckbox.checked) optionMethods.push(this.getRandomUppercase);
        if(this.lowercaseCheckbox.checked) optionMethods.push(this.getRandomLowercase);
        if(this.numbersCheckbox.checked) optionMethods.push(this.getRandomNumber);
        if(this.symbolsCheckbox.checked) optionMethods.push(this.getRandomSymbol);

        this.optionMethods = optionMethods;
    }

    getRandomUppercase() { //65-90 in ASCII
        return String.fromCharCode(65 + Math.floor(Math.random()*26));
    }
    getRandomLowercase() { //97-120 in ASCII
        return String.fromCharCode(97 + Math.floor(Math.random()*26));
    }
    getRandomNumber() {
        return Math.floor(Math.random()*10);
    }
    getRandomSymbol() {
        const symbols = `!@#$%^&*()_+=-[]{}|,.?><;:`;
        return symbols[Math.floor(Math.random()*symbols.length)];
    }

    /*generatePassword = () => {
        if (!this.passwordLength.value) return;
        if(this.optionMethods.length === 0) return;

        const arrIndexes = Array.from(Array(+this.passwordLength.value).keys());
        
        const password = arrIndexes.map(el => {
            const method = this.getRandomGenMethod();
            return method();
        }).join("");
        this.resultPassword.innerHTML = password;
    }*/

    generatePassword = () => {
        if (!this.passwordLength.value) return;
        if(this.optionMethods.length === 0) return;

        const passwordArr = [];

        for (let i=0; i<this.passwordLength.value; i++){
            let method = this.getRandomGenMethod();
            passwordArr.push(method());
        }
        this.resultPassword.innerHTML = passwordArr.join("");
    }

    getRandomGenMethod = () => {
        const methods = this.optionMethods;
        return methods[Math.floor(Math.random() * methods.length)];
    }

    copyToClipboard = () =>{
        const password = this.resultPassword.innerHTML;
        const cb = navigator.clipboard;
        cb.writeText(password).
        then( () => console.log("password copied to clipboard"));
    }
}

const passwordGenerator = new PasswordGenerator();