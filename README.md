# Feedback for Actions

*Version from 2025-11-03 for UrqW 1.1.*

A plugin for [UrqW](https://github.com/urqw/UrqW) that adds feedback for player actions in the form of sound and vibration signals.

It is possible to separately configure sound and vibration signals for the following actions:

* Activating a choice button (`btn`) or a link within text (`[[*]]`).
* Activating a choice button with multiple actions (xbtn-like).
* Activating a link to use an inventory item (`use_*` labels).
* Moving to the next portion of the output text (`anykey`).
* Entering a text string (`input`).

When playing feedback sounds, the volume settings in the toolbar and menu are taken into account.

Sound and vibration signals for player actions are configured by defining the corresponding variables at the beginning of the plugin code.

A sound signal is defined as the path to the corresponding audio file, which must be specified relative to the game's .qst file, similar to the `play` operator.

A vibration signal is defined in accordance with the [Vibration API](https://www.w3.org/TR/vibration/).
For example, as an array in which elements zero and subsequent with even indices specify the duration of vibration intervals, while elements with odd indices specify the pauses between these signals.
The duration is specified as a number in milliseconds.

The plugin and an example of its use can be found in the urqw directory. A demo of the plugin can be viewed at <https://urqw.github.io/UrqW#feedback_for_actions>

For other UrqW plugins, see the [common repository](https://github.com/urqw/plugins).

Be careful, though: not all UrqW plugins can be easily combined.
