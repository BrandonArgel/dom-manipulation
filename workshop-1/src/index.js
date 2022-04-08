/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const BASE_URL = "https://platzi-avo.vercel.app";
const API = "/api/avo";

const formatPrice = (price) => {
  // English notation
	return new Intl.NumberFormat("es-US", {
		style: "currency",
		currency: "USD",
	}).format(price);
};

fetch(`${BASE_URL}${API}`)
	.then((res) => res.json())
	.then((res) => {
		//creamos el fragment
		const fragment = document.createDocumentFragment();

		res.data.forEach((item) => {
			const image = document.createElement("img");
			image.className = "h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6";
			image.src = `${BASE_URL}${item.image}`;

			const title = document.createElement("h2");
			title.className = "text-lg";
			title.textContent = item.name;

			const price = document.createElement("span");
			price.className = "text-gray-600";
			price.textContent = formatPrice(item.price);

			const description = document.createElement("div");
			description.className = "text-center md:text-left";
			description.append(title, price);

			const card = document.createElement("div");
			card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
			card.append(image, description);

			//agregamos los nodos al fragment y no al DOM directamente
			fragment.appendChild(card);
		});
		//solo renderizamos una sola vez el DOM
		document.querySelector("main").appendChild(fragment);
	})
	.catch((err) => console.log(err))
	.finally(() => document.getElementById("loader").remove());
