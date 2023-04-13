<script lang="ts">
	import { onMount } from 'svelte';
	import { currentUser, statusbar } from '$lib/stores/global.store';
	import MainHeader from '$lib/components/layout/MainHeader.svelte';
	import default_profile_pic from '$lib/assets/profile-user.png';

	let ready = false;

	onMount(async () => {
		$currentUser = await window.electronApi.auth('current-user');
		$statusbar.isTransparent = false;
		ready = true;
	});
</script>

{#if ready}
	<div>
		<MainHeader data={$currentUser} image={default_profile_pic} />
		<slot />
	</div>
{/if}

<style>
	div {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 60px 1fr;
		grid-template-areas: 'header' 'main';
	}
</style>
