// --- IMPORTS AND DEPENDENCIES ---
import * as cookieModule from './cookieConsent.mjs';
import * as contactModule from './contactForm.mjs';
import * as languageModule from './language.mjs';
import * as errorModule from './errorPage.mjs';
import * as loadingAnimation from './loading.mjs';

// --- DOM ELEMENTS ---
const errorBack = document.querySelector('#error_back');
const errorLogin = document.querySelector('#error_login');
const enButton = document.querySelector('#langEN');
const jaButton = document.querySelector('#langJA');
const captcha = document.querySelector('#captcha');
const contactForm = document.querySelector('#contact_form');
const loadingContainer = document.querySelector('#loading_container');

// --- WINDOW LOAD ---
window.addEventListener('load', function () {
	// cookieModule.checkForCookieConsent();
});

// --- DOM-RELATED EVENTS ---
if (contactForm) {
	if (captcha) contactModule.activateCaptcha(captcha);
	contactModule.activateForm();
}

// TODO: Remove this comment if you decide to use this later
if (enButton || jaButton) {
	languageModule.setLanguage(enButton || jaButton);
}

if (errorBack || errorLogin) {
	errorModule.setButtonLink(errorBack || errorLogin);
}

if (loadingContainer) {
	loadingAnimation.init();
	loadingContainer.addEventListener('click', () => {
		loadingAnimation.disappear();
		document.getElementById('click_me_text').style.opacity = 0;
	});
}
