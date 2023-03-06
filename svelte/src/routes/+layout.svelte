<script lang="ts">
	import { goto } from '$app/navigation';
	import StatusBar from '$lib/components/layout/StatusBar.svelte';
	import { bearerToken } from '$lib/stores/global.store';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	let ready = false;

	async function load(data: LayoutData): Promise<void> {
		if (data.access_token) {
			bearerToken.set(data.access_token);
			await goto('/app');
		} else {
			await goto('/auth/login');
		}
	}

	onMount(async () => {
		await load(data);
		ready = true;
	});
</script>

<StatusBar>
	{#if ready}
		<slot />
	{/if}
</StatusBar>

<style>
	:root {
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
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
