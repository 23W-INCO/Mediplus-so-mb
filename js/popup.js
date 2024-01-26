document.addEventListener("DOMContentLoaded", function() {
    var modal = document.getElementById("popup-modal");
    var closeButton = document.querySelector(".close-button");
  
    function toggleModal() {
      modal.style.display = "block";
    }
  
    function openInNewTab(url) {
      window.open(url, '_blank').focus();
    }
  
    var exploreButton = document.querySelector(".modal-content button");
    exploreButton.addEventListener("click", function() {
      openInNewTab('NDDE/index.html');
    });
  
    function windowOnClick(event) {
      if (event.target === modal) {
        modal.style.display = "none";
      }
    }
  
    closeButton.addEventListener("click", function() {
      modal.style.display = "none";
    });
  
    window.addEventListener("click", windowOnClick);
  
    setTimeout(toggleModal, 5000); // time delay before popup appears
  });
  