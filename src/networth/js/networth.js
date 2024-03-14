document.addEventListener("DOMContentLoaded", function () {
  const assetsForm = document.getElementById("assetsForm");
  const liabilitiesForm = document.getElementById("liabilitiesForm");
  const assetsList = document.getElementById("assetsList");
  const liabilitiesList = document.getElementById("liabilitiesList");
  const netWorthElement = document.getElementById("netWorth");

  const assets = [];
  const liabilities = [];

  assetsForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const assetName = document.getElementById("assetName").value;
    const assetValue = parseFloat(document.getElementById("assetValue").value);

    if (!assetName || isNaN(assetValue)) {
      alert("Please enter valid asset information.");
      return;
    }

    assets.push({ name: assetName, value: assetValue });
    updateAssetsList();
    updateNetWorth();
    assetsForm.reset();
  });

  liabilitiesForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const liabilityName = document.getElementById("liabilityName").value;
    const liabilityValue = parseFloat(document.getElementById("liabilityValue").value);

    if (!liabilityName || isNaN(liabilityValue)) {
      alert("Please enter valid liability information.");
      return;
    }

    liabilities.push({ name: liabilityName, value: liabilityValue });
    updateLiabilitiesList();
    updateNetWorth();
    liabilitiesForm.reset();
  });

  function updateAssetsList() {
    assetsList.innerHTML = "";
    assets.forEach((asset, index) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `${asset.name}: $${asset.value.toFixed(2)} <button class="btn btn-sm btn-danger delete-asset" data-index="${index}">Delete</button>`;
      assetsList.appendChild(listItem);
    });
  }

  function updateLiabilitiesList() {
    liabilitiesList.innerHTML = "";
    liabilities.forEach((liability, index) => {
      const listItem = document.createElement("li");
      listItem.className = "list-group-item";
      listItem.innerHTML = `${liability.name}: $${liability.value.toFixed(2)} <button class="btn btn-sm btn-danger delete-liability" data-index="${index}">Delete</button>`;
      liabilitiesList.appendChild(listItem);
    });
  }

  function updateNetWorth() {
    const totalAssets = assets.reduce((total, asset) => total + asset.value, 0);
    const totalLiabilities = liabilities.reduce((total, liability) => total + liability.value, 0);
    const netWorth = totalAssets - totalLiabilities;

    netWorthElement.textContent = `$${netWorth.toFixed(2)}`;
  }

  assetsList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-asset")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      assets.splice(index, 1);
      updateAssetsList();
      updateNetWorth();
    }
  });

  liabilitiesList.addEventListener("click", function (e) {
    if (e.target.classList.contains("delete-liability")) {
      const index = parseInt(e.target.getAttribute("data-index"));
      liabilities.splice(index, 1);
      updateLiabilitiesList();
      updateNetWorth();
    }
  });
});
