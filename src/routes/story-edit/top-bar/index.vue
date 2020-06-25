<template>
	<div class="story-edit-top-bar">
		<top-bar back-route="/" :back-label="$t('storyList.title')">
			<template v-slot:actions>
				<icon-button
					icon="plus-circle"
					label="storyEdit.topBar.addPassage"
					type="create"
				/>
				<icon-button icon="zoom-in" label="storyEdit.topBar.zoomIn" />
				<icon-button icon="zoom-out" label="storyEdit.topBar.zoomOut" />
				<icon-button icon="tool" label="common.test" />
				<icon-button @click="playStory" icon="play" label="common.play" />
				<dropdown-button icon="more-horizontal" label="common.more">
					<icon-button
						@click="editJavaScript"
						icon="code"
						label="storyEdit.topBar.editJavaScript"
					/>
					<icon-button
						@click="editStylesheet"
						icon="hash"
						label="storyEdit.topBar.editStylesheet"
					/>
					<icon-button
						icon="file-text"
						label="storyEdit.topBar.setStoryFormat"
					/>
					<icon-button
						@click="toggleRenamePrompt"
						icon="type"
						label="storyEdit.topBar.renameStory"
					/>
					<icon-button
						@click="selectAllPassages"
						icon="layers"
						label="storyEdit.topBar.selectAllPassages"
					/>
					<icon-button icon="empty" label="storyEdit.topBar.snapToGrid" />
					<icon-button
						icon="bar-chart-2"
						@click="showStoryStats"
						label="storyEdit.topBar.storyStats"
					/>
					<icon-button
						@click="proofStory"
						icon="book-open"
						label="storyEdit.topBar.proofStory"
					/>
					<icon-button icon="download" label="common.publishToFile" />
				</dropdown-button>
				<text-line placeholder="Quick Find" />
			</template>
		</top-bar>
		<top-prompt
			@cancel="toggleRenamePrompt"
			:message="$t('storyEdit.topBar.renameStoryPrompt', {name: story.name})"
			@submit="renameStory"
			:visible="showRenamePrompt"
		/>
	</div>
</template>

<script>
import DropdownButton from '@/components/input/dropdown-button';
import IconButton from '@/components/input/icon-button';
import TextLine from '@/components/input/text-line';
import TopBar from '@/components/top-layout/top-bar';
import TopPrompt from '@/components/top-layout/top-prompt';
import openUrl from '@/util/open-url';
import '@/styles/accessibility.less';

export default {
	components: {
		DropdownButton,
		IconButton,
		TextLine,
		TopBar,
		TopPrompt
	},
	data() {
		return {findModalOpen: false, highlightText: '', showRenamePrompt: false};
	},
	methods: {
		createNewPassage() {
			this.$store.dispatch('story/createUntitledPassage', {
				centerX: window.scrollX + window.innerWidth / 2,
				centerY: window.scrollY + window.innerHeight / 2,
				storyId: this.story.id
			});
		},
		editJavaScript() {
			this.$router.push(`/stories/${this.story.id}/javascript`);
		},
		editStylesheet() {
			this.$router.push(`/stories/${this.story.id}/stylesheet`);
		},
		playStory() {
			openUrl(`/stories/${this.story.id}/play`);
		},
		proofStory() {
			openUrl(`/stories/${this.story.id}/proof`);
		},
		renameStory(value) {
			console.log('renaming story', value);
			this.$store.dispatch('story/updateStory', {
				storyId: this.story.id,
				storyProps: {name: value}
			});
			this.toggleRenamePrompt();
		},
		selectAllPassages() {
			this.$store.dispatch('story/selectAllPassages', {
				storyId: this.story.id
			});
		},
		showStoryStats() {
			this.$router.push(`/stories/${this.story.id}/statistics`);
		},
		toggleFindModal() {
			this.findModalOpen = !this.findModalOpen;
		},
		toggleRenamePrompt() {
			this.showRenamePrompt = !this.showRenamePrompt;
		}
	},
	name: 'story-edit-top-bar',
	props: {
		story: {
			required: true,
			type: Object
		}
	},
	watch: {
		highlightText(value) {
			this.$store.dispatch('story/highlightPassagesWithText', {
				search: value,
				storyId: this.story.id
			});
		}
	}
};
</script>