<script>
	import { onMount } from 'svelte';
	import StatusBar from '$lib/components/layout/StatusBar.svelte';
	import { goto } from '$app/navigation';
	import { statusbar } from '$lib/stores/global.store';

	export let data;

	let ready = false;
	onMount(async () => {
		$statusbar.isTransparent = false;
		if (!data.bearer) await goto('/auth');
		ready = true;
	});
</script>

{#if ready}
	<StatusBar>
		<slot />
	</StatusBar>
{/if}

<style>
	:root {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	:global(body) {
		box-sizing: border-box;
		padding: 0;
		margin: 0;
	}
	:global(.btn) {
		-webkit-app-region: no-drag;
		appearance: none;
		border: 0;
		cursor: pointer;
	}
</style>
