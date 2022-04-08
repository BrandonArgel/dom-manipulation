let totalImages = 0;
let loadedImages = 0;

const isIntersecting = (entry) => entry.isIntersecting;

const observer = new IntersectionObserver((entries) => {
	entries.filter(isIntersecting).forEach((entry) => {
		const imgNode = entry.target;
		imgNode.src = imgNode.dataset.src;
		imgNode.onload = () => {
			loadedImages++;
			logState();
		};
		observer.unobserve(entry.target);
	});
});

export const registerImage = (image) => {
	observer.observe(image);
	totalImages++;
	logState();
};

export const resetImages = () => {
	totalImages = 0;
	loadedImages = 0;
	logState();
};

function logState() {
	console.group("Lazy loading");
	console.log(`⚪️ Total Imágenes: ${totalImages}`);
	console.log(`🟣 Imágenes cargadas: ${loadedImages}`);
	console.log(`🟡 Imágenes por cargar: ${totalImages - loadedImages}`);
	console.groupEnd();
}
