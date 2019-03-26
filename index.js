"use strict";

const ColorSpread = function(color1, color2, midpoints) {
  // convert 2-digit hexadecimal to byte
  function hexToByte(hex) {
    return parseInt(hex, 16);
  }

  // convert shorthand hexadecimal (1-digit) to byte
  function shortHandHexToByte(hex) {
    return parseInt(`${hex}${hex}`, 16);
  }

  // convert hexadecimal color to RGB
  function hexColorToRGB(hexColor) {
    // if shorthand hex
    if (hexColor.length === 3) {
      return {
        r: shortHandHexToByte(hexColor[0]),
        b: shortHandHexToByte(hexColor[1]),
        g: shortHandHexToByte(hexColor[2])
      };
    } else if (hexColor.length === 6) {
      return {
        r: hexToByte(hexColor[0].concat(hexColor[1])),
        b: hexToByte(hexColor[2].concat(hexColor[3])),
        g: hexToByte(hexColor[4].concat(hexColor[5]))
      };
    }
  }

  // create color spread
  function createArray(color1, color2, midpoints) {
    const resultArray = [];
    const spaces = midpoints + 1;
    const points = midpoints + 2;
    const rIncrement = (color2.r - color1.r) / spaces;
    const bIncrement = (color2.b - color1.b) / spaces;
    const gIncrement = (color2.g - color1.g) / spaces;

    for (let i = 0; i < points; i++) {
      const r = byteToHexString(Math.round(color1.r + rIncrement * i));
      const g = byteToHexString(Math.round(color1.g + gIncrement * i));
      const b = byteToHexString(Math.round(color1.b + bIncrement * i));
      resultArray[i] = `#${r}${g}${b}`;
    }
    return resultArray;
  }

  // validate if input is RGB value
  function isValidRGB(r, g, b) {
    if (
      typeof Number(r) !== "number" ||
      typeof Number(g) !== "number" ||
      typeof Number(b) !== "number"
    )
      return false;

    var regex = /\b(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])\b/;
    if (regex.test(r) && regex.test(g) && regex.test(b)) return true;

    return false;
  }

  function reformatRGB(RGBColor) {
    return {
      r: Number(RGBColor.split(",")[0]),
      g: Number(RGBColor.split(",")[1]),
      b: Number(RGBColor.split(",")[2])
    };
  }

  function byteToHexString(byte) {
    let hexStr = "";
    let hex = (byte & 0xff).toString(16);
    hex = hex.length === 1 ? "0" + hex : hex;
    hexStr += hex;

    return hexStr.toUpperCase();
  }

  // check if input colors are hex or rgb
  function checkIfHexOrRGB(color) {
    if (
      isValidRGB(color.split(",")[0], color.split(",")[1], color.split(",")[2])
    ) {
      return reformatRGB(color);
    } else if (color.length === 3 || color.length === 6) {
      return hexColorToRGB(color);
    }
  }

  let color1Value = color1[0] === "#" ? color1.slice(1) : color1;
  let color2Value = color2[0] === "#" ? color2.slice(1) : color2;

  color1Value = checkIfHexOrRGB(color1Value);
  color2Value = checkIfHexOrRGB(color2Value);

  return createArray(color1Value, color2Value, midpoints);
};

module.exports = ColorSpread;
