<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import StatusBar from '$lib/components/layout/StatusBar.svelte';

	let ready = false;
	export let data;

	onMount(async () => {
		ready = true;
		if (!data.bearer) await goto('/auth');
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
