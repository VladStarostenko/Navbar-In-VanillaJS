const width = (el) => {
  if(el.style.display == "none") {
    el.style.display = "block";
    const width = el.offsetWidth;
    el.style.display = "none";
    return width;
  } else {
    const width = el.offsetWidth;
    return width;
  }
}

const hideComponent = () => {
  const visibleComponents = document.querySelectorAll('.visible-components li')
  const lastVisibleComponent = visibleComponents[visibleComponents.length- 1];
  lastVisibleComponent.setAttribute('data-width', width(lastVisibleComponent));
  document.querySelector('.hidden-components').prepend(lastVisibleComponent);
  calculateWidth();
}

const displayHiddenComponent = (visibleComponentsWidth, availableSpace) => {
  const hiddenElements = document.querySelectorAll('.hidden-components li')
  const firstHiddenElement = hiddenElements[0];

  if(firstHiddenElement !== undefined) {
    firstHiddenElementWidth = firstHiddenElement.getAttribute('data-width');
    if (visibleComponentsWidth + parseInt(firstHiddenElementWidth) < availableSpace) {
      document.querySelector('.visible-components').appendChild(firstHiddenElement);
    }
  }
}

const udaptVisibleComponents = (visibleComponentsWidth, availableSpace) => {
  if (visibleComponentsWidth > availableSpace) {
    hideComponent();
  } else {
    displayHiddenComponent(visibleComponentsWidth, availableSpace);
  }
}

const switchShowMoreButton = () => {
  if (document.querySelectorAll('.hidden-components li').length > 0) {
    document.querySelector('.show-more-container').style.display = 'block';
  } else {
    document.querySelector('.show-more-container').style.display ='none';
  }
}

const calculateWidth = () => {
  const visibleComponentsWidth = width(document.querySelector('.visible-components'));
  const showMoreButtonWidth = width(document.querySelector('.show-more-container'));
  const logoWidth = width(document.querySelector('.logo'));
  const computedStyle = getComputedStyle(document.querySelector('.navbar'));
  let navbarWidth = document.querySelector('.navbar').clientWidth;
  navbarWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
  const availableSpace = parseInt(navbarWidth) - showMoreButtonWidth - logoWidth;

  udaptVisibleComponents(visibleComponentsWidth, availableSpace);
  switchShowMoreButton();
}

const showMoreButton = document.querySelector(".show-more-button")
const hiddenComponents = document.querySelector(".hidden-components");

showMoreButton.addEventListener("click", showMoreButtonClick);

function showMoreButtonClick() {
  if(hiddenComponents.style.display == "block") {
    hiddenComponents.style.display = "none"
  } else {
    hiddenComponents.style.display = "block";
  }
  calculateWidth()
}


document.addEventListener("DOMContentLoaded", function() {
  window.onresize = function() {
    calculateWidth();
  };
});
