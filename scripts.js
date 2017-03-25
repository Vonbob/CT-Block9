var ConversionType = {
    decimalToBinary:
        {
            title: "Conversion from decimal to binary",
            convert: function (input) {
                var decimal = Number(input);
                var result = [];
                while (decimal > 0) {
                    result.unshift(decimal % 2);
                    decimal = Math.floor(decimal / 2);
                }
                return result.toString().replace(/,/g, "");
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
    binaryToDecimal: 
        {
            title: "Conversion from binary to decimal",
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
    decimalToHexadecimal: 
        {
            title: "Conversion from decimal to hexadecimal",
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
            validateInput: function (input) {
                if (!input || isNaN(input)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        },
    hexadecimalToDecimal: 
        {
            title: "Conversion from hexadecimal to decimal",
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


var showMenu = function() {
    $(".menu-bar > img").click(function () {
        $(".menu-panel").toggle();
    });
}

var menuClick = function () {
    $("#dtob").click(function () {
        conversion = ConversionType.decimalToBinary;
        $(".title").text(conversion.title);
        $("#input-tb").attr("placeholder", "decimal number ...");
        $(".menu-panel").toggle();
    });
    $("#btod").click(function () {
        conversion = ConversionType.binaryToDecimal;
        $(".title").text(conversion.title);
        $("#input-tb").attr("placeholder", "binary number ...");
        $(".menu-panel").toggle();
    });
    $("#dtoh").click(function () {
        conversion = ConversionType.decimalToHexadecimal;
        $(".title").text(conversion.title);
        $("#input-tb").attr("placeholder", "decimal number ...");
        $(".menu-panel").toggle();
    });
    $("#htod").click(function () {
        conversion = ConversionType.hexadecimalToDecimal;
        $(".title").text(conversion.title);
        $("#input-tb").attr("placeholder", "hexadecimal number ...");
        $(".menu-panel").toggle();
    });
}

var showResult = function (input, result) {
    $(".result-panel").removeClass("incorrect");
    $(".result-panel").addClass("converted");
    switch (conversion) {
        case ConversionType.decimalToBinary:
            $(".info-1").text("Decimal: " + input);
            $(".info-2").text("Binary: " + result);
            break;
        case ConversionType.binaryToDecimal:
            $(".info-1").text("Binary: " + input);
            $(".info-2").text("Decimal: " + result);
            break;
        case ConversionType.decimalToHexadecimal:
            $(".info-1").text("Decimal: " + input);
            $(".info-2").text("Hexadecimal: " + result);
            break;
        case ConversionType.hexadecimalToDecimal:
            $(".info-1").text("Hexadecimal: " + input);
            $(".info-2").text("Decimal: " + result);
            break;
    }
}

var showError = function () {
    $(".result-panel").removeClass("converted");
    $(".result-panel").addClass("incorrect");
    $(".info-1").text("Invalid input data");
    switch (conversion) {
        case ConversionType.decimalToBinary:
            $(".info-2").text("Please provide number in decimal format");
            break;
        case ConversionType.binaryToDecimal:
            $(".info-2").text("Please provide number in binary format");
            break;
        case ConversionType.decimalToHexadecimal:
            $(".info-2").text("Please provide number in decimal format");
            break;
        case ConversionType.hexadecimalToDecimal:
            $(".info-2").text("Please provide number in hexadecimal format");
            break;
    }
};

var convertClick = function () {
    $("#convert-btn").click(function () {
        var input = $("#input-tb").val().trim();
        if (!conversion.validateInput(input)) {
            showError();
        }
        else {
            var result = conversion.convert(input);
            showResult(input, result);
        }
    });
};

$(document).ready(showMenu);
$(document).ready(menuClick);
$(document).ready(convertClick);
