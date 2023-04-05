const filters = document.querySelectorAll("#gallery ul li");
const pictures = document.querySelectorAll("picture");
const all = document.querySelector(".all");
const modalTriggers = document.querySelectorAll(
  ".gallery picture img, .overlay"
);
const modalContainer = document.querySelector(".modal-container");
const modal = document.querySelector(".modal");
const imagesOfGallery = document.querySelectorAll(".gallery picture img");
const backButton = document.querySelector(".back");
const nextButton = document.querySelector(".next");
let counter = 0;

// Filtres
for (let filter of filters) {
  filter.addEventListener("click", function () {
    for (let filter of filters) {
      filter.classList.remove("active-tag");
    }
    filter.classList.add("active-tag");
    for (let picture of pictures) {
      if (
        filter.getAttribute("data-gallery-tag") ===
          picture.getAttribute("data-gallery-tag") ||
        filter === all
      ) {
        picture.style.display = "block";
      } else {
        picture.style.display = "none";
      }
    }
  });
}

//Ouvrir et fermer la modale
for (let trigger of modalTriggers) {
  trigger.addEventListener("click", function () {
    if (modalContainer.classList.contains("active-modal")) {
      modalContainer.classList.remove("active-modal");
    } else {
      modalContainer.classList.add("active-modal");
    }
  });
}

//Cloner les images de  gallery dans la modale

for (let image of imagesOfGallery) {
  const imageCloneInModal = image.cloneNode(true);
  modal.append(imageCloneInModal);
}

//Afficher l'image cliquée dans la modale
const imagesCloneInModal = document.querySelectorAll(".modal img");
let x = 0;

for (let image of imagesCloneInModal) {
  image.setAttribute("image-id", x++);
}

for (let imageOfGallery of imagesOfGallery) {
  imageOfGallery.addEventListener("click", function () {
    for (let image of imagesCloneInModal) {
      if (image.src === imageOfGallery.src) {
        image.classList.add("image-active-in-modal");
        counter = image.getAttribute("image-id");
        console.log(counter);
      } else {
        image.classList.remove("image-active-in-modal");
      }
    }
  });
}

//Afficher l'image suivante
function nextImage() {
  for (let image of imagesCloneInModal) {
    image.classList.remove("image-active-in-modal");
  }

  if (counter < imagesCloneInModal.length - 1) {
    counter++;
  } else {
    counter = 0;
  }
  imagesCloneInModal[counter].classList.add("image-active-in-modal");
  console.log(counter);
}
nextButton.addEventListener("click", nextImage);

//Afficher l'image précédente
function backImage() {
  for (let image of imagesCloneInModal) {
    image.classList.remove("image-active-in-modal");
  }
  if (counter > 0) {
    counter--;
  } else {
    counter = imagesCloneInModal.length - 1;
  }
  imagesCloneInModal[counter].classList.add("image-active-in-modal");
}
backButton.addEventListener("click", backImage);
