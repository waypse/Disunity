<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import StatusBar from '$lib/components/layout/StatusBar.svelte';
	import { bearerToken } from '$lib/stores/global.store';

	let ready = false;
	let bearer = null;

	onMount(async () => {
		const auth = await window.electronApi.auth('get');
		if (auth && auth.access_token) {
			bearer = auth.access_token;
		}
		ready = true;
		if (!bearer) await goto('/auth');
		else bearerToken.set(bearer);
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
