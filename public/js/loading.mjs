const points = [];
const velocity2 = 5; // velocity squared
const canvas = document.getElementById('loading');
const context = canvas.getContext('2d');
const radius = 5;
const boundaryX = 300;
const boundaryY = 300;
const numberOfPoints = 20;

const createPoint = () => {
	const point = {};
	point.x = Math.random() * boundaryX;
	point.y = Math.random() * boundaryY;
	// random vx
	point.vx = (Math.floor(Math.random()) * 2 - 1) * Math.random();
	const vx2 = point.vx ** 2;
	// vy^2 = velocity^2 - vx^2
	const vy2 = velocity2 - vx2;
	point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
	points.push(point);
};

const resetVelocity = (point, axis, dir) => {
	if (axis === 'x') {
		point.vx = dir * Math.random();
		const vx2 = point.vx ** 2;
		// vy^2 = velocity^2 - vx^2
		const vy2 = velocity2 - vx2;
		point.vy = Math.sqrt(vy2) * (Math.random() * 2 - 1);
	} else {
		point.vy = dir * Math.random();
		const vy2 = point.vy ** 2;
		// vy^2 = velocity^2 - vx^2
		const vx2 = velocity2 - vy2;
		point.vx = Math.sqrt(vx2) * (Math.random() * 2 - 1);
	}
};

const drawCircle = (x, y) => {
	context.beginPath();
	context.arc(x, y, radius, 0, 2 * Math.PI, false);
	context.fillStyle = '#f09ff6';
	context.fill();
};

const drawLine = (x1, y1, x2, y2) => {
	context.beginPath();
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);
	const colorArray = ['#c6f5fe', '#f09ff6', '#b3fdb3'];
	// context.strokeStyle = colorArray[Math.floor(Math.random() * colorArray.length)];
	context.strokeStyle = colorArray[2];
	context.stroke();
};

const draw = () => {
	for (let i = 0, l = points.length; i < l; i++) {
		// circles
		const point = points[i];
		point.x += point.vx;
		point.y += point.vy;
		drawCircle(point.x, point.y);
		// lines
		drawLine(point.x, point.y, point.buddy.x, point.buddy.y);
		// check for edge
		if (point.x < 0 + radius) {
			resetVelocity(point, 'x', 1);
		} else if (point.x > boundaryX - radius) {
			resetVelocity(point, 'x', -1);
		} else if (point.y < 0 + radius) {
			resetVelocity(point, 'y', 1);
		} else if (point.y > boundaryY - radius) {
			resetVelocity(point, 'y', -1);
		}
	}
};

const animate = () => {
	context.clearRect(0, 0, 300, 300);
	draw();
	requestAnimationFrame(animate);
};

const init = () => {
	// create points
	for (let i = 0; i < numberOfPoints; i++) {
		createPoint();
	}
	// create connections
	for (let i = 0, l = points.length; i < l; i++) {
		if (i === 0) {
			points[i].buddy = points[points.length - 1];
		} else {
			points[i].buddy = points[i - 1];
		}
	}

	// animate
	animate();
};

const disappear = () => {
	points.pop();
	if (points.length > 0) {
		setTimeout(() => {
			disappear();
		}, 100);
	} else {
		const container = document.getElementById('loading_container');
		const main = document.getElementsByTagName('main');
		container.parentNode.removeChild(container);
		main[0].style.opacity = 1;
	}
};

export { init, disappear };
