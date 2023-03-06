<script lang="ts">
	import { onMount } from 'svelte';
	import { statusbar } from '$lib/stores/global.store';

	let ready = false;

	onMount(() => {
		ready = true;
		$statusbar.isTransparent = false;
	});
</script>

{#if ready}
	<slot />
{/if}
