/**
 * Copyright (C) 2020, 2025 Nikita Tseykovets <tseikovets@rambler.ru>
 * SPDX-License-Identifier: GPL-2.0-or-later
 */

var
	// feedback for buttons or links
	gotoSound = 'click.mp3',
	gotoVibration = [30, 10, 30],
	// feedback for buttons like xbtn
	xbtnSound = gotoSound,
	xbtnVibration = gotoVibration,
	// feedback for use of inventory object
	useSound = gotoSound,
	useVibration = gotoVibration,
	// feedback for anykey
	anykeySound = gotoSound,
	anykeyVibration = gotoVibration;
	// feedback for input
	inputSound = gotoSound,
	inputVibration = gotoVibration;

// Save links to original functions from UrqW (/js/Player/Player.js)
var btnActionOriginal = Player.prototype.btnAction;
var xbtnActionOriginal = Player.prototype.xbtnAction;
var useActionOriginal = Player.prototype.useAction;
var anykeyActionOriginal = Player.prototype.anykeyAction;
var inputActionOriginal = Player.prototype.inputAction;

// Rewrite original functions for various actions

Player.prototype.btnAction = function(labelName) {
	if (this.goto(labelName, 'btn')) {
		feedbackForActions('goto');
	}
	return btnActionOriginal.call(this, labelName);
};

Player.prototype.xbtnAction = function(command) {
	feedbackForActions('xbtn');
	return xbtnActionOriginal.call(this, command);
};

Player.prototype.useAction = function(labelName) {
	if (!this.lock) {
		feedbackForActions('use');
	}
	return useActionOriginal.call(this, labelName);
};

Player.prototype.anykeyAction = function(keycode) {
	feedbackForActions('anykey');
	return anykeyActionOriginal.call(this, keycode);
};

Player.prototype.inputAction = function(value) {
	feedbackForActions('input');
	return inputActionOriginal.call(this, value);
};

// Functions for sound and vibration feedback

function feedbackForActions(type) {
	var sound, vibration;
	switch(type) {
		case 'goto':
			sound = gotoSound;
			vibration = gotoVibration;
			break;
		case 'xbtn':
			sound = xbtnSound;
			vibration = xbtnVibration;
			break;
		case 'use':
			sound = useSound;
			vibration = useVibration;
			break;
		case 'anykey':
			sound = anykeySound;
			vibration = anykeyVibration;
			break;
		case 'input':
			sound = inputSound;
			vibration = inputVibration;
			break;
		default:
			return;
	}
	soundFeedback(sound);
	vibrationFeedback(vibration);
}

function soundFeedback(file) {
	if (volume == 3) return;

	var Sound;
	if (files === null) {
		Sound = new Audio('quests/' + Game.name + '/' + file.toString().trim());
	} else {
		Sound = new Audio(files[file.toString().trim()]);
	}

	Sound.volume = (volume == 1) ? 1 : 0.5;
	Sound.play();
}

function vibrationFeedback(vibration) {
		if ('vibrate' in navigator) {
		navigator.vibrate(0);
		navigator.vibrate(vibration);
	}
}
