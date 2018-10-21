// An individual item in the list managed by StoryListView.  This offers quick
// links for editing, playing, and deleting a story; StoryEditView handles more
// detailed changes.

'use strict';
const moment = require('moment');
const Vue = require('vue');
const eventHub = require("../../common/eventHub");
const ZoomTransition = require('../zoom-transition');

require('./index.less');

module.exports = Vue.extend({
	template: require('./index.html'),

	props: {
		story: {
			type: Object,
			required: true
		}
	},

	components: {
		'item-preview': require('./item-preview'),
		'item-menu': require('./item-menu')
	},

	computed: {
		lastUpdateFormatted() {
			return moment(this.story.lastUpdate).format('lll');
		},

		hue() {
			// A hue based on the story's name.

			return ([this.story.name].reduce(
				(hue, char) => hue + char.charCodeAt(0), 0
			) % 40) * 90;
		}
	},

	created: function() {
		// If our parent wants to edit our own model, then we do so. This is
		// done this level so that we animate the transition correctly.

		eventHub.$on('story-edit', (id) => {
			if (this.story.id === id) {
				this.edit();
			}
		});

		// if we were previously editing a story, show a zoom shrinking back
		// into us. The signature is a little bit different to save time; we
		// know the ID of the story from the route, but don't have an object.

		eventHub.$on('previously-editing', (id) => {
			if (id === this.story.id) {
				// The method for grabbing the page position of our element is
				// cribbed from http://youmightnotneedjquery.com/.

				let rect = this.$el.getBoundingClientRect();

				console.warn("story-item previously-editing using $mountTo");
				/*
				new ZoomTransition({
					data: {
						reverse: true,
						x: rect.left + (rect.right - rect.left) / 2,
						y: rect.top + (rect.bottom - rect.top) / 2
					}
				}).$mountTo(document.body);
				*/
			}
		});
	},

	methods: {
		/**
		 Opens a StoryEditView for this story.

		 @method edit
		**/

		edit() {
			this.$router.push({ path: "/stories/" + this.story.id });
		},
	}
});
