const tabExposants = [128,64,32,16,8,4,2,1];
let sign;
const POSITIVE = 0;
const NEGATIVE = 1;

function integerToBinary(integer) {
    let output = [];
    for(let i = 0 ; i < 8 ; i ++){
        if(integer - tabExposants[i] >= 0){
            integer -= tabExposants[i];
            output[i] = 1;
        }else{
            output[i] = 0;
        }
    }
    return output;
}
function decimalToBinary({decimal}){
    let output = [];
    let i = 0;
    while(decimal != 0){
        decimal *= 2;
        if(decimal >= 1){
            decimal -= 1;
            output[i] = 1;
        }else{
            output[i] = 0;
        }
        i ++;
    }
    return output;
}

function exponant({binaryInteger}){
    let i = 0;
    while(binaryInteger[i] != 1){
        i ++;
    }
    return binaryInteger.length - (i + 1);
}

function splitter(input){
    let integer = parseInt(input.split(".")[0]);
    let decimal = parseFloat("0."+input.split(".")[1]);
    return {integer,decimal};
}

function cutIntegerDecimalFromFirst1(tab){
    while(tab[0] != 1){
        tab.shift();
    }
    tab.shift();
    return tab;
}

function to32Bit(array){
    while(array.length < 32){
        array.push(0);
    }
    while(array.length > 32){
        array.pop();
    }
    return array;
}

function checking(){
    let input = document.getElementById("input");
    if(input.value.includes(",")){
        alert("Wrong input, please use the British's convention instead.");
        input.value = "";
    }
    else if(input.value.match(/[^-.\d]|((?<!^)-.*)|(.*\..*\.)/)){
        alert("Letters detected !");
        console.error(`Probleme lors de l'input : ${input.value}`);
        input.value = "";
    }else{
        let value = input.value;
        sign = POSITIVE;
        if(value[0] == "-"){
            sign = NEGATIVE;
            value = input.value.substring(1);
        }
        calculate(value);
    }
        
}

function dividedBy4Section(tab){
    let i = 0;
    let finalTab = [];
    while(i < tab.length){
        let newTab = "";
        for(let j = 0 ; j < 4 ; j ++){
            newTab += tab[i];
            i++;
        }
        finalTab.push(newTab);
    }
    return finalTab;
}


window.onload = function() {
    
    
}

function calculate(input){
    vf = splitter(input);
    vf.binaryInteger = integerToBinary(vf.integer);
    vf.binaryDecimal = decimalToBinary(vf);
    vf.polarisedExponant = exponant(vf) + 127;
    vf.binaryExponant = integerToBinary(vf.polarisedExponant);
    
    console.log("Voici les données à ce jour : ");
    console.log(vf);
    console.log("Il ne reste qu'a s'occuper du resultat.");
    vf.result = [];
    vf.result.unshift(sign);
    console.log(`Creer la réponse en rajoutant d'abord 0 : ${vf.result}`);
    vf.result = vf.result.concat(vf.binaryExponant);
    console.log(`Rajout de la partie exposant : ${vf.result}`);
    let temp = cutIntegerDecimalFromFirst1(vf.binaryInteger);
    vf.result = vf.result.concat(temp);
    console.log(`Rajout de la partie "integer" : ${vf.result}`);
    vf.result = vf.result.concat(vf.binaryDecimal);
    console.log(`Rajout de la partie "decimal" : ${vf.result}`);
    vf.result = to32Bit(vf.result);
    console.log(`Ajustement pour 32 bits : ${vf.result}`);
    let answer = vf.result.join("");
    answer = dividedBy4Section(answer);
    document.getElementById("answer").innerText = answer;
}