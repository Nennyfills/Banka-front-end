var loadingDiv = document.getElementById('loading');

const showSpinner = () => {
  loadingDiv.style.visibility = 'visible';
};

const hideSpinner = () => {
  loadingDiv.style.visibility = 'hidden';
}