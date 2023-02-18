<script lang="ts">
	import { onMount } from 'svelte';
	import StatusBar from '$lib/components/layout/StatusBar.svelte';

	let ready: boolean = false;
	onMount(() => (ready = true));
</script>

<StatusBar />

{#if ready}
	<slot />
{/if}

<style>
	:global(.btn) {
		-webkit-app-region: no-drag;
		appearance: none;
		border: 0;
		cursor: pointer;
	}
</style>
