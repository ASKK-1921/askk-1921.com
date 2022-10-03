// --- DEPENDENCIES ---
const UAParser = require('ua-parser-js');

// --- MODELS ---

// --- UTILITIES ---
// const cookieManager = require('../utils/cookieManager');

// --- CONTROLLER FUNCTIONS ---

// Check if browser is desktop or mobile
const checkMobile = (req) => {
	const parser = new UAParser();
	const ua = req.headers['user-agent'];
	return parser.setUA(ua).getDevice().type === 'mobile';
};

// --- GENERATE PAGES ---

// Root directory patch for EJS
exports.ejsRootPatch = (req, res, next) => {
	res.locals.viewsRoot = `${process.cwd()}/public/views`;
	next();
};

// Simple pages
exports.getPage = (page) => (req, res, next) => {
	const root = checkMobile(req) ? 'mobile/' : '';
	const title = page.charAt(0).toUpperCase() + page.slice(1);
	return res.status(200).render(`${root}/${page}.ejs`, { title });
};
