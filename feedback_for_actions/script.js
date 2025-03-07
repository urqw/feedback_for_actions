/**
 * Copyright (C) 2020 Nikita Tseykovets <tseikovets@rambler.ru>
 * Copyright (C) 2015 Akela <akela88@bk.ru>
 *     (UrqW project from which part of code is borrowed)
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

/**
 * Modifying several actions functions
 * from UrqW (/js/Player/Player.js)
 * to built-in feedback
 */

Player.prototype.btnAction = function(labelName) {
	this.cls();

	this.common();

	if (this.goto(labelName, 'btn')) {
		feedbackForActions('goto');
		this.continue();
	}
};

Player.prototype.xbtnAction = function(command) {
	this.common();

	feedbackForActions('xbtn');
	this.play(command + '&end');
	this.fin();
};

Player.prototype.useAction = function(labelName) {
	if (this.lock) return false;

	feedbackForActions('use');
	this.play('proc ' + labelName + '&end');
	this.fin();
};

Player.prototype.anykeyAction = function(keycode) {
	if (this.inf.length > 0) {
		this.setVar(this.inf, keycode);
	}

	feedbackForActions('anykey');
	GlobalPlayer.continue();
};

Player.prototype.inputAction = function(value) {
	this.setVar(this.inf, value);

	feedbackForActions('input');
	this.continue();
};

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
