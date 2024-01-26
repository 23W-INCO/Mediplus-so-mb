// ----------------------------
// Data Creation
// ----------------------------

// Event Listener to Data Creation
let stackedData = [];

document.getElementById("addDataButton").addEventListener("click", function () {
  const form = document.getElementById("dataInputForm");
  const formData = new FormData(form);

  // Initialize dataObject with the selected country and year
  const customDataCountrySelector = document.getElementById(
    "customDataCountrySelector"
  );
  const dataObject = {
    "Country name":
      customDataCountrySelector.options[customDataCountrySelector.selectedIndex]
        .text,
    "Country code": customDataCountrySelector.value,
    Year: document.getElementById("yearInput").value,
  };

  // Add the rest of the form data to the data object
  formData.forEach((value, key) => {
    if (!dataObject.hasOwnProperty(key)) {
      dataObject[key] = value;
    }
  });

  // Add the dataObject to the stackedData array
  stackedData.push(dataObject);

  // Update the preview
  updateDataPreview();

  // Clear the form fields
  form.reset();

  // Reset the year input
  document.getElementById("yearInput").value = 2020; // Reset to default year
});

function updateDataPreview() {
  const previewContainer = document.getElementById("dataPreview");
  const copyButton = document.getElementById("copyDataButton");
  const downloadButton = document.getElementById("downloadDataButton");
  const addMoreButton = document.getElementById("addMoreButton");

  if (stackedData.length > 0) {
    previewContainer.innerHTML = "<h3>Current Data:</h3>";
    previewContainer.innerHTML +=
      "<pre>" + JSON.stringify(stackedData, null, 2) + "</pre>";

    // Show the buttons
    copyButton.style.display = "inline-block";
    downloadButton.style.display = "inline-block";
    addMoreButton.style.display = "inline-block";
  } else {
    previewContainer.innerHTML = "";

    // Hide the buttons
    copyButton.style.display = "none";
    downloadButton.style.display = "none";
    addMoreButton.style.display = "none";
  }
}

// Event Listener for copy button
document
  .getElementById("copyDataButton")
  .addEventListener("click", function () {
    const dataStr = JSON.stringify(stackedData, null, 2);
    navigator.clipboard
      .writeText(dataStr)
      .then(() => {
        alert("Data copied to clipboard!");
      })
      .catch((err) => {
        console.error("Error copying text: ", err);
      });
  });

// Event Listener for download button
document
  .getElementById("downloadDataButton")
  .addEventListener("click", function () {
    const dataStr = JSON.stringify(stackedData, null, 2);
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "custom-data.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  });
