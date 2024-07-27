const initialSlider = (
  wrapper,
  list,
  slideButton,
  container,
  scrollbar,
  thumb,
  prevSlide
) => {
  const imageList = document.querySelector(`${wrapper} ${list}`);
  const slideButtons = document.querySelectorAll(`${wrapper} ${slideButton}`);

  const sliderScroolbar = document.querySelector(` ${container} ${scrollbar}`);
  const scrollbarThumb = sliderScroolbar.querySelector(`${thumb}`);
  const maxScrollLeft = imageList.scrollWidth - imageList.clientWidth;

  //   Handle scrollbar thumb drag

  scrollbarThumb.addEventListener("mousedown", (e) => {
    const startX = e.clientX;
    const thumbPosition = scrollbarThumb.offsetLeft;

    // Update thumb position on mouse move

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const newThumbPosition = thumbPosition + deltaX;

      const maxThumbPosition =
        sliderScroolbar.getBoundingClientRect().width -
        scrollbarThumb.offsetWidth;

      const boundedPosition = Math.max(
        0,
        Math.min(maxThumbPosition, newThumbPosition)
      );

      const scrollPosition =
        (boundedPosition / maxThumbPosition) * maxScrollLeft;

      scrollbarThumb.style.left = `${boundedPosition}px`;
      imageList.scrollLeft = scrollPosition;
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    // Add event listeners for drag interaction

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  //   Slide images according to the slide button clicks

  slideButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const direction = button.id === `${prevSlide}` ? -1 : 1;
      const scrollAmount = 360 * direction;
      imageList.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    const handleSlideButtons = () => {
      slideButtons[0].style.display =
        imageList.scrollLeft <= 0 ? "none" : "block";

      slideButtons[1].style.display =
        imageList.scrollLeft >= maxScrollLeft ? "none" : "block";
    };

    // Update scrollbar thumb position based on image scroll

    const updateScrollThumbPosition = () => {
      const scrollPosition = imageList.scrollLeft;
      const thumbPosition =
        (scrollPosition / maxScrollLeft) * (1050 - scrollbarThumb.offsetWidth);
      scrollbarThumb.style.left = `${thumbPosition}px`;
    };

    imageList.addEventListener("scroll", () => {
      handleSlideButtons();
      updateScrollThumbPosition();
    });
  });
};

window.addEventListener("load", () => {
  initialSlider(
    ".slider-wrapper",
    ".image-list",
    ".slide-button",
    ".container",
    ".slider-scrollbar",
    ".scrollbar-thumb",
    "prev-slide"
  );

  initialSlider(
    ".slider-wrapper-2",
    ".image-list-2",
    ".slide-button-2",
    ".container-2",
    ".slider-scrollbar-2",
    ".scrollbar-thumb-2",
    "prev-slide-2"
  );
});

document.addEventListener("DOMContentLoaded", function () {
  productsLink.addEventListener("click", function () {
    this.style.transform = "scale(1, 1)";
  });
});

function showBar(menuId) {
  const dropDownMenu = document.querySelector(".header-dropdown-bg");
  const productsLink = document.querySelector(".dropdown-link-product");
  const suggestLink = document.querySelector(".dropdown-link-suggest");
  const conceptLink = document.querySelector(".dropdown-link-concept");

  if (dropDownMenu.style.display === "flex") {
    dropDownMenu.style.display = "none";

    productsLink.style.borderBottom = "none";
    suggestLink.style.borderBottom = "none";
    conceptLink.style.borderBottom = "none";
  } else {
    dropDownMenu.style.display = "flex";
  }
}
