import { registerImage, resetImages } from "./lazy";
const URL_API = "https://randomfox.ca/floof";

const getRandomImage = async () => {
	const res = await fetch(URL_API).then((response) => response.json());
	const gallery = document.getElementById("gallery");
	const img = document.createElement("img");
  img.className = "mx-auto my-16 bg-gray-200";
  img.dataset.src = res.image;
  img.height = "300";
  img.width = "300";
  img.alt = "Random fox image";
  registerImage(img)
  gallery.appendChild(img);
};

const cleanImages = () => {
	const gallery = document.getElementById("gallery");
	const nodes = gallery.childNodes;
	if (!nodes.length > 0) return;

	[...nodes].forEach((node) => {
		gallery.removeChild(node);
	});

	resetImages();
};

const container = document.querySelector("main");
const button = document.createElement("button");
button.className =
	"mx-auto my-4 block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded";
button.textContent = "Añadir imagen";
button.type = "button";
button.addEventListener("click", getRandomImage);
const clean = document.createElement("button");
clean.className =
	"mx-auto my-4 block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out";
clean.textContent = "Borrar imágenes";
clean.type = "reset";
clean.addEventListener("click", cleanImages);
const gallery = document.createElement("div");
gallery.id = "gallery";
container.append(button, clean, gallery);
