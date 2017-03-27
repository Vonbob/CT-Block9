var ConversionType = {
    decimalToBinary: {
        title: "Conversion from decimal to binary",
        placeholder: "decimal number ...",
        error: "Please provide number in decimal format",
        convert: function (input) {
            var decimal = Number(input);
            var result = [];
            while (decimal > 0) {
                result.unshift(decimal % 2);
                decimal = Math.floor(decimal / 2);
            }
            return result.toString().replace(/,/g, "");
        },
        formatResult: function (input, result) {
            return {
                original: "Decimal: " + input,
                converted: "Binary: " + result
            };
        },
        validateInput: function (input) {
            if (!input || isNaN(input)) {
                return false;
            }
            else {
                return true;
            }     
        }
    },
    binaryToDecimal: {
        title: "Conversion from binary to decimal",
        placeholder: "binary number ...",
        error: "Please provide number in binary format",
        convert: function (input) {
            var number = 0;
            var length = input.length;
            var i;
            for (i = 0; i < length; ++i) {
                var digit = Number(input[length - 1 - i]);
                number += digit * Math.pow(2, i);
            }
            return number.toString();
        },
        formatResult: function (input, result) {
            return {
                original: "Binary: " + input,
                converted: "Decimal: " + result
            };
        },
        validateInput: function (input) {
            var i;
            if (!input) {
                return false;
            }
            for (i = 0; i < input.length; ++i) {
                if (input[i] !== "1" && input[i] !== "0") {
                    return false;
                }
            }
            return true;
        }
    },
    decimalToHexadecimal: {
        title: "Conversion from decimal to hexadecimal",
        placeholder: "decimal number ...",
        error: "Please provide number in decimal format",
        convert: function (input) {
            var decimal = Number(input);
            var result = [];
            while (decimal > 0) {
                var digit = decimal % 16;
                if (digit >= 10)
                {
                    switch(digit)
                    {
                        case 10:
                            digit = "A";
                            break;
                        case 11:
                            digit = "B";
                            break;
                        case 12:
                            digit = "C";
                            break;
                        case 13:
                            digit = "D";
                            break;
                        case 14:
                            digit = "E";
                            break;
                        case 15:
                            digit = "F";
                            break;
                    }
                }
                result.unshift(digit);
                decimal = Math.floor(decimal / 16);
            }
            return result.toString().replace(/,/g, "");
        },
        formatResult: function (input, result) {
            return {
                original: "Decimal: " + input,
                converted: "Hexadecimal: " + result
            };
        },
        validateInput: function (input) {
            if (!input || isNaN(input)) {
                return false;
            }
            else {
                return true;
            }
        }
    },
    hexadecimalToDecimal: {
        title: "Conversion from hexadecimal to decimal",
        placeholder: "hexadecimal number ...",
        error: "Please provide number in hexadecimal format",
        convert: function(input) {
            var number = 0;
            var length = input.length;
            var i;
            for (i = 0; i < length; ++i) {
                var digit = input[length - 1 - i];
                switch (digit) {
                    case "A":
                    case "a":
                        digit = 10;
                        break;
                    case "B":
                    case "b":
                        digit = 11;
                        break;
                    case "C":
                    case "c":
                        digit = 12;
                        break;
                    case "D":
                    case "d":
                        digit = 13;
                        break;
                    case "E":
                    case "e":
                        digit = 14;
                        break;
                    case "F":
                    case "f":
                        digit = 15;
                        break;
                    default:
                        digit = Number(digit);
                }
                number += digit * Math.pow(16, i);
            }
            return number;
        },
        formatResult: function (input, result) {
            return {
                original: "Hexadecimal: " + input,
                converted: "Decimal: " + result
            };
        },
        validateInput: function (input) {
            if (!input) {
                return false;
            }
            var exp = /[0123456789abcdef]/i;
            var i;
            for (i = 0; i < input.length; ++i) {
                if(!exp.test(input[i])) {
                    return false;
                }
            }
            return true;
        }
    }
};

var conversion = ConversionType.decimalToBinary;


var showResult = function (input, result) {
    $(".result-panel").removeClass("incorrect");
    $(".result-panel").addClass("converted");

    var formatted = conversion.formatResult(input, result);
    $(".info-1").text(formatted.original);
    $(".info-2").text(formatted.converted);
}

var showError = function () {
    $(".result-panel").removeClass("converted");
    $(".result-panel").addClass("incorrect");
    $(".info-1").text("Invalid input data");
    $(".info-2").text(conversion.error);
};

var showMenuEventHandler = function () {
    $(".menu-panel").toggle();
};

var menuClickEventHandler = function (event) {
    if (!event.target.id) {
        return;
    }
    conversion = ConversionType[event.target.id];
    $(".title").text(conversion.title);
    $("#input-tb").attr("placeholder", conversion.placeholder);
    $(".menu-panel").toggle();
};

var convertClickEventHandler = function () {
    var input = $("#input-tb").val().trim();
    if (!conversion.validateInput(input)) {
        showError();
    }
    else {
        var result = conversion.convert(input);
        showResult(input, result);
    }
};


var addEventDOMListeners = function () {
    $(".menu-bar > img").click(showMenuEventHandler);
    $(".menu-panel").click(menuClickEventHandler);
    $(".convert-btn").click(convertClickEventHandler);
}

$(document).ready(addEventDOMListeners);

