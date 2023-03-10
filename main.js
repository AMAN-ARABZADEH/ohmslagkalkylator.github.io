"use strict";
// Author: Aman Arabzadeh
// Date: 2023-02-16
// I built this calculator for my course in embedded systems at University.
//         <!-- Aman Arabzadeh created this  -->
document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("btn");
  const resetBtn = document.getElementById("reset");
  const result = document.getElementById("ohms");
  const kilo = document.getElementById("kilo");
  const mega = document.getElementById("mega");
  const resultsheading = document.getElementById("results");
  const more = document.getElementById("more");

  // Listen button
  btn.addEventListener("click", calculate);

  function calculate() {
    // Get the user inputs value
    const voltage = document.querySelector("#voltage").value;
    const current = document.querySelector("#current").value;
    const resistance = document.querySelector("#resistance").value;

    // Convert the input units to standard units
    const voltageUnits = document.querySelector("#voltage-units").value;
    const currentUnits = document.querySelector("#current-units").value;
    const resistanceUnits = document.querySelector("#resistance-units").value;

    // Take the input value unit check which option is true
    let voltageInV, voltValue;
    if (voltageUnits === "voltage") {
      voltValue = voltageUnits;
      voltageInV = parseFloat(voltage);
    } else if (voltageUnits === "kilovolts") {
      voltValue = voltageUnits;
      voltageInV = parseFloat(voltage) * 1000;
    } else if (voltageUnits === "megavolts") {
      voltValue = voltageUnits;
      voltageInV = parseFloat(voltage) * 1000000;
    }
    console.log(voltValue);
    let currentInA, currValue;

    if (currentUnits === "amps") {
      currentInA = parseFloat(current);
      currValue = currentUnits;
    } else if (currentUnits === "kiloamps") {
      currValue = currentUnits;
      currentInA = parseFloat(current) * 1000;
    } else if (currentUnits === "megaamps") {
      currValue = currentUnits;
      currentInA = parseFloat(current) * 1000000;
    }
    console.log(currValue);
    let resistanceInOhms, resistValue;
    if (resistanceUnits === "ohms") {
      resistValue = resistanceUnits;
      resistanceInOhms = parseFloat(resistance);
    } else if (resistanceUnits === "kiloohms") {
      resistValue = resistanceUnits;
      resistanceInOhms = parseFloat(resistance) * 1000;
      console.log(resistanceInOhms.value);
    } else if (resistanceUnits === "megaohms") {
      resistValue = resistanceUnits;
      resistanceInOhms = parseFloat(resistance) * 1000000;
    }
    console.log(resistValue);

    if (!isNaN(voltageInV) && !isNaN(currentInA) && isNaN(resistanceInOhms)) {
      if (!negativeValueChecker(voltageInV, currentInA, resistanceInOhms)) {
        result.innerHTML = "Inmatningsv??rdena m??ste vara st??rre ??n noll!";
        result.style.color = "red";
      } else {
        if (resistanceUnits === "ohms") {
          const ohmsres = voltageInV / currentInA;
          result.innerHTML = "Motst??nd: " + ohmsres.toFixed(6) + " ( ?? )";
          const kiloohmsres = voltageInV / currentInA / 1000;
          kilo.innerHTML =
            "Motst??nd: " + kiloohmsres.toFixed(6) + " Kiloohms ( k?? )";
          const megOhmsRes = voltageInV / currentInA / 1000000;
          console.log(megOhmsRes);
          mega.innerHTML =
            "Motst??nd: " + megOhmsRes.toFixed(6) + " megaohms ( M?? )";
          moreInfo();
          styleResult();
        }
      }
    } else if (
      !isNaN(voltageInV) &&
      isNaN(currentInA) &&
      !isNaN(resistanceInOhms)
    ) {
      if (!negativeValueChecker(voltageInV, currentInA, resistanceInOhms)) {
        result.innerHTML = "Inmatningsv??rdena m??ste vara st??rre ??n noll!";
        result.style.color = "red";
      } else {
        const curr = voltageInV / resistanceInOhms;
        result.innerHTML = "str??m: " + curr.toFixed(6) + " ( A ) ";
        ////////////////
        const kilocurr = voltageInV / resistanceInOhms / 1000;
        kilo.innerHTML = "str??m: " + kilocurr.toFixed(6) + " kiloamps ( kA ) ";
        const megcurrs = voltageInV / resistanceInOhms / 1000000;
        console.log(kilocurr);
        mega.innerHTML = "str??m: " + megcurrs.toFixed(6) + " megaamps ( MA ) ";
        moreInfo();
        styleResult();
      }
    } else if (
      isNaN(voltageInV) &&
      !isNaN(currentInA) &&
      !isNaN(resistanceInOhms)
    ) {
      if (!negativeValueChecker(voltageInV, currentInA, resistanceInOhms)) {
        result.innerHTML = "Inmatningsv??rdena m??ste vara st??rre ??n noll!";
        result.style.color = "red";
      } else {
        const volt = currentInA * resistanceInOhms;
        result.innerHTML = "Sp??nning: " + volt.toFixed(6) + "Volts ( V )";
        ////////////////
        const kilovolt = (currentInA * resistanceInOhms) / 1000;
        kilo.innerHTML =
          "Sp??nning: " + kilovolt.toFixed(6) + " kilovolts ( kV) ";
        const megvolt = (currentInA * resistanceInOhms) / 1000000;
        console.log(megvolt);
        mega.innerHTML =
          "Sp??nning: " + megvolt.toFixed(6) + " megavolts ( MV ) ";
        moreInfo();
        styleResult();
      }
    } else {
      result.innerHTML = "V??nligen ange tv?? v??rden att ber??kna.";
      result.style.color = "red";
    }
    condition = true;
  }

  resetBtn.addEventListener("click", function () {
    document.getElementById("voltage").value = "";
    document.getElementById("current").value = "";
    document.getElementById("resistance").value = "";
    result.innerHTML = "";
    kilo.innerHTML = "";
    mega.innerHTML = "";
    resultsheading.innerHTML = "";
    more.innerHTML = "";
    isMoreInfoDisplayed = false;
  });

  function styleResult() {
    result.style.width = "250px";
    resultsheading.innerHTML = "Resultat: ";
    result.style.color = "black";
  }

  // Check for negative inputs
  function negativeValueChecker(voltage, current, resistance) {
    if (voltage <= 0 || current <= 0 || resistance <= 0) {
      return false;
    }
    return true;
  }

  let isMoreInfoDisplayed = false;

  function moreInfo() {
    if (!isMoreInfoDisplayed) {
      // Create h4 element
      const h4 = document.createElement("h4");
      h4.innerHTML =
        'Hitta mer: <a href="https://en.wikipedia.org/wiki/Ohm%27s_law" target="_blank">wikipedia.</a>';
      // Append h4 and img elements to the div element
      //         <!-- Aman Arabzadeh created this  -->
      more.appendChild(h4);
      isMoreInfoDisplayed = true;
    }
  }
});
